import { useCallback, useState } from 'react';
import { isServer } from './target.js';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js';

// Adapted from https://usehooks-ts.com/react-hook/use-media-query

// Derived from https://github.com/argyleink/open-props/blob/09e70c03c0a2533d06ec823f47490f018eb27f23/src/props.media.css#L21-L24
const queryAliases = {
  touch: '(hover: none) and (pointer: coarse)',
  stylus: '(hover: none) and (pointer: fine)',
  pointer: '(hover) and (pointer: coarse)',
  mouse: '(hover) and (pointer: fine)'
};
const isQueryAlias = queryOrAlias => Object.prototype.hasOwnProperty.call(queryAliases, queryOrAlias);

// Prevents TS from widening union types to `string`
// eslint-disable-next-line @typescript-eslint/ban-types

function useMediaQuery(queryOrAlias, options = {}) {
  const {
    defaultValue = false,
    initializeWithValue = false
  } = options;
  const query = isQueryAlias(queryOrAlias) ? queryAliases[queryOrAlias] : queryOrAlias;
  const getMatches = useCallback(query => {
    if (isServer) return defaultValue;
    return window.matchMedia(query).matches;
  }, [defaultValue]);
  const [matches, setMatches] = useState(() => {
    if (initializeWithValue) return getMatches(query);
    return defaultValue;
  });
  const handleChange = useCallback(() => {
    setMatches(getMatches(query));
  }, [getMatches, query]);
  useIsomorphicLayoutEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Use deprecated `addListener` and `removeListener` to support Safari < 14
    // (https://github.com/juliencrn/usehooks-ts/pull/135)
    if (mediaQueryList.addListener) {
      mediaQueryList.addListener(handleChange);
    } else {
      mediaQueryList.addEventListener('change', handleChange);
    }
    return () => {
      if (mediaQueryList.removeListener) {
        mediaQueryList.removeListener(handleChange);
      } else {
        mediaQueryList.removeEventListener('change', handleChange);
      }
    };
  }, [query]);
  return matches;
}

export { queryAliases, useMediaQuery };