import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ohlcChartConstants from '../../constants/ohlcChart';

const {
  viewBoxHeight,
  xAxisOffset,
  yAxisOffset,
  format,
  fontSize,
} = ohlcChartConstants;

function XLabels(props) {
  const { dataDatesSorted, xDataItrvl } = props;
  const xLabels = dataDatesSorted.reduce((acc, pt, i) => {
    const mth = moment(pt, format).format('MMM');
    const yr = moment(pt, format).year();
    return acc[`${yr}${mth}`] ? acc : {
      ...acc,
      [`${yr}${mth}`]: {
        txt: Object.keys(acc).length > 0 ? `${mth} ${yr}` : '',
        x: `${xAxisOffset + ((1 + +i) * xDataItrvl)}`,
      },
    };
  }, {});
  return (
    <g>
      {Object.keys(xLabels).map((mthYr) => {
        const txtPt = xLabels[mthYr];
        return (
          <text key={mthYr} x={`${txtPt.x}`} y={`${viewBoxHeight - (0.5 * yAxisOffset)}`} fontSize={fontSize}>{txtPt.txt}</text>
        );
      })}
    </g>
  );
}

XLabels.propTypes = {
  dataDatesSorted: PropTypes.arrayOf(PropTypes.string),
  xDataItrvl: PropTypes.number,
};

XLabels.defaultProps = {
  dataDatesSorted: [],
  xDataItrvl: 0,
};

export default XLabels;
