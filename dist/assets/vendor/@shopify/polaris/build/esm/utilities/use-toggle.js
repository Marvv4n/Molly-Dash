import { useState, useCallback } from 'react';

/**
 * Returns a stateful value, and a set of memoized functions to toggle it,
 * set it to true and set it to false
 */
function useToggle(initialState) {
  const [value, setState] = useState(initialState);
  return {
    value,
    toggle: useCallback(() => setState(state => !state), []),
    setTrue: useCallback(() => setState(true), []),
    setFalse: useCallback(() => setState(false), [])
  };
}

export { useToggle };
