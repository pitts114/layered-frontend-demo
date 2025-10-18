import { describe, it, expect } from 'vitest';
import counterReducer, {
  increment,
  decrement,
  selectCount,
} from '../../../src/features/counter/counterSlice';

describe('counter reducer', () => {
  const initialState = {
    value: 0,
  };

  it('should return the initial state when passed an empty action', () => {
    const result = counterReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle increment action', () => {
    const previousState = { value: 5 };
    const result = counterReducer(previousState, increment());
    expect(result.value).toBe(6);
  });

  it('should handle decrement action', () => {
    const previousState = { value: 0 };
    const result = counterReducer(previousState, decrement());
    expect(result.value).toBe(-1);
  });
});

describe('selectCount', () => {
  it('should select the counter value from the state', () => {
    const state = {
      counter: {
        value: 10,
      },
    };
    const result = selectCount(state);
    expect(result).toBe(10);
  });
});
