import { ChevronLeftIcon, ChevronRightIcon } from '@shopify/polaris-icons';
import React, { createRef } from 'react';
import { isInputFocused } from '../../utilities/is-input-focused.js';
import { classNames } from '../../utilities/css.js';
import styles from './Pagination.css.js';
import { useI18n } from '../../utilities/i18n/hooks.js';
import { KeypressListener } from '../KeypressListener/KeypressListener.js';
import { Box } from '../Box/Box.js';
import { InlineStack } from '../InlineStack/InlineStack.js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.js';
import { Tooltip } from '../Tooltip/Tooltip.js';
import { Text } from '../Text/Text.js';
import { Button } from '../Button/Button.js';

function Pagination({
  hasNext,
  hasPrevious,
  nextURL,
  previousURL,
  onNext,
  onPrevious,
  nextTooltip,
  previousTooltip,
  nextKeys,
  previousKeys,
  accessibilityLabel,
  accessibilityLabels,
  label,
  type = 'page'
}) {
  const i18n = useI18n();
  const node = /*#__PURE__*/createRef();
  const navLabel = accessibilityLabel || i18n.translate('Polaris.Pagination.pagination');
  const previousLabel = accessibilityLabels?.previous || i18n.translate('Polaris.Pagination.previous');
  const nextLabel = accessibilityLabels?.next || i18n.translate('Polaris.Pagination.next');
  const prev = /*#__PURE__*/React.createElement(Button, {
    icon: ChevronLeftIcon,
    accessibilityLabel: previousLabel,
    url: previousURL,
    onClick: onPrevious,
    disabled: !hasPrevious,
    id: "previousURL"
  });
  const constructedPrevious = previousTooltip && hasPrevious ? /*#__PURE__*/React.createElement(Tooltip, {
    activatorWrapper: "span",
    content: previousTooltip,
    preferredPosition: "below"
  }, prev) : prev;
  const next = /*#__PURE__*/React.createElement(Button, {
    icon: ChevronRightIcon,
    accessibilityLabel: nextLabel,
    url: nextURL,
    onClick: onNext,
    disabled: !hasNext,
    id: "nextURL"
  });
  const constructedNext = nextTooltip && hasNext ? /*#__PURE__*/React.createElement(Tooltip, {
    activatorWrapper: "span",
    content: nextTooltip,
    preferredPosition: "below"
  }, next) : next;
  const previousHandler = onPrevious || noop;
  const previousButtonEvents = previousKeys && (previousURL || onPrevious) && hasPrevious && previousKeys.map(key => /*#__PURE__*/React.createElement(KeypressListener, {
    key: key,
    keyCode: key,
    handler: previousURL ? handleCallback(clickPaginationLink('previousURL', node)) : handleCallback(previousHandler)
  }));
  const nextHandler = onNext || noop;
  const nextButtonEvents = nextKeys && (nextURL || onNext) && hasNext && nextKeys.map(key => /*#__PURE__*/React.createElement(KeypressListener, {
    key: key,
    keyCode: key,
    handler: nextURL ? handleCallback(clickPaginationLink('nextURL', node)) : handleCallback(nextHandler)
  }));
  if (type === 'table') {
    const labelMarkup = label ? /*#__PURE__*/React.createElement(Box, {
      padding: "300",
      paddingBlockStart: "0",
      paddingBlockEnd: "0"
    }, /*#__PURE__*/React.createElement(Text, {
      as: "span",
      variant: "bodySm",
      fontWeight: "medium"
    }, label)) : null;
    return /*#__PURE__*/React.createElement("nav", {
      "aria-label": navLabel,
      ref: node,
      className: classNames(styles.Pagination, styles.table)
    }, previousButtonEvents, nextButtonEvents, /*#__PURE__*/React.createElement(Box, {
      background: "bg-surface-secondary",
      paddingBlockStart: "150",
      paddingBlockEnd: "150",
      paddingInlineStart: "300",
      paddingInlineEnd: "200"
    }, /*#__PURE__*/React.createElement(InlineStack, {
      align: "center",
      blockAlign: "center"
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.TablePaginationActions,
      "data-buttongroup-variant": "segmented"
    }, /*#__PURE__*/React.createElement("div", null, constructedPrevious), labelMarkup, /*#__PURE__*/React.createElement("div", null, constructedNext)))));
  }
  const labelTextMarkup = hasNext && hasPrevious ? /*#__PURE__*/React.createElement("span", null, label) : /*#__PURE__*/React.createElement(Text, {
    tone: "subdued",
    as: "span"
  }, label);
  const labelMarkup = label ? /*#__PURE__*/React.createElement(Box, {
    padding: "300",
    paddingBlockStart: "0",
    paddingBlockEnd: "0"
  }, /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite"
  }, labelTextMarkup)) : null;
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": navLabel,
    ref: node,
    className: styles.Pagination
  }, previousButtonEvents, nextButtonEvents, /*#__PURE__*/React.createElement(ButtonGroup, {
    variant: "segmented"
  }, constructedPrevious, labelMarkup, constructedNext));
}
function clickPaginationLink(id, node) {
  return () => {
    if (node.current == null) {
      return;
    }
    const link = node.current.querySelector(`#${id}`);
    if (link) {
      link.click();
    }
  };
}
function handleCallback(fn) {
  return () => {
    if (isInputFocused()) {
      return;
    }
    fn();
  };
}
function noop() {}

export { Pagination };
