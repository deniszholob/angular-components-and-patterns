import { catchError, Observable, of } from 'rxjs';

/**
 * Catches Observable stream errors and re-throws them outside the Observable stream
 * otherwise they would stop/complete the Observable stream
 */
export function observableAngularErrorRethrow<T>(
  obs$: Observable<T>,
  callback?: (err: unknown) => void,
): Observable<T | undefined> {
  return obs$.pipe(
    catchError((err: unknown): Observable<undefined> => {
      console.log('catchError: an error occurred', err);
      if (callback !== undefined) callback(err);
      // Rethrow the error to let Angular handle it
      setTimeout((): never => {
        throw err;
      });
      // Handle the error here or return a fallback value
      return of(undefined);
    }),
  );
}
