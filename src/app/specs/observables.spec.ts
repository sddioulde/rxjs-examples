import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import {fakeAsync, tick} from '@angular/core/testing';

describe('Observables', () => {
  describe('Cold vs. Hot', () => {
    describe('Cold', () => {
      it('unicasts the values', () => {
        const result = [];
        const observable = Observable.create(() => {
          result.push(Date.now());
        });

        observable.subscribe();
        observable.subscribe();

        expect(result.length).toBe(2);
      });
    });

    describe('Hot', () => {
      it('multicasts the values', () => {
        const result = [];
        const observable = Observable.create(() => {
          result.push(Date.now());
        }).pipe(share());

        observable.subscribe();
        observable.subscribe();

        expect(result.length).toBe(1);
      });
    });
  });

  describe('Infinite', () => {
    it('executes after each time interval until ...', fakeAsync(() => {
      const result = [];
      let interval;
      const observable = Observable.create(() => {
        let i = 0;
        interval = setInterval(() => {
          result.push(++i);
        }, 1000);
      });

      observable.subscribe();

      tick(1000);
      expect(result).toEqual([1]);

      tick(4000);
      expect(result).toEqual([1, 2, 3, 4, 5]);

      clearInterval(interval);
    }));
  });
});
