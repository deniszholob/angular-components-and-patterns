import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Injectable,
  Injector,
} from '@angular/core';
import { filter, Observable, Subject, take } from 'rxjs';

import { ToastHoverEvent } from './toast.component';
import { Toast, ToastInfo } from './toast.model';
import { ToastContainerComponent } from './toast-container/toast-container.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastContainerRef?: ComponentRef<ToastContainerComponent>;

  private toasts: Toast[] = [];
  private intervals: Record<number, number> = {};
  private toastRemovedSignal = new Subject<number>(); // Subject to emit when a toast is removed

  constructor(private injector: Injector) {}

  private ensureToastContainer(): void {
    // cannot use inject(ApplicationRef) nor  constructor(private appRef: ApplicationRef)
    // @see https://kingtigerebooks.co.uk/post/circular-dependency-in-di-detected-for-application-ref-how
    const appRef = this.injector.get(ApplicationRef);
    if (this.toastContainerRef) return;
    this.toastContainerRef = createComponent(ToastContainerComponent, {
      environmentInjector: appRef.injector,
    });
    appRef.attachView(this.toastContainerRef.hostView);
    document.body.appendChild(this.toastContainerRef.location.nativeElement);
    this.initTostContainer(this.toastContainerRef.instance);
  }

  private initTostContainer(componentInstance: ToastContainerComponent): void {
    componentInstance.toasts = this.toasts;

    componentInstance.hover.subscribe((event: ToastHoverEvent): void => {
      const toast: Toast | undefined = this.toasts.find(
        (t: Toast): boolean => t.id === event.id,
      );
      if (!toast || !toast.duration) return;

      if (event.hover) {
        toast.percentage = 100;
        this.stopToastTimer(toast.id);
      } else {
        this.startToastTimer(toast, toast.duration);
      }
    });

    componentInstance.removeToast.subscribe((id: number): void => {
      this.removeToast(id);
    });
  }

  public showToast(toastInfo: ToastInfo): Observable<void> {
    const startTime = Date.now();
    const toast: Toast = {
      ...toastInfo,
      id: startTime,
      percentage: 100,
      created: startTime,
    };

    if (toast.duration) this.startToastTimer(toast, toast.duration);

    this.addToast(toast);
    this.ensureToastContainer();

    // Return an observable that emits when the toast is removed
    return new Observable<void>((observer) => {
      this.toastRemovedSignal
        .pipe(
          filter((id: number): boolean => id === toast.id),
          take(1),
        )
        .subscribe(() => {
          observer.next();
          observer.complete();
        });
    });
  }

  private startToastTimer(toast: Toast, duration: number): void {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const interval: number = window.setInterval((): void => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const percentage = (remaining / duration) * 100;
      toast.percentage = percentage;

      if (remaining <= 0) {
        this.removeToast(toast.id);
      }
    }, 16); // ~60fps
    this.intervals[toast.id] = interval;
  }

  private stopToastTimer(id: number): void {
    const interval: number | undefined = this.intervals[id];
    clearInterval(interval);
    delete this.intervals[id];
  }

  private addToast(toast: Toast): void {
    this.toasts.push(toast);
  }

  private removeToast(id: number): void {
    this.stopToastTimer(id);
    this.toasts.splice(
      this.toasts.findIndex((toast) => toast.id === id),
      1,
    );
    this.toastRemovedSignal.next(id);
  }
}
