import React from 'react';
import { XIcon } from '@shopify/polaris-icons';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Button } from '../../../Button/Button.js';

function CloseButton({
  pressed,
  onClick
}) {
  const i18n = useI18n();
  return /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    pressed: pressed,
    icon: XIcon,
    onClick: onClick,
    accessibilityLabel: i18n.translate('Polaris.Common.close')
  });
}

export { CloseButton };