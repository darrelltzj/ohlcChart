import React from 'react';
import PropTypes from 'prop-types';
import PageSelector from './PageSelector';

function PageSelectors(props) {
  const { viewPage } = props;
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      color: '#fff',
      width: '90%',
    }}
    >
      <PageSelector
        type="prev"
        viewPage={viewPage}
      />
      <PageSelector
        type="next"
        viewPage={viewPage}
      />
    </div>
  );
}

PageSelectors.propTypes = {
  viewPage: PropTypes.func,
};

PageSelectors.defaultProps = {
  viewPage: () => {},
};

export default PageSelectors;
