import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames, variationName } from '../../utilities/css.js';
import { useTheme } from '../../utilities/use-theme.js';
import styles from './ProgressBar.css.js';
import { useI18n } from '../../utilities/i18n/hooks.js';

function ProgressBar({
  progress = 0,
  size = 'medium',
  tone = 'highlight',
  animated: hasAppearAnimation = true,
  ariaLabelledBy
}) {
  const theme = useTheme();
  const i18n = useI18n();
  const indicatorRef = useRef(null);
  const className = classNames(styles.ProgressBar, size && styles[variationName('size', size)], tone && styles[variationName('tone', tone)]);
  const warningMessage = i18n.translate(progress < 0 ? 'Polaris.ProgressBar.negativeWarningMessage' : 'Polaris.ProgressBar.exceedWarningMessage', {
    progress
  });
  const parsedProgress = parseProgress(progress, warningMessage);
  const progressBarDuration = hasAppearAnimation ? theme.motion['motion-duration-500'] : theme.motion['motion-duration-0'];

  /* eslint-disable @shopify/jsx-no-hardcoded-content */
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("progress", {
    "aria-labelledby": ariaLabelledBy,
    className: styles.Progress,
    value: parsedProgress,
    max: "100"
  }), /*#__PURE__*/React.createElement(CSSTransition, {
    in: true,
    appear: true,
    timeout: parseInt(progressBarDuration, 10),
    nodeRef: indicatorRef,
    classNames: {
      appearActive: styles.IndicatorAppearActive,
      appearDone: styles.IndicatorAppearDone
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: indicatorRef,
    className: styles.Indicator,
    style: {
      '--pc-progress-bar-duration': progressBarDuration,
      '--pc-progress-bar-percent': parsedProgress / 100
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.Label
  }, parsedProgress, "%"))))
  /* eslint-enable @shopify/jsx-no-hardcoded-content */;
}
function parseProgress(progress, warningMessage) {
  let progressWidth;
  if (progress < 0) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
    progressWidth = 0;
  } else if (progress > 100) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
    progressWidth = 100;
  } else {
    progressWidth = progress;
  }
  return progressWidth;
}

export { ProgressBar };
