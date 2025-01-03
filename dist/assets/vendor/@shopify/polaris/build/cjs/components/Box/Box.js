'use strict';

var React = require('react');
var css = require('../../utilities/css.js');
var Box_module = require('./Box.css.js');

const Box = /*#__PURE__*/React.forwardRef(({
  as = 'div',
  background,
  borderColor,
  borderStyle,
  borderWidth,
  borderBlockStartWidth,
  borderBlockEndWidth,
  borderInlineStartWidth,
  borderInlineEndWidth,
  borderRadius,
  borderEndStartRadius,
  borderEndEndRadius,
  borderStartStartRadius,
  borderStartEndRadius,
  children,
  color,
  id,
  minHeight,
  minWidth,
  maxWidth,
  overflowX,
  overflowY,
  outlineColor,
  outlineStyle,
  outlineWidth,
  padding,
  paddingBlock,
  paddingBlockStart,
  paddingBlockEnd,
  paddingInline,
  paddingInlineStart,
  paddingInlineEnd,
  role,
  shadow,
  tabIndex,
  width,
  printHidden,
  visuallyHidden,
  position,
  insetBlockStart,
  insetBlockEnd,
  insetInlineStart,
  insetInlineEnd,
  zIndex,
  opacity,
  ...restProps
}, ref) => {
  // eslint-disable-next-line no-nested-ternary
  const borderStyleValue = borderStyle ? borderStyle : borderColor || borderWidth || borderBlockStartWidth || borderBlockEndWidth || borderInlineStartWidth || borderInlineEndWidth ? 'solid' : undefined;

  // eslint-disable-next-line no-nested-ternary
  const outlineStyleValue = outlineStyle ? outlineStyle : outlineColor || outlineWidth ? 'solid' : undefined;
  const style = {
    '--pc-box-color': color ? `var(--p-color-${color})` : undefined,
    '--pc-box-background': background ? `var(--p-color-${background})` : undefined,
    // eslint-disable-next-line no-nested-ternary
    '--pc-box-border-color': borderColor ? borderColor === 'transparent' ? 'transparent' : `var(--p-color-${borderColor})` : undefined,
    '--pc-box-border-style': borderStyleValue,
    '--pc-box-border-radius': borderRadius ? `var(--p-border-radius-${borderRadius})` : undefined,
    '--pc-box-border-end-start-radius': borderEndStartRadius ? `var(--p-border-radius-${borderEndStartRadius})` : undefined,
    '--pc-box-border-end-end-radius': borderEndEndRadius ? `var(--p-border-radius-${borderEndEndRadius})` : undefined,
    '--pc-box-border-start-start-radius': borderStartStartRadius ? `var(--p-border-radius-${borderStartStartRadius})` : undefined,
    '--pc-box-border-start-end-radius': borderStartEndRadius ? `var(--p-border-radius-${borderStartEndRadius})` : undefined,
    '--pc-box-border-width': borderWidth ? `var(--p-border-width-${borderWidth})` : undefined,
    '--pc-box-border-block-start-width': borderBlockStartWidth ? `var(--p-border-width-${borderBlockStartWidth})` : undefined,
    '--pc-box-border-block-end-width': borderBlockEndWidth ? `var(--p-border-width-${borderBlockEndWidth})` : undefined,
    '--pc-box-border-inline-start-width': borderInlineStartWidth ? `var(--p-border-width-${borderInlineStartWidth})` : undefined,
    '--pc-box-border-inline-end-width': borderInlineEndWidth ? `var(--p-border-width-${borderInlineEndWidth})` : undefined,
    '--pc-box-min-height': minHeight,
    '--pc-box-min-width': minWidth,
    '--pc-box-max-width': maxWidth,
    '--pc-box-outline-color': outlineColor ? `var(--p-color-${outlineColor})` : undefined,
    '--pc-box-outline-style': outlineStyleValue,
    '--pc-box-outline-width': outlineWidth ? `var(--p-border-width-${outlineWidth})` : undefined,
    '--pc-box-overflow-x': overflowX,
    '--pc-box-overflow-y': overflowY,
    ...css.getResponsiveProps('box', 'padding-block-start', 'space', paddingBlockStart || paddingBlock || padding),
    ...css.getResponsiveProps('box', 'padding-block-end', 'space', paddingBlockEnd || paddingBlock || padding),
    ...css.getResponsiveProps('box', 'padding-inline-start', 'space', paddingInlineStart || paddingInline || padding),
    ...css.getResponsiveProps('box', 'padding-inline-end', 'space', paddingInlineEnd || paddingInline || padding),
    '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : undefined,
    '--pc-box-width': width,
    position,
    '--pc-box-inset-block-start': insetBlockStart ? `var(--p-space-${insetBlockStart})` : undefined,
    '--pc-box-inset-block-end': insetBlockEnd ? `var(--p-space-${insetBlockEnd})` : undefined,
    '--pc-box-inset-inline-start': insetInlineStart ? `var(--p-space-${insetInlineStart})` : undefined,
    '--pc-box-inset-inline-end': insetInlineEnd ? `var(--p-space-${insetInlineEnd})` : undefined,
    zIndex,
    opacity
  };
  const className = css.classNames(Box_module.default.Box, visuallyHidden && Box_module.default.visuallyHidden, printHidden && Box_module.default.printHidden, as === 'ul' && Box_module.default.listReset);
  return /*#__PURE__*/React.createElement(as, {
    className,
    id,
    ref,
    style: css.sanitizeCustomProperties(style),
    role,
    tabIndex,
    ...restProps
  }, children);
});
Box.displayName = 'Box';

exports.Box = Box;