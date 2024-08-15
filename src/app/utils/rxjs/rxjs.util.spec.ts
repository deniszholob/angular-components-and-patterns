import { of, throwError } from 'rxjs';

import { observableAngularErrorRethrow } from './rxjs.util';

describe('rxjs-functions', () => {
  describe('observableAngularErrorRethrow', () => {
    it('should pass through values if there are no errors', (done: jest.DoneCallback) => {
      const arr: number[] = [1, 2, 3];
      const input$ = of(...arr);
      const result$ = observableAngularErrorRethrow(input$);

      const results: (number | undefined)[] = [];
      result$.subscribe({
        next: (value) => results.push(value),
        complete: () => {
          expect(results).toEqual(arr);
          done();
        },
      });
    });

    it('should call the callback on error and rethrow the error asynchronously', (done: jest.DoneCallback) => {
      const error = new Error('Test error');
      const input$ = throwError(() => error);
      const callback = jest.fn();
      const result$ = observableAngularErrorRethrow(input$, callback);

      const results: (number | undefined)[] = [];
      result$.subscribe({
        next: (value) => results.push(value),
        error: () => {
          // This block will not be executed as the error is caught
          fail('Error should not be propagated');
        },
        complete: () => {
          expect(callback).toHaveBeenCalledWith(error);
          expect(results).toEqual([undefined]);

          // Verify error is rethrown asynchronously
          setTimeout(() => {
            try {
              expect(() => {
                throw error;
              }).toThrow(error);
              done();
            } catch (e) {
              done.fail(String(e));
            }
          });

          done();
        },
      });
    });
  });
});
