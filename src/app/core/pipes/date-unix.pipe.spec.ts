import { DateUnixPipe } from './date-unix.pipe';

describe('DateStartPipe', () => {
  it('create an instance', () => {
    const pipe = new DateUnixPipe();
    expect(pipe).toBeTruthy();
  });
});
