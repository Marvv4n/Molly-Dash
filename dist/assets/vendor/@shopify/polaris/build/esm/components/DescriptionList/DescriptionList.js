import React from 'react';
import { classNames } from '../../utilities/css.js';
import styles from './DescriptionList.css.js';
import { Text } from '../Text/Text.js';

function DescriptionList({
  items,
  gap = 'loose'
}) {
  // There's no good key to give React so using the index is a last resport.
  // we can't use the term/description value as it may be a react component
  // which can't be stringified
  const terms = items.reduce((allTerms, {
    term,
    description
  }, index) => [...allTerms, /*#__PURE__*/React.createElement("dt", {
    key: `dt${index}`,
    className: styles.Term
  }, /*#__PURE__*/React.createElement(Text, {
    as: "span",
    variant: "headingSm"
  }, term)), /*#__PURE__*/React.createElement("dd", {
    key: `dd${index}`,
    className: styles.Description
  }, description)], []);
  const className = classNames(styles.DescriptionList, gap === 'tight' && styles.spacingTight);
  return /*#__PURE__*/React.createElement("dl", {
    className: className
  }, terms);
}

export { DescriptionList };