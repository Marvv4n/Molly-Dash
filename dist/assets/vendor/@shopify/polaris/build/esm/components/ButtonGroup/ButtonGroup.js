import React from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import { elementChildren } from '../../utilities/components.js';
import styles from './ButtonGroup.css.js';
import { Item } from './components/Item/Item.js';

function ButtonGroup({
  children,
  gap,
  variant,
  fullWidth,
  connectedTop,
  noWrap
}) {
  const className = classNames(styles.ButtonGroup, gap && styles[gap], variant && styles[variationName('variant', variant)], fullWidth && styles.fullWidth, noWrap && styles.noWrap);
  const contents = elementChildren(children).map((child, index) => /*#__PURE__*/React.createElement(Item, {
    button: child,
    key: index
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    "data-buttongroup-variant": variant,
    "data-buttongroup-connected-top": connectedTop,
    "data-buttongroup-full-width": fullWidth,
    "data-buttongroup-no-wrap": noWrap
  }, contents);
}

export { ButtonGroup };