// BodySectionWithMarginBottom.js
import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection/BodySection'; // Assuming the path to BodySection component
import './BodySectionWithMarginBottom.css';

const BodySectionWithMarginBottom = (props) => {
  return (
    <div className="bodySectionWithMargin">
      <BodySection {...props} />
    </div>
  );
};

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BodySectionWithMarginBottom;