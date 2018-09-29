import React from 'react';
import PropTypes from 'prop-types';
import ohlcChartConstants from '../../constants/ohlcChart';

const {
  viewBoxHeight,
  yAxisOffset,
  xAxisOffset,
} = ohlcChartConstants;

function YGrid(props) {
  const { dataDatesSorted, xDataItrvl } = props;
  return (
    <g style={{ stroke: 'black', strokeWidth: 0.2 }}>
      {dataDatesSorted.map((date, i) => {
        const x = `${xAxisOffset + ((1 + +i) * xDataItrvl)}`;
        return (
          <line key={date} x1={x} y1="0" x2={x} y2={`${viewBoxHeight - yAxisOffset}`} />
        );
      })}
    </g>
  );
}

YGrid.propTypes = {
  dataDatesSorted: PropTypes.arrayOf(PropTypes.string),
  xDataItrvl: PropTypes.number,
};

YGrid.defaultProps = {
  dataDatesSorted: [],
  xDataItrvl: 0,
};

export default YGrid;
