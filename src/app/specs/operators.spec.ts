import {from, interval, of, throwError} from 'rxjs';
import {catchError, distinctUntilChanged, flatMap, map, pairwise, skip, take, tap} from 'rxjs/operators';

describe('Operators', () => {
  describe('map', () => {
    it('maps each number to the result of a given applied function', (done) => {
      const observable = of([1, -2, 3])
        .pipe(
          map((values) => values.map((n) => n * n))
        );

      observable.subscribe((data) => {
        expect(data).toEqual([1, 4, 9]);
        done();
      });
    });
  });

  describe('flatMap', () => {
    it('flattens observables to a single one', (done) => {
      const observable = of('Hello')
        .pipe(
          flatMap((val) => of(val))
        );

      observable.subscribe((data) => {
        expect(data).toEqual('Hello');
        done();
      });
    });
  });

  describe('do / tap', () => {
    it('executes a side-effect action', (done) => {
      let result;
      const initial = [1, -2, 3];

      const observable = of(initial)
        .pipe(
          tap((values) => {
            result = values;
            return of(4); // tap, unlike map, does not return 4 as the final value to subscribers
          })
        );

      observable.subscribe((data) => {
        expect(result).toEqual([1, -2, 3]);
        done();
      });
    });
  });

  describe('catchError', () => {
    it('executes the error handler', (done) => {
      const observable = throwError('error message...');

      observable
        .pipe(
          tap(() => console.log('this will not be printed...')),
          catchError((msg) => of(msg))
        )
        .subscribe((data) => {
          expect(data).toBe('error message...');
          done();
        });
    });
  });

  describe('take', () => {
    it('only takes the first n emitted values', (done) => {
      const result = [];
      of(1, 2, 3, 4)
        .pipe(
          take(2)
        )
        .subscribe({
          next: (data) => result.push(data),
          complete: () => {
            expect(result).toEqual([1, 2]);
            done();
          }
        });
    });
  });

  describe('skip', () => {
    it('skips the first n emitted values', (done) => {
      const result = [];
      of(1, 2, 3, 4)
        .pipe(
          skip(2)
        )
        .subscribe({
          next: (data) => result.push(data),
          complete: () => {
            expect(result).toEqual([3, 4]);
            done();
          }
        });
    });
  });

  describe('distinctUntilChanged', () => {
    it('emits a value only when it is different from the previous one', (done) => {
      const result = [];

      from([1, 1, 2, 1, 3, 3, 2])
        .pipe(
          distinctUntilChanged()
        )
        .subscribe({
          next: (data) => result.push(data),
          complete: () => {
            expect(result).toEqual([1, 2, 1, 3, 2]);
            done();
          }
        });
    });
  });

  describe('pairwise', () => {
    it('emits previous and current values as arrays of pairs', (done) => {
      const result = [];

      interval(100)
        .pipe(
          pairwise(),
          take(3)
        )
        .subscribe({
          next: (data) => result.push(data),
          complete: () => {
            expect(result).toEqual([[0, 1], [1, 2], [2, 3]]);
            done();
          }
        });
    });
  });
});
