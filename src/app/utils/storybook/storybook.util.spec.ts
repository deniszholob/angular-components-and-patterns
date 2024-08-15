import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { addDelay, addError } from './storybook.util';

// @ref: https://rxjs.dev/guide/testing/marble-testing

describe('storybook-functions', () => {
  describe('addDelay', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
    });

    it('should delay the emission of the observable', () => {
      testScheduler.run(({ cold, time, expectObservable }) => {
        const source$ = cold('a|', { a: 1 });
        const t = time('|');
        const expected = 'a|';

        const delayed$ = addDelay(source$, t);
        expectObservable(delayed$).toBe(expected, { a: 1 });
      });
    });

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should delay the emission of the observable by specified milliseconds', (done) => {
      const source$ = of(1);
      const delayed$ = addDelay(source$, 500);

      const nextSpy = jest.fn();

      delayed$.subscribe({
        next: nextSpy,
        complete: () => {
          expect(nextSpy).toHaveBeenCalledWith(1);
          done();
        },
      });

      jest.advanceTimersByTime(500);
    });
  });

  describe('addError', () => {
    it('should return an error observable if isError is true', (done) => {
      addError(of(1), true).subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('Test error'));
          done();
        },
      });
    });

    it('should return the original observable if isError is false', (done) => {
      addError(of(1)).subscribe({
        next: (value) => {
          expect(value).toBe(1);
          done();
        },
      });
    });

    it('should return an error observable if no observable is provided', (done) => {
      addError(undefined).subscribe({
        error: (err) => {
          expect(err).toEqual(new Error('Test error'));
          done();
        },
      });
    });
  });
});
