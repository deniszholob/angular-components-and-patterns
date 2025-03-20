import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone, OnDestroy } from '@angular/core';
import { distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';
import { NotificationType, ToastService } from 'src/app/components';
import { typedNullCheck } from 'src/app/utils';

import { AppError } from '../app-error.model';
import { AppErrorData } from '../app-error-data.model';

interface UnhandledError {
  appError: AppErrorData | null | undefined;
  error: unknown | Error;
}

@Injectable({ providedIn: 'root' })
export class AppErrorHandlerService extends ErrorHandler implements OnDestroy {
  private readonly clearSub$: Subject<void> = new Subject<void>();

  /** 1.5: Errors get put on event stream */
  private appErrors$: Subject<UnhandledError> = new Subject<UnhandledError>();

  constructor(
    private ngZone: NgZone,
    private notificationService: ToastService,
  ) {
    super();
    this.handleErrors();
  }

  public ngOnDestroy(): void {
    this.clearSub$.next();
    this.clearSub$.complete();
  }

  /** 1: Error get captured */
  public override handleError(error: unknown): void {
    this.appErrors$.next({ appError: parseError(error), error });
  }

  /** Enable showing the same errors after user dismisses then when they "try again" */
  private resetErrors(): void {
    this.appErrors$.next({ appError: undefined, error: undefined });
  }

  /** 2. Error gets processed */
  private handleErrors(): void {
    this.appErrors$
      .pipe(
        distinctUntilChanged(errorComparator),
        filter((v: UnhandledError): boolean => typedNullCheck(v.appError)),
        takeUntil(this.clearSub$),
      )
      .subscribe((err: UnhandledError): void => {
        this.handleAppError(err);
        super.handleError(err.error);
      });
  }

  /**
   * 3. Error gets handled
   * Change detection will not run on async errors
   * Needs ngZone.run() to have things executed withing angular zone, with change detection etc..
   * @see https://youtu.be/e03EHZIVJtM?si=xJ9G9Qt7_0bWkrls&t=1037
   * @see https://github.com/angular/angular/issues/19984
   */
  private handleAppError({ appError }: UnhandledError): void {
    this.ngZone.run((): void => {
      this.notificationService
        .showToast({
          title: appError?.title ?? 'Unknown Error',
          text: appError?.description ?? 'An error has occurred',
          type: NotificationType.Error,
        })
        .subscribe(() => this.resetErrors());
    });
  }
}

function parseError(error: unknown): AppErrorData | null {
  const appErrorData: AppErrorData | null = null;

  switch (true) {
    case typeof error === 'string': {
      return {
        title: 'Error',
        description: error,
        recommendedAction:
          'Please report to https://github.com/deniszholob/angular-components-and-patterns/issues',
      };
    }
    case error instanceof Error: {
      return {
        title: error.name,
        description: error.message,
        recommendedAction:
          'Please report to https://github.com/deniszholob/angular-components-and-patterns/issues',
      };
    }
    case error instanceof HttpErrorResponse: {
      return {
        title: 'Http Error',
        description: `Http status code: ${error.status} - ${error.statusText}`,
        recommendedAction:
          'Please check your internet connection and try again later',
      };
    }
    case error instanceof AppError: {
      return error.error;
    }
    default: {
      return appErrorData;
    }
  }
}

function errorComparator(a: UnhandledError, b: UnhandledError): boolean {
  return appErrorComparator(a.appError, b.appError);
}

function appErrorComparator(
  a: AppErrorData | null | undefined,
  b: AppErrorData | null | undefined,
): boolean {
  if (a == null || b == null) return a === b;
  return (
    a.title === b.title &&
    a.description === b.description &&
    a.recommendedAction === b.recommendedAction
  );
}
