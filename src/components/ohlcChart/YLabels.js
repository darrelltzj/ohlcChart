import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ohlcChartConstants from '../../constants/ohlcChart';
import toDp from '../../utils/toDp';

const {
  viewBoxHeight,
  yAxisOffset,
  yDataOffset,
  fontSize,
} = ohlcChartConstants;

const ptsHeight = viewBoxHeight - yAxisOffset - (2 * +yDataOffset);

class YLabels extends Component {
  constructor(props) {
    super(props);
    this.yLabels = this.yLabels.bind(this);
  }

  yLabels() {
    const { dataMin: min, dataMax: max } = this.props;
    const interval = 7;
    const yDataInterval = ((+max - +min) / interval);
    const yInterval = (ptsHeight / interval);
    let output = [];
    for (let i = 0; i <= interval; i++) {
      // Start from min (check if duplicate)
      output = [...output, {
        i,
        y: +ptsHeight + +yDataOffset - (+yInterval * i),
        txt: toDp({ input: +(min + (yDataInterval * i)), dp: 2 }),
      }];
    }
    return output;
  }

  render() {
    return (
      <g>
        {this.yLabels().map((yLabel) => {
          const { i, txt = 0, y } = yLabel;
          return (
            <text key={i} x="0" y={y} fontSize={fontSize}>
              $
              {toDp({ input: txt, dp: 2 })}
            </text>
          );
        })}
      </g>
    );
  }
}

YLabels.propTypes = {
  dataMin: PropTypes.number,
  dataMax: PropTypes.number,
};

YLabels.defaultProps = {
  dataMin: 0,
  dataMax: 0,
};

export default YLabels;
