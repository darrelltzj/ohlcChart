import React from 'react';
import PropTypes from 'prop-types';

function PageSelector(props) {
  const { viewPage, type } = props;
  return (
    <span
      onClick={() => viewPage(type)}
      role="presentation"
      style={{
        cursor: 'pointer',
        fontSize: 20,
      }}
    >
      {type === 'prev' ? '<' : '>'}
    </span>
  );
}

PageSelector.propTypes = {
  type: PropTypes.oneOf(['prev', 'next']),
  viewPage: PropTypes.func,
};

PageSelector.defaultProps = {
  type: 'prev',
  viewPage: () => {},
};

export default PageSelector;
