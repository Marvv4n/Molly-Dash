import React, { useRef, useCallback, useEffect } from 'react';
import { useEventListener } from '../../../../../../utilities/use-event-listener.js';
import styles from '../../Actions.css.js';
import { useI18n } from '../../../../../../utilities/i18n/hooks.js';
import { SecondaryAction } from '../../../SecondaryAction/SecondaryAction.js';

const ACTION_SPACING = 8;
function ActionsMeasurer({
  actions = [],
  groups = [],
  handleMeasurement: handleMeasurementProp
}) {
  const i18n = useI18n();
  const containerNode = useRef(null);
  const defaultRollupGroup = {
    title: i18n.translate('Polaris.ActionMenu.Actions.moreActions'),
    actions: []
  };
  const activator = /*#__PURE__*/React.createElement(SecondaryAction, {
    disclosure: true
  }, defaultRollupGroup.title);
  const handleMeasurement = useCallback(() => {
    if (!containerNode.current) {
      return;
    }
    const containerWidth = containerNode.current.offsetWidth;
    const hiddenActionNodes = containerNode.current.children;
    const hiddenActionNodesArray = Array.from(hiddenActionNodes);
    const hiddenActionsWidths = hiddenActionNodesArray.map(node => {
      const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
      return buttonWidth + ACTION_SPACING;
    });
    const disclosureWidth = hiddenActionsWidths.pop() || 0;
    handleMeasurementProp({
      containerWidth,
      disclosureWidth,
      hiddenActionsWidths
    });
  }, [handleMeasurementProp]);
  useEffect(() => {
    handleMeasurement();
  }, [handleMeasurement, actions, groups]);
  const actionsMarkup = actions.map(action => {
    const {
      content,
      onAction,
      ...rest
    } = action;
    return /*#__PURE__*/React.createElement(SecondaryAction, Object.assign({
      key: content,
      onClick: onAction
    }, rest), content);
  });
  const groupsMarkup = groups.map(group => {
    const {
      title,
      icon
    } = group;
    return /*#__PURE__*/React.createElement(SecondaryAction, {
      key: title,
      disclosure: true,
      icon: icon
    }, title);
  });
  useEventListener('resize', handleMeasurement);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.ActionsLayoutMeasurer,
    ref: containerNode
  }, actionsMarkup, groupsMarkup, activator);
}

export { ActionsMeasurer };
