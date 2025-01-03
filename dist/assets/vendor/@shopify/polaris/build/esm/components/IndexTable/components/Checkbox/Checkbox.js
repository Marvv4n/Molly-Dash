import React, { memo, useContext, useRef, useCallback, useEffect } from 'react';
import { debounce } from '../../../../utilities/debounce.js';
import { classNames } from '../../../../utilities/css.js';
import { setRootProperty } from '../../../../utilities/set-root-property.js';
import styles$1 from '../../IndexTable.css.js';
import styles from './Checkbox.css.js';
import { useIndexValue } from '../../../../utilities/index-provider/hooks.js';
import { RowContext } from '../../../../utilities/index-table/context.js';
import { useI18n } from '../../../../utilities/i18n/hooks.js';
import { Checkbox as Checkbox$1 } from '../../../Checkbox/Checkbox.js';

const Checkbox = /*#__PURE__*/memo(function Checkbox({
  accessibilityLabel
}) {
  const i18n = useI18n();
  const {
    resourceName
  } = useIndexValue();
  const {
    itemId,
    selected,
    disabled,
    onInteraction
  } = useContext(RowContext);
  const label = accessibilityLabel ? accessibilityLabel : i18n.translate('Polaris.IndexTable.selectItem', {
    resourceName: resourceName.singular
  });
  return /*#__PURE__*/React.createElement(CheckboxWrapper, null, /*#__PURE__*/React.createElement("div", {
    className: styles.TableCellContentContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.Wrapper,
    onClick: onInteraction,
    onKeyUp: noop
  }, /*#__PURE__*/React.createElement(Checkbox$1, {
    id: `Select-${itemId}`,
    label: label,
    labelHidden: true,
    checked: selected,
    disabled: disabled
  }))));
});
function CheckboxWrapper({
  children
}) {
  const {
    position
  } = useContext(RowContext);
  const checkboxNode = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = useCallback(debounce(() => {
    if (position !== 0 || !checkboxNode.current) return;
    const {
      width
    } = checkboxNode.current.getBoundingClientRect();
    setRootProperty('--pc-checkbox-offset', `${width}px`);
  }), [position]);
  useEffect(() => {
    handleResize();
  }, [handleResize]);
  useEffect(() => {
    if (!checkboxNode.current) return;
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  const checkboxClassName = classNames(styles$1.TableCell, styles$1['TableCell-first']);
  return /*#__PURE__*/React.createElement("td", {
    className: checkboxClassName,
    ref: checkboxNode
  }, children);
}
function noop() {}

export { Checkbox, CheckboxWrapper };
