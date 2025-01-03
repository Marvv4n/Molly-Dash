import React, { useId, useMemo, useEffect, useCallback } from 'react';
import styles from './SearchField.css.js';
import { useComboboxTextField } from '../../../../utilities/combobox/hooks.js';
import { labelID, Label } from '../../../Label/Label.js';
import { InlineStack } from '../../../InlineStack/InlineStack.js';
import { Text } from '../../../Text/Text.js';

function SearchField({
  value,
  id: idProp,
  type = 'text',
  onFocus,
  onBlur,
  onChange,
  label,
  prefix,
  placeholder,
  focused
}) {
  const inputRef = React.useRef(null);
  const comboboxTextFieldContext = useComboboxTextField();
  const {
    activeOptionId,
    listboxId,
    setTextFieldFocused,
    setTextFieldLabelId,
    onTextFieldFocus,
    onTextFieldChange,
    onTextFieldBlur
  } = comboboxTextFieldContext;
  const uniqueId = useId();
  const textFieldId = useMemo(() => idProp || uniqueId, [uniqueId, idProp]);
  const labelId = useMemo(() => labelID(idProp || uniqueId), [uniqueId, idProp]);
  useEffect(() => {
    if (setTextFieldLabelId) setTextFieldLabelId(labelId);
  }, [labelId, setTextFieldLabelId]);
  const handleFocus = useCallback(event => {
    if (onFocus) onFocus(event);
    if (onTextFieldFocus) onTextFieldFocus();
    if (setTextFieldFocused) setTextFieldFocused(true);
  }, [onFocus, onTextFieldFocus, setTextFieldFocused]);
  const handleBlur = useCallback(event => {
    if (onBlur) onBlur(event);
    if (onTextFieldBlur) onTextFieldBlur();
    if (setTextFieldFocused) setTextFieldFocused(false);
  }, [onBlur, onTextFieldBlur, setTextFieldFocused]);
  const handleChange = useCallback((value, id) => {
    if (onChange) onChange(value, id);
    if (onTextFieldChange) onTextFieldChange(value);
  }, [onChange, onTextFieldChange]);
  if (focused && document.activeElement !== inputRef.current) {
    inputRef.current?.focus();
  }
  return /*#__PURE__*/React.createElement(InlineStack, {
    gap: "100",
    blockAlign: "center"
  }, /*#__PURE__*/React.createElement(Label, {
    id: textFieldId
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    visuallyHidden: true
  }, label), /*#__PURE__*/React.createElement("span", null, prefix)), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    id: textFieldId,
    className: styles.SearchField,
    value: value,
    type: type,
    role: "combobox",
    placeholder: placeholder,
    autoComplete: "off",
    "aria-activedescendant": activeOptionId,
    "aria-haspopup": "listbox",
    "aria-autocomplete": "list",
    "aria-expanded": "true",
    "aria-controls": listboxId,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: ({
      target
    }) => handleChange(target.value, textFieldId)
  }));
}

export { SearchField };