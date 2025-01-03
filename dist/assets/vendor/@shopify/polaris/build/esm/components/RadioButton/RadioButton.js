import React, { useId, useRef } from 'react';
import { classNames, variationName } from '../../utilities/css.js';
import styles from './RadioButton.css.js';
import { Choice, helpTextID } from '../Choice/Choice.js';

function RadioButton({
  ariaDescribedBy: ariaDescribedByProp,
  label,
  labelHidden,
  helpText,
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  id: idProp,
  name: nameProp,
  value,
  fill,
  bleed,
  bleedBlockStart,
  bleedBlockEnd,
  bleedInlineStart,
  bleedInlineEnd,
  tone
}) {
  const uniqId = useId();
  const id = idProp ?? uniqId;
  const name = nameProp || id;
  const inputNode = useRef(null);
  const handleBlur = () => {
    onBlur && onBlur();
  };
  function handleChange({
    currentTarget
  }) {
    onChange && onChange(currentTarget.checked, id);
  }
  const describedBy = [];
  if (helpText) {
    describedBy.push(helpTextID(id));
  }
  if (ariaDescribedByProp) {
    describedBy.push(ariaDescribedByProp);
  }
  const ariaDescribedBy = describedBy.length ? describedBy.join(' ') : undefined;
  const inputClassName = classNames(styles.Input, tone && styles[variationName('tone', tone)]);
  const extraChoiceProps = {
    helpText,
    bleed,
    bleedBlockStart,
    bleedBlockEnd,
    bleedInlineStart,
    bleedInlineEnd
  };
  return /*#__PURE__*/React.createElement(Choice, Object.assign({
    label: label,
    labelHidden: labelHidden,
    disabled: disabled,
    id: id,
    labelClassName: styles.ChoiceLabel,
    fill: fill
  }, extraChoiceProps, checked ? {
    tone
  } : {}), /*#__PURE__*/React.createElement("span", {
    className: styles.RadioButton
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    name: name,
    value: value,
    type: "radio",
    checked: checked,
    disabled: disabled,
    className: inputClassName,
    onChange: handleChange,
    onFocus: onFocus,
    onBlur: handleBlur,
    "aria-describedby": ariaDescribedBy,
    ref: inputNode
  }), /*#__PURE__*/React.createElement("span", {
    className: styles.Backdrop
  })));
}

export { RadioButton };
