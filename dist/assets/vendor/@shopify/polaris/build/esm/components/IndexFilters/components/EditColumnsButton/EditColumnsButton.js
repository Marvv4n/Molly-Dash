import React from 'react';
import { LayoutColumns3Icon } from '@shopify/polaris-icons';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Text } from '../../../Text/Text.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';
import { Button } from '../../../Button/Button.js';

function EditColumnsButton({
  onClick,
  disabled
}) {
  const i18n = useI18n();
  const tooltipContent = /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "bodyMd",
    alignment: "center"
  }, i18n.translate('Polaris.IndexFilters.EditColumnsButton.tooltip'));
  return /*#__PURE__*/React.createElement(Tooltip, {
    content: tooltipContent,
    preferredPosition: "above",
    hoverDelay: 400
  }, /*#__PURE__*/React.createElement(Button, {
    size: "slim",
    onClick: onClick,
    disabled: disabled,
    icon: LayoutColumns3Icon,
    accessibilityLabel: i18n.translate('Polaris.IndexFilters.EditColumnsButton.accessibilityLabel')
  }));
}

export { EditColumnsButton };