import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ohlcChartConstants from '../../constants/ohlcChart';
import Axis from './Axis';
import XLabels from './XLabels';
import YLabels from './YLabels';
import YGrid from './YGrid';
import Symbols from './Symbols';

const { viewBoxWidth, viewBoxHeight, xAxisOffset } = ohlcChartConstants;

function OhlcChart(props) {
  const { data = {} } = props;

  const dates = Object.keys(data);

  const dataDatesSorted = dates.sort((a, b) => (moment(a) - moment(b)));

  const dataCnt = dates.length;

  const dataWidth = viewBoxWidth - xAxisOffset;

  const xDataItrvl = dataWidth / (dataCnt + 1);

  const { max: dataMax, min: dataMin } = dates.reduce((acc, date, i) => {
    const { '2. high': high, '3. low': low } = data[date];
    const { max, min } = acc;
    return {
      ...acc,
      max: i > 0 ? Math.max(+high, +max) : +high,
      min: i > 0 ? Math.min(+low, +min) : +low,
    };
  }, {});

  return (
    <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} style={{ width: '100%', maxHeight: '70vh' }}>
      <Axis />
      <XLabels
        dataDatesSorted={dataDatesSorted}
        xDataItrvl={xDataItrvl}
      />
      <YLabels
        dataMin={dataMin}
        dataMax={dataMax}
      />
      <YGrid
        dataDatesSorted={dataDatesSorted}
        xDataItrvl={xDataItrvl}
      />
      <Symbols
        data={data}
        dataDatesSorted={dataDatesSorted}
        xDataItrvl={xDataItrvl}
        dataMin={dataMin}
        dataMax={dataMax}
      />
    </svg>
  );
}

OhlcChart.propTypes = {
  data: PropTypes.shape({}),
};

OhlcChart.defaultProps = {
  data: {},
};

export default OhlcChart;
