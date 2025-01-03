'use strict';

var React = require('react');
var polarisIcons = require('@shopify/polaris-icons');
var css = require('../../utilities/css.js');
var useIsAfterInitialMount = require('../../utilities/use-is-after-initial-mount.js');
var types = require('../../types.js');
var useEventListener = require('../../utilities/use-event-listener.js');
var TextField_module = require('./TextField.css.js');
var Labelled = require('../Labelled/Labelled.js');
var Connected = require('../Connected/Connected.js');
var Spinner$1 = require('./components/Spinner/Spinner.js');
var Resizer = require('./components/Resizer/Resizer.js');
var Label = require('../Label/Label.js');
var hooks = require('../../utilities/i18n/hooks.js');
var Icon = require('../Icon/Icon.js');
var Text = require('../Text/Text.js');
var Spinner = require('../Spinner/Spinner.js');

function TextField({
  prefix,
  suffix,
  verticalContent,
  placeholder,
  value = '',
  helpText,
  label,
  labelAction,
  labelHidden,
  disabled,
  clearButton,
  readOnly,
  autoFocus,
  focused,
  multiline,
  error,
  connectedRight,
  connectedLeft,
  type = 'text',
  name,
  id: idProp,
  role,
  step,
  largeStep,
  autoComplete,
  max,
  maxLength,
  maxHeight,
  min,
  minLength,
  pattern,
  inputMode,
  spellCheck,
  ariaOwns,
  ariaControls,
  ariaExpanded,
  ariaActiveDescendant,
  ariaAutocomplete,
  showCharacterCount,
  align,
  requiredIndicator,
  monospaced,
  selectTextOnFocus,
  suggestion,
  variant = 'inherit',
  size = 'medium',
  onClearButtonClick,
  onChange,
  onSpinnerChange,
  onFocus,
  onBlur,
  tone,
  autoSize,
  loading
}) {
  const i18n = hooks.useI18n();
  const [height, setHeight] = React.useState(null);
  const [focus, setFocus] = React.useState(Boolean(focused));
  const isAfterInitial = useIsAfterInitialMount.useIsAfterInitialMount();
  const uniqId = React.useId();
  const id = idProp ?? uniqId;
  const textFieldRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const textAreaRef = React.useRef(null);
  const prefixRef = React.useRef(null);
  const suffixRef = React.useRef(null);
  const loadingRef = React.useRef(null);
  const verticalContentRef = React.useRef(null);
  const buttonPressTimer = React.useRef();
  const spinnerRef = React.useRef(null);
  const getInputRef = React.useCallback(() => {
    return multiline ? textAreaRef.current : inputRef.current;
  }, [multiline]);
  React.useEffect(() => {
    const input = getInputRef();
    if (!input || focused === undefined) return;
    focused ? input.focus() : input.blur();
  }, [focused, verticalContent, getInputRef]);
  React.useEffect(() => {
    const input = inputRef.current;
    const isSupportedInputType = type === 'text' || type === 'tel' || type === 'search' || type === 'url' || type === 'password';
    if (!input || !isSupportedInputType || !suggestion) {
      return;
    }
    input.setSelectionRange(value.length, suggestion.length);
  }, [focus, value, type, suggestion]);
  const normalizedValue = suggestion ? suggestion : value;
  const normalizedStep = step != null ? step : 1;
  const normalizedMax = max != null ? max : Infinity;
  const normalizedMin = min != null ? min : -Infinity;
  const className = css.classNames(TextField_module.default.TextField, Boolean(normalizedValue) && TextField_module.default.hasValue, disabled && TextField_module.default.disabled, readOnly && TextField_module.default.readOnly, error && TextField_module.default.error, tone && TextField_module.default[css.variationName('tone', tone)], multiline && TextField_module.default.multiline, focus && !disabled && TextField_module.default.focus, variant !== 'inherit' && TextField_module.default[variant], size === 'slim' && TextField_module.default.slim);
  const inputType = type === 'currency' ? 'text' : type;
  const isNumericType = type === 'number' || type === 'integer';
  const iconPrefix = /*#__PURE__*/React.isValidElement(prefix) && prefix.type === Icon.Icon;
  const prefixMarkup = prefix ? /*#__PURE__*/React.createElement("div", {
    className: css.classNames(TextField_module.default.Prefix, iconPrefix && TextField_module.default.PrefixIcon),
    id: `${id}-Prefix`,
    ref: prefixRef
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd"
  }, prefix)) : null;
  const suffixMarkup = suffix ? /*#__PURE__*/React.createElement("div", {
    className: TextField_module.default.Suffix,
    id: `${id}-Suffix`,
    ref: suffixRef
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    variant: "bodyMd"
  }, suffix)) : null;
  const loadingMarkup = loading ? /*#__PURE__*/React.createElement("div", {
    className: TextField_module.default.Loading,
    id: `${id}-Loading`,
    ref: loadingRef
  }, /*#__PURE__*/React.createElement(Spinner.Spinner, {
    size: "small"
  })) : null;
  let characterCountMarkup = null;
  if (showCharacterCount) {
    const characterCount = normalizedValue.length;
    const characterCountLabel = maxLength ? i18n.translate('Polaris.TextField.characterCountWithMaxLength', {
      count: characterCount,
      limit: maxLength
    }) : i18n.translate('Polaris.TextField.characterCount', {
      count: characterCount
    });
    const characterCountClassName = css.classNames(TextField_module.default.CharacterCount, multiline && TextField_module.default.AlignFieldBottom);
    const characterCountText = !maxLength ? characterCount : `${characterCount}/${maxLength}`;
    characterCountMarkup = /*#__PURE__*/React.createElement("div", {
      id: `${id}-CharacterCounter`,
      className: characterCountClassName,
      "aria-label": characterCountLabel,
      "aria-live": focus ? 'polite' : 'off',
      "aria-atomic": "true",
      onClick: handleClickChild
    }, /*#__PURE__*/React.createElement(Text.Text, {
      as: "span",
      variant: "bodyMd"
    }, characterCountText));
  }
  const clearButtonVisible = normalizedValue !== '';
  const clearButtonMarkup = clearButton && clearButtonVisible ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: TextField_module.default.ClearButton,
    onClick: handleClearButtonPress,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Text.Text, {
    as: "span",
    visuallyHidden: true
  }, i18n.translate('Polaris.Common.clear')), /*#__PURE__*/React.createElement(Icon.Icon, {
    source: polarisIcons.XCircleIcon,
    tone: "base"
  })) : null;
  const handleNumberChange = React.useCallback((steps, stepAmount = normalizedStep) => {
    if (onChange == null && onSpinnerChange == null) {
      return;
    }
    // Returns the length of decimal places in a number
    const dpl = num => (num.toString().split('.')[1] || []).length;
    const numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue)) {
      return;
    }

    // Making sure the new value has the same length of decimal places as the
    // step / value has.
    const decimalPlaces = type === 'integer' ? 0 : Math.max(dpl(numericValue), dpl(stepAmount));
    const newValue = Math.min(Number(normalizedMax), Math.max(numericValue + steps * stepAmount, Number(normalizedMin)));
    if (onSpinnerChange != null) {
      onSpinnerChange(String(newValue.toFixed(decimalPlaces)), id);
    } else if (onChange != null) {
      onChange(String(newValue.toFixed(decimalPlaces)), id);
    }
  }, [id, normalizedMax, normalizedMin, onChange, onSpinnerChange, normalizedStep, type, value]);
  const handleSpinnerButtonRelease = React.useCallback(() => {
    clearTimeout(buttonPressTimer.current);
  }, []);
  const handleSpinnerButtonPress = React.useCallback(onChange => {
    const minInterval = 50;
    const decrementBy = 10;
    let interval = 200;
    const onChangeInterval = () => {
      if (interval > minInterval) interval -= decrementBy;
      onChange(0);
      buttonPressTimer.current = window.setTimeout(onChangeInterval, interval);
    };
    buttonPressTimer.current = window.setTimeout(onChangeInterval, interval);
    document.addEventListener('mouseup', handleSpinnerButtonRelease, {
      once: true
    });
  }, [handleSpinnerButtonRelease]);
  const spinnerMarkup = isNumericType && step !== 0 && !disabled && !readOnly ? /*#__PURE__*/React.createElement(Spinner$1.Spinner, {
    onClick: handleClickChild,
    onChange: handleNumberChange,
    onMouseDown: handleSpinnerButtonPress,
    onMouseUp: handleSpinnerButtonRelease,
    ref: spinnerRef,
    onBlur: handleOnBlur
  }) : null;
  const style = multiline && height ? {
    height,
    maxHeight
  } : null;
  const handleExpandingResize = React.useCallback(height => {
    setHeight(height);
  }, []);
  const resizer = multiline && isAfterInitial ? /*#__PURE__*/React.createElement(Resizer.Resizer, {
    contents: normalizedValue || placeholder,
    currentHeight: height,
    minimumLines: typeof multiline === 'number' ? multiline : 1,
    onHeightChange: handleExpandingResize
  }) : null;
  const describedBy = [];
  if (error) {
    describedBy.push(`${id}Error`);
  }
  if (helpText) {
    describedBy.push(Labelled.helpTextID(id));
  }
  if (showCharacterCount) {
    describedBy.push(`${id}-CharacterCounter`);
  }
  const labelledBy = [];
  if (prefix) {
    labelledBy.push(`${id}-Prefix`);
  }
  if (suffix) {
    labelledBy.push(`${id}-Suffix`);
  }
  if (verticalContent) {
    labelledBy.push(`${id}-VerticalContent`);
  }
  labelledBy.unshift(Label.labelID(id));
  const inputClassName = css.classNames(TextField_module.default.Input, align && TextField_module.default[css.variationName('Input-align', align)], suffix && TextField_module.default['Input-suffixed'], clearButton && TextField_module.default['Input-hasClearButton'], monospaced && TextField_module.default.monospaced, suggestion && TextField_module.default.suggestion, autoSize && TextField_module.default['Input-autoSize']);
  const handleOnFocus = event => {
    setFocus(true);
    if (selectTextOnFocus && !suggestion) {
      const input = getInputRef();
      input?.select();
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  useEventListener.useEventListener('wheel', handleOnWheel, inputRef);
  function handleOnWheel(event) {
    if (document.activeElement === event.target && isNumericType) {
      event.stopPropagation();
    }
  }
  const input = /*#__PURE__*/React.createElement(multiline ? 'textarea' : 'input', {
    name,
    id,
    disabled,
    readOnly,
    role,
    autoFocus,
    value: normalizedValue,
    placeholder,
    style,
    autoComplete,
    className: inputClassName,
    ref: multiline ? textAreaRef : inputRef,
    min,
    max,
    step,
    minLength,
    maxLength,
    spellCheck,
    pattern,
    inputMode,
    type: inputType,
    rows: getRows(multiline),
    size: autoSize ? 1 : undefined,
    'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined,
    'aria-labelledby': labelledBy.join(' '),
    'aria-invalid': Boolean(error),
    'aria-owns': ariaOwns,
    'aria-activedescendant': ariaActiveDescendant,
    'aria-autocomplete': ariaAutocomplete,
    'aria-controls': ariaControls,
    'aria-expanded': ariaExpanded,
    'aria-required': requiredIndicator,
    ...normalizeAriaMultiline(multiline),
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    onClick: handleClickChild,
    onKeyPress: handleKeyPress,
    onKeyDown: handleKeyDown,
    onChange: !suggestion ? handleChange : undefined,
    onInput: suggestion ? handleChange : undefined,
    // 1Password disable data attribute
    'data-1p-ignore': autoComplete === 'off' || undefined,
    // LastPass disable data attribute
    'data-lpignore': autoComplete === 'off' || undefined,
    // Dashlane disable data attribute
    'data-form-type': autoComplete === 'off' ? 'other' : undefined
  });
  const inputWithVerticalContentMarkup = verticalContent ? /*#__PURE__*/React.createElement("div", {
    className: TextField_module.default.VerticalContent,
    id: `${id}-VerticalContent`,
    ref: verticalContentRef,
    onClick: handleClickChild
  }, verticalContent, input) : null;
  const inputMarkup = verticalContent ? inputWithVerticalContentMarkup : input;
  const backdropMarkup = /*#__PURE__*/React.createElement("div", {
    className: css.classNames(TextField_module.default.Backdrop, connectedLeft && TextField_module.default['Backdrop-connectedLeft'], connectedRight && TextField_module.default['Backdrop-connectedRight'])
  });
  const inputAndSuffixMarkup = autoSize ? /*#__PURE__*/React.createElement("div", {
    className: TextField_module.default.InputAndSuffixWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: css.classNames(TextField_module.default.AutoSizeWrapper, suffix && TextField_module.default.AutoSizeWrapperWithSuffix),
    "data-auto-size-value": value || placeholder
  }, inputMarkup), suffixMarkup) : /*#__PURE__*/React.createElement(React.Fragment, null, inputMarkup, suffixMarkup);
  return /*#__PURE__*/React.createElement(Labelled.Labelled, {
    label: label,
    id: id,
    error: error,
    action: labelAction,
    labelHidden: labelHidden,
    helpText: helpText,
    requiredIndicator: requiredIndicator,
    disabled: disabled,
    readOnly: readOnly
  }, /*#__PURE__*/React.createElement(Connected.Connected, {
    left: connectedLeft,
    right: connectedRight
  }, /*#__PURE__*/React.createElement("div", {
    className: className,
    onClick: handleClick,
    ref: textFieldRef
  }, prefixMarkup, inputAndSuffixMarkup, characterCountMarkup, loadingMarkup, clearButtonMarkup, spinnerMarkup, backdropMarkup, resizer)));
  function handleChange(event) {
    onChange && onChange(event.currentTarget.value, id);
  }
  function handleClick(event) {
    const {
      target
    } = event;

    // For TextFields used with Combobox, focus needs to be set again even
    // if the TextField is already focused to trigger the logic to open the
    // Combobox activator
    const inputRefRole = inputRef?.current?.getAttribute('role');
    if (target === inputRef.current && inputRefRole === 'combobox') {
      inputRef.current?.focus();
      handleOnFocus(event);
      return;
    }
    if (isPrefixOrSuffix(target) || isVerticalContent(target) || isInput(target) || isSpinner(target) || isLoadingSpinner(target) || focus) {
      return;
    }
    getInputRef()?.focus();
  }
  function handleClickChild(event) {
    if (!isSpinner(event.target) && !isInput(event.target)) {
      event.stopPropagation();
    }
    if (isPrefixOrSuffix(event.target) || isVerticalContent(event.target) || isInput(event.target) || isLoadingSpinner(event.target) || focus) {
      return;
    }
    setFocus(true);
    getInputRef()?.focus();
  }
  function handleClearButtonPress() {
    onClearButtonClick && onClearButtonClick(id);
  }
  function handleKeyPress(event) {
    const {
      key,
      which
    } = event;
    const numbersSpec = /[\d.,eE+-]$/;
    const integerSpec = /[\deE+-]$/;
    if (!isNumericType || which === types.Key.Enter || type === 'number' && numbersSpec.test(key) || type === 'integer' && integerSpec.test(key)) {
      return;
    }
    event.preventDefault();
  }
  function handleKeyDown(event) {
    if (!isNumericType) {
      return;
    }
    const {
      key,
      which
    } = event;
    if (type === 'integer' && (key === 'ArrowUp' || which === types.Key.UpArrow)) {
      handleNumberChange(1);
      event.preventDefault();
    }
    if (type === 'integer' && (key === 'ArrowDown' || which === types.Key.DownArrow)) {
      handleNumberChange(-1);
      event.preventDefault();
    }
    if ((which === types.Key.Home || key === 'Home') && min !== undefined) {
      if (onSpinnerChange != null) {
        onSpinnerChange(String(min), id);
      } else if (onChange != null) {
        onChange(String(min), id);
      }
    }
    if ((which === types.Key.End || key === 'End') && max !== undefined) {
      if (onSpinnerChange != null) {
        onSpinnerChange(String(max), id);
      } else if (onChange != null) {
        onChange(String(max), id);
      }
    }
    if ((which === types.Key.PageUp || key === 'PageUp') && largeStep !== undefined) {
      handleNumberChange(1, largeStep);
    }
    if ((which === types.Key.PageDown || key === 'PageDown') && largeStep !== undefined) {
      handleNumberChange(-1, largeStep);
    }
  }
  function handleOnBlur(event) {
    setFocus(false);

    // Return early if new focus target is inside the TextField component
    if (textFieldRef.current?.contains(event?.relatedTarget)) {
      return;
    }
    if (onBlur) {
      onBlur(event);
    }
  }
  function isInput(target) {
    const input = getInputRef();
    return target instanceof HTMLElement && input && (input.contains(target) || input.contains(document.activeElement));
  }
  function isPrefixOrSuffix(target) {
    return target instanceof Element && (prefixRef.current && prefixRef.current.contains(target) || suffixRef.current && suffixRef.current.contains(target));
  }
  function isSpinner(target) {
    return target instanceof Element && spinnerRef.current && spinnerRef.current.contains(target);
  }
  function isLoadingSpinner(target) {
    return target instanceof Element && loadingRef.current && loadingRef.current.contains(target);
  }
  function isVerticalContent(target) {
    return target instanceof Element && verticalContentRef.current && (verticalContentRef.current.contains(target) || verticalContentRef.current.contains(document.activeElement));
  }
}
function getRows(multiline) {
  if (!multiline) return undefined;
  return typeof multiline === 'number' ? multiline : 1;
}
function normalizeAriaMultiline(multiline) {
  if (!multiline) return undefined;
  return Boolean(multiline) || typeof multiline === 'number' && multiline > 0 ? {
    'aria-multiline': true
  } : undefined;
}

exports.TextField = TextField;