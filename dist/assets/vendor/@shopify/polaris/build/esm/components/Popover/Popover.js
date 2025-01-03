import React, { forwardRef, useState, useRef, useId, useImperativeHandle, useCallback, useEffect, Children } from 'react';
import { findFirstFocusableNodeIncludingDisabled, focusNextFocusableNode } from '../../utilities/focus.js';
import { portal } from '../shared.js';
import { setActivatorAttributes } from './set-activator-attributes.js';
import { PopoverCloseSource, PopoverOverlay } from './components/PopoverOverlay/PopoverOverlay.js';
import { Pane } from './components/Pane/Pane.js';
import { Section } from './components/Section/Section.js';
import { Portal } from '../Portal/Portal.js';

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

const PopoverComponent = /*#__PURE__*/forwardRef(function Popover({
  activatorWrapper = 'div',
  children,
  onClose,
  activator,
  preventFocusOnClose,
  active,
  fixed,
  ariaHaspopup,
  preferInputActivator = true,
  zIndexOverride,
  ...rest
}, ref) {
  const [isDisplayed, setIsDisplay] = useState(false);
  const [activatorNode, setActivatorNode] = useState();
  const overlayRef = useRef(null);
  const activatorContainer = useRef(null);
  const WrapperComponent = activatorWrapper;
  const id = useId();
  function forceUpdatePosition() {
    overlayRef.current?.forceUpdatePosition();
  }
  const handleClose = source => {
    onClose(source);
    if (activatorContainer.current == null || preventFocusOnClose) {
      return;
    }
    if (source === PopoverCloseSource.FocusOut && activatorNode) {
      const focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode) || findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current;
      if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
        focusableActivator.focus();
      }
    } else if (source === PopoverCloseSource.EscapeKeypress && activatorNode) {
      const focusableActivator = findFirstFocusableNodeIncludingDisabled(activatorNode) || findFirstFocusableNodeIncludingDisabled(activatorContainer.current) || activatorContainer.current;
      if (focusableActivator) {
        focusableActivator.focus();
      } else {
        focusNextFocusableNode(focusableActivator, isInPortal);
      }
    }
  };
  useImperativeHandle(ref, () => {
    return {
      forceUpdatePosition,
      close: (target = 'activator') => {
        const source = target === 'activator' ? PopoverCloseSource.EscapeKeypress : PopoverCloseSource.FocusOut;
        handleClose(source);
      }
    };
  });
  const setAccessibilityAttributes = useCallback(() => {
    if (activatorContainer.current == null) {
      return;
    }
    const firstFocusable = findFirstFocusableNodeIncludingDisabled(activatorContainer.current);
    const focusableActivator = firstFocusable || activatorContainer.current;
    const activatorDisabled = 'disabled' in focusableActivator && Boolean(focusableActivator.disabled);
    setActivatorAttributes(focusableActivator, {
      id,
      active,
      ariaHaspopup,
      activatorDisabled
    });
  }, [id, active, ariaHaspopup]);
  useEffect(() => {
    function setDisplayState() {
      /**
       * This is a workaround to prevent rendering the Popover when the content is moved into
       * a React portal that hasn't been rendered. We don't want to render the Popover in this
       * case because the auto-focus logic will break. We wait until the activatorContainer is
       * displayed, which is when it has an offsetParent, or if the activatorContainer is the
       * body, if it has a clientWidth bigger than 0.
       * See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
       */

      setIsDisplay(Boolean(activatorContainer.current && (activatorContainer.current.offsetParent !== null || activatorContainer.current === activatorContainer.current.ownerDocument.body && activatorContainer.current.clientWidth > 0)));
    }
    if (!activatorContainer.current) {
      return;
    }
    const observer = new ResizeObserver(setDisplayState);
    observer.observe(activatorContainer.current);
    setDisplayState();
    return () => {
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!activatorNode && activatorContainer.current) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    } else if (activatorNode && activatorContainer.current && !activatorContainer.current.contains(activatorNode)) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    }
    setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]);
  useEffect(() => {
    if (activatorNode && activatorContainer.current) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    }
    setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]);
  const portal = activatorNode && isDisplayed ? /*#__PURE__*/React.createElement(Portal, {
    idPrefix: "popover"
  }, /*#__PURE__*/React.createElement(PopoverOverlay, Object.assign({
    ref: overlayRef,
    id: id,
    activator: activatorNode,
    preferInputActivator: preferInputActivator,
    onClose: handleClose,
    active: active,
    fixed: fixed,
    zIndexOverride: zIndexOverride
  }, rest), children)) : null;
  return /*#__PURE__*/React.createElement(WrapperComponent, {
    ref: activatorContainer
  }, Children.only(activator), portal);
});
function isInPortal(element) {
  let parentElement = element.parentElement;
  while (parentElement) {
    if (parentElement.matches(portal.selector)) return false;
    parentElement = parentElement.parentElement;
  }
  return true;
}
const Popover = Object.assign(PopoverComponent, {
  Pane,
  Section
});

export { Popover, PopoverCloseSource };