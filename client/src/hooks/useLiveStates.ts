import { useRef } from 'react';

export const useLiveStates = <T>(value: T) => {
  const state = useRef<T>(value);
  state.current = value;

  return state;
};
