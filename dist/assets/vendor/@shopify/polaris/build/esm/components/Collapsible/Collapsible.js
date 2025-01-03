import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createVar } from '@shopify/polaris-tokens';
import { classNames } from '../../utilities/css.js';
import styles from './Collapsible.css.js';

function Collapsible({
  id,
  expandOnPrint,
  open,
  variant = 'block',
  transition = true,
  children,
  onAnimationEnd
}) {
  const [size, setSize] = useState(0);
  const [isOpen, setIsOpen] = useState(open);
  const collapsibleContainer = useRef(null);
  const animateIn = typeof transition === 'object' && transition.animateIn;
  const [animationState, setAnimationState] = useState(animateIn ? 'measuring' : 'idle');
  const isFullyOpen = animationState === 'idle' && open && isOpen;
  const isFullyClosed = animationState === 'idle' && !open && !isOpen;
  const content = expandOnPrint || !isFullyClosed ? children : null;
  const vertical = variant === 'block';
  const wrapperClassName = classNames(styles.Collapsible, isFullyClosed && styles.isFullyClosed, expandOnPrint && styles.expandOnPrint, variant === 'inline' && styles.inline, animateIn && styles.animateIn);
  const transitionDisabled = isTransitionDisabled(transition);
  const transitionStyles = typeof transition === 'object' && {
    transitionDelay: createVar(`motion-duration-${transition.delay ?? '0'}`),
    transitionDuration: transition.duration,
    transitionTimingFunction: transition.timingFunction
  };
  const collapsibleStyles = {
    ...transitionStyles,
    ...(vertical ? {
      maxHeight: isFullyOpen ? 'none' : `${size}px`,
      overflow: isFullyOpen ? 'visible' : 'hidden'
    } : {
      maxWidth: isFullyOpen ? 'none' : `${size}px`,
      overflow: isFullyOpen ? 'visible' : 'hidden'
    })
  };
  const handleCompleteAnimation = useCallback(({
    target
  }) => {
    if (target === collapsibleContainer.current) {
      setAnimationState('idle');
      setIsOpen(open);
      onAnimationEnd && onAnimationEnd();
    }
  }, [onAnimationEnd, open]);
  const startAnimation = useCallback(() => {
    if (transitionDisabled) {
      setIsOpen(open);
      setAnimationState('idle');
      if (open && collapsibleContainer.current) {
        setSize(vertical ? collapsibleContainer.current.scrollHeight : collapsibleContainer.current.scrollWidth);
      } else {
        setSize(0);
      }
    } else {
      setAnimationState('measuring');
    }
  }, [open, vertical, transitionDisabled]);
  useEffect(() => {
    if (open !== isOpen) {
      startAnimation();
    }
    // startAnimation should only be fired if the open state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isOpen]);
  useEffect(() => {
    if (!open || !collapsibleContainer.current) return;
    // If collapsible defaults to open, set an initial height
    setSize(vertical ? collapsibleContainer.current.scrollHeight : collapsibleContainer.current.scrollWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!collapsibleContainer.current) return;
    switch (animationState) {
      case 'idle':
        break;
      case 'measuring':
        setSize(vertical ? collapsibleContainer.current.scrollHeight : collapsibleContainer.current.scrollWidth);
        setAnimationState('animating');
        break;
      case 'animating':
        setSize(
        // eslint-disable-next-line no-nested-ternary
        open ? vertical ? collapsibleContainer.current.scrollHeight : collapsibleContainer.current.scrollWidth : 0);
    }
  }, [animationState, vertical, open, isOpen]);
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    style: collapsibleStyles,
    ref: collapsibleContainer,
    className: wrapperClassName,
    onTransitionEnd: handleCompleteAnimation,
    "aria-hidden": !open
  }, content);
}
const zeroDurationRegex = /^0(ms|s)$/;
function isTransitionDisabled(transitionProp) {
  if (typeof transitionProp === 'boolean') {
    return !transitionProp;
  }
  const {
    duration
  } = transitionProp;
  if (duration && zeroDurationRegex.test(duration.trim())) {
    return true;
  }
  return false;
}

export { Collapsible };