'use strict';

var React = require('react');
var polarisTokens = require('@shopify/polaris-tokens');
var target = require('./target.js');
var useIsomorphicLayoutEffect = require('./use-isomorphic-layout-effect.js');

const Breakpoints = {
  // TODO: Update to smDown
  navigationBarCollapsed: '767.95px',
  // TODO: Update to lgDown
  stackedContent: '1039.95px'
};
const noWindowMatches = {
  media: '',
  addListener: noop,
  removeListener: noop,
  matches: false,
  onchange: noop,
  addEventListener: noop,
  removeEventListener: noop,
  dispatchEvent: _ => true
};
function noop() {}
function navigationBarCollapsed() {
  return target.isServer ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.navigationBarCollapsed})`);
}
function stackedContent() {
  return target.isServer ? noWindowMatches : window.matchMedia(`(max-width: ${Breakpoints.stackedContent})`);
}

/**
 * Directional alias for each Polaris `breakpoints` token.
 *
 * @example 'smUp' | 'smDown' | 'smOnly' | 'mdUp' | etc.
 */

/**
 * Match results for each directional Polaris `breakpoints` alias.
 */

const hookCallbacks = new Set();
const breakpointsQueryEntries = getBreakpointsQueryEntries(polarisTokens.themeDefault.breakpoints);
if (!target.isServer) {
  breakpointsQueryEntries.forEach(([breakpointAlias, query]) => {
    const eventListener = event => {
      for (const hookCallback of hookCallbacks) {
        hookCallback(breakpointAlias, event.matches);
      }
    };
    const mql = window.matchMedia(query);
    if (mql.addListener) {
      mql.addListener(eventListener);
    } else {
      mql.addEventListener('change', eventListener);
    }
  });
}
function getDefaultMatches(defaults) {
  return Object.fromEntries(breakpointsQueryEntries.map(([directionAlias]) => [directionAlias, typeof defaults === 'boolean' ? defaults : defaults?.[directionAlias] ?? false]));
}
function getLiveMatches() {
  return Object.fromEntries(breakpointsQueryEntries.map(([directionAlias, query]) => [directionAlias, window.matchMedia(query).matches]));
}
/**
 * Retrieves media query matches for each directional Polaris `breakpoints` alias.
 *
 * @example
 * const {smUp} = useBreakpoints();
 * return smUp && 'Hello world';
 *
 * @example
 * const {mdUp} = useBreakpoints({defaults: {mdUp: true}});
 * mdUp //=> `true` during SSR
 *
 * @example
 * const breakpoints = useBreakpoints({defaults: true});
 * breakpoints //=> All values will be `true` during SSR
 */
function useBreakpoints(options) {
  // On SSR, and initial CSR, we force usage of the defaults to avoid a
  // hydration mismatch error.
  // Later, in the effect, we will call this again on the client side without
  // any defaults to trigger a more accurate client side evaluation.
  const [breakpoints, setBreakpoints] = React.useState(getDefaultMatches(options?.defaults));
  useIsomorphicLayoutEffect.useIsomorphicLayoutEffect(() => {
    // Now that we're client side, get the real values
    setBreakpoints(getLiveMatches());

    // Register a callback to set the breakpoints object whenever there's a
    // change in the future
    const callback = (breakpointAlias, matches) => {
      setBreakpoints(prevBreakpoints => ({
        ...prevBreakpoints,
        [breakpointAlias]: matches
      }));
    };
    hookCallbacks.add(callback);
    return () => {
      hookCallbacks.delete(callback);
    };
  }, []);
  return breakpoints;
}

/**
 * Converts `breakpoints` tokens into directional media query entries.
 *
 * @example
 * const breakpointsQueryEntries = getBreakpointsQueryEntries(breakpoints);
 * breakpointsQueryEntries === [
 *   ['xsUp', '(min-width: ...)'],
 *   ['xsDown', '(max-width: ...)'],
 *   ['xsOnly', '(min-width: ...) and (max-width: ...)'],
 *   ['smUp', '(min-width: ...) and (max-width: ...)'],
 *   ['mdUp', '(min-width: ...) and (max-width: ...)'],
 *   // etc.
 * ]
 */
function getBreakpointsQueryEntries(breakpoints) {
  const mediaConditionEntries = Object.entries(polarisTokens.getMediaConditions(breakpoints));
  return mediaConditionEntries.map(([breakpointsToken, mediaConditions]) => Object.entries(mediaConditions).map(([direction, mediaCondition]) => {
    const breakpointsAlias = breakpointsToken.split('-')[1];

    // e.g. smUp, smDown, smOnly, etc.
    const directionAlias = `${breakpointsAlias}${capitalize(direction)}`;
    return [directionAlias, mediaCondition];
  })).flat();
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

exports.getBreakpointsQueryEntries = getBreakpointsQueryEntries;
exports.navigationBarCollapsed = navigationBarCollapsed;
exports.stackedContent = stackedContent;
exports.useBreakpoints = useBreakpoints;