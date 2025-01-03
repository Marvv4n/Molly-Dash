import React, { useCallback } from 'react';
import { CheckIcon } from '@shopify/polaris-icons';
import { useToggle } from '../../../../utilities/use-toggle.js';
import { classNames, variationName } from '../../../../utilities/css.js';
import styles from './Option.css.js';
import { Checkbox } from '../../../Checkbox/Checkbox.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { Icon } from '../../../Icon/Icon.js';
import { Scrollable } from '../../../Scrollable/Scrollable.js';

function Option({
  label,
  value,
  id,
  select,
  active,
  allowMultiple,
  disabled,
  media,
  onClick,
  section,
  index,
  verticalAlign,
  onPointerEnter,
  onFocus
}) {
  const {
    value: focused,
    toggle: toggleFocused
  } = useToggle(false);
  const handleClick = useCallback(() => {
    if (disabled) {
      return;
    }
    onClick(section, index);
  }, [disabled, index, onClick, section]);
  const handlePointerEnter = useCallback(() => {
    if (disabled) {
      return;
    }
    onPointerEnter(section, index);
  }, [disabled, onPointerEnter, section, index]);
  const handleFocus = useCallback(() => {
    toggleFocused();
    onFocus(section, index);
  }, [toggleFocused, onFocus, section, index]);
  const mediaMarkup = media ? /*#__PURE__*/React.createElement("div", {
    className: styles.Media
  }, media) : null;
  const singleSelectClassName = classNames(styles.SingleSelectOption, focused && styles.focused, disabled && styles.disabled, select && styles.select, active && styles.active, verticalAlign && styles[variationName('verticalAlign', verticalAlign)]);
  const multiSelectClassName = classNames(styles.Label, disabled && styles.disabled, active && styles.active, select && styles.select, verticalAlign && styles[variationName('verticalAlign', verticalAlign)], allowMultiple && styles.CheckboxLabel, allowMultiple && styles.MultiSelectOption);
  const optionMarkup = allowMultiple ? /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    className: multiSelectClassName
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Checkbox
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: id,
    label: "",
    ariaDescribedBy: `${id}-label`,
    value: value,
    checked: select,
    disabled: disabled,
    onChange: handleClick
  })), mediaMarkup, /*#__PURE__*/React.createElement("span", {
    id: `${id}-label`
  }, label)) : /*#__PURE__*/React.createElement("button", {
    id: id,
    type: "button",
    className: singleSelectClassName,
    onClick: handleClick,
    disabled: disabled,
    onFocus: handleFocus,
    onBlur: toggleFocused,
    "aria-pressed": active || select
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(InlineStack, {
    wrap: false,
    blockAlign: verticalAlignToBlockAlign(verticalAlign)
  }, mediaMarkup, label), (select || active) && /*#__PURE__*/React.createElement("span", {
    className: styles.Icon
  }, /*#__PURE__*/React.createElement(Icon, {
    source: CheckIcon
  }))));
  const scrollMarkup = active ? /*#__PURE__*/React.createElement(Scrollable.ScrollTo, null) : null;
  return /*#__PURE__*/React.createElement("li", {
    key: id,
    className: styles.Option,
    tabIndex: -1,
    onPointerEnter: handlePointerEnter
  }, scrollMarkup, optionMarkup);
}
function verticalAlignToBlockAlign(verticalAlign) {
  switch (verticalAlign) {
    case 'top':
      return 'start';
    case 'center':
      return 'center';
    case 'bottom':
      return 'end';
    default:
      return 'start';
  }
}

export { Option };