import React from 'react';
import { getResponsiveProps, getResponsiveValue } from '../../utilities/css.js';
import styles from './InlineStack.css.js';

const InlineStack = function InlineStack({
  as: Element = 'div',
  align,
  direction = 'row',
  blockAlign,
  gap,
  wrap = true,
  children
}) {
  const style = {
    '--pc-inline-stack-align': align,
    '--pc-inline-stack-block-align': blockAlign,
    '--pc-inline-stack-wrap': wrap ? 'wrap' : 'nowrap',
    ...getResponsiveProps('inline-stack', 'gap', 'space', gap),
    ...getResponsiveValue('inline-stack', 'flex-direction', direction)
  };
  return /*#__PURE__*/React.createElement(Element, {
    className: styles.InlineStack,
    style: style
  }, children);
};

export { InlineStack };