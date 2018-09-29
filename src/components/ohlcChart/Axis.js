import React from 'react';
import ohlcChartConstants from '../../constants/ohlcChart';

const {
  viewBoxWidth,
  viewBoxHeight,
  xAxisOffset,
  yAxisOffset,
} = ohlcChartConstants;

function Axis() {
  return (
    <g style={{ stroke: 'black', strokeWidth: 0.5 }}>
      {/* xAxis */}
      <line x1={`${xAxisOffset}`} y1={`${viewBoxHeight - yAxisOffset}`} x2={`${viewBoxWidth}`} y2={`${viewBoxHeight - yAxisOffset}`} />
      {/* yAxis */}
      <line x1={`${xAxisOffset}`} y1="0" x2={`${xAxisOffset}`} y2={`${viewBoxHeight - yAxisOffset}`} />
    </g>
  );
}

export default Axis;
