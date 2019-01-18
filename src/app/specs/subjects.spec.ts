import {AsyncSubject, BehaviorSubject, ReplaySubject} from 'rxjs';

describe('Subjects', () => {
  describe('AsyncSubject', () => {
    it('only emits last value after subject completes', () => {
      let result;

      const subject = new AsyncSubject();

      subject.subscribe((data) => {
        result = data;
      });

      subject.next(1);
      expect(result).toBeUndefined();

      subject.next(2);
      subject.complete();
      expect(result).toBe(2);
    });
  });

  describe('BehaviorSubject', () => {
    it('emits the current value when subscribed to', () => {
      const result = [];

      const subject = new BehaviorSubject(3);

      subject.subscribe((data) => {
        result.push(data);
      });

      expect(result).toEqual([3]);

      subject.next(4);

      expect(result).toEqual([3, 4]);

      subject.subscribe((data) => {
        result.push(data);
      });

      subject.next(5);

      expect(result).toEqual([3, 4, 4, 5, 5]);

    });
  });

  describe('ReplaySubject', () => {
    it('emits the last given n values stored in the last given milliseconds when subscribed to', () => {
      const result = [];

      const subject = new ReplaySubject(3);

      subject.next(4);
      subject.next(5);
      subject.next(6);

      subject.subscribe((data) => {
        result.push(`subscriber 1: ${data}`);
      });

      subject.next(7);

      subject.subscribe((data) => {
        result.push(`subscriber 2: ${data}`);
      });

      subject.next(8);

      expect(result).toEqual([
        'subscriber 1: 4',
        'subscriber 1: 5',
        'subscriber 1: 6',
        'subscriber 1: 7',
        'subscriber 2: 5',
        'subscriber 2: 6',
        'subscriber 2: 7',
        'subscriber 1: 8',
        'subscriber 2: 8',
      ]);
    });
  });
});
