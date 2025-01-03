import React from 'react';
import { XSmallIcon } from '@shopify/polaris-icons';
import { classNames, variationName } from '../../utilities/css.js';
import { handleMouseUpByBlurring } from '../../utilities/focus.js';
import styles from './Tag.css.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { Text } from '../Text/Text.js';
import { Icon } from '../Icon/Icon.js';

function Tag({
  children,
  disabled = false,
  onClick,
  onRemove,
  accessibilityLabel,
  url,
  size
}) {
  const i18n = useI18n();
  const segmented = onRemove && url;
  const className = classNames(styles.Tag, disabled && styles.disabled, onClick && styles.clickable, onRemove && styles.removable, url && !disabled && styles.linkable, segmented && styles.segmented, size && styles[variationName('size', size)]);
  let tagTitle = accessibilityLabel;
  if (!tagTitle) {
    tagTitle = typeof children === 'string' ? children : undefined;
  }
  const tagText = /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodySm",
    truncate: true
  }, /*#__PURE__*/React.createElement("span", {
    title: tagTitle,
    className: styles.Text
  }, children));
  if (onClick) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      disabled: disabled,
      className: className,
      onClick: onClick
    }, tagText);
  }
  const ariaLabel = i18n.translate('Polaris.Tag.ariaLabel', {
    children: tagTitle || ''
  });
  const removeButton = onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": ariaLabel,
    className: classNames(styles.Button, segmented && styles.segmented),
    onClick: onRemove,
    onMouseUp: handleMouseUpByBlurring,
    disabled: disabled
  }, /*#__PURE__*/React.createElement(Icon, {
    source: XSmallIcon
  })) : null;
  const tagContent = url && !disabled ? /*#__PURE__*/React.createElement("a", {
    className: classNames(styles.Link, segmented && styles.segmented),
    href: url
  }, tagText) : tagText;
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    "aria-disabled": disabled
  }, tagContent, size === 'large' && /*#__PURE__*/React.createElement("span", {
    className: styles.overlay
  }), removeButton);
}

export { Tag };
