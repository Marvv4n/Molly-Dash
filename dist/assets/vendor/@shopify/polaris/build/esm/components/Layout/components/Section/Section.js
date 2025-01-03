import React from 'react';
import { classNames } from '../../../../utilities/css.js';
import styles from '../../Layout.css.js';

function Section({
  children,
  variant
}) {
  const className = classNames(styles.Section, styles[`Section-${variant}`]);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, children);
}

export { Section };
