import React from 'react';
import PropTypes from 'prop-types';
import ohlcChartConstants from '../../constants/ohlcChart';

const {
  viewBoxHeight,
  xAxisOffset,
  yAxisOffset,
  yDataOffset,
  xThck1,
  xThck2,
  yThck1,
} = ohlcChartConstants;

const ptsHeight = viewBoxHeight - yAxisOffset - (2 * +yDataOffset);

function Symbols(props) {
  const {
    data,
    dataDatesSorted,
    xDataItrvl,
    dataMax,
    dataMin,
  } = props;

  return (
    <g>
      {dataDatesSorted.map((date, i) => {
        const {
          '1. open': open,
          '2. high': high,
          '3. low': low,
          '4. close': close,
        } = data[date];
        const diff = +dataMax - +dataMin;
        const openPt = +yDataOffset + ptsHeight - ((open - dataMin) * ptsHeight / diff);
        const highPt = +yDataOffset + ptsHeight - ((high - dataMin) * ptsHeight / diff);
        const lowPt = +yDataOffset + ptsHeight - ((low - dataMin) * ptsHeight / diff);
        const closePt = +yDataOffset + ptsHeight - ((close - dataMin) * ptsHeight / diff);

        // console.log(i);
        // console.log('open', open, openPt);
        // console.log('high', high, highPt);
        // console.log('low', low, lowPt);
        // console.log('close', close, closePt);

        const xMid = xAxisOffset + ((1 + +i) * xDataItrvl);
        const x1 = xMid - xThck1 - xThck2;
        const x2 = xMid - xThck1;
        const x3 = xMid + xThck1;
        const x4 = xMid + xThck1 + xThck2;

        const yOpenTop = openPt - yThck1;
        const yOpenBtm = openPt + yThck1;
        const yCloseTop = closePt - yThck1;
        const yCloseBtm = closePt + yThck1;

        const y1 = highPt;
        const y2 = yOpenTop < highPt ? highPt : openPt - yThck1;
        const y3 = yOpenBtm > lowPt ? lowPt : openPt + yThck1;
        const y4 = yCloseTop < highPt ? highPt : closePt - yThck1;
        const y5 = yCloseBtm > lowPt ? lowPt : closePt + yThck1;
        const y6 = lowPt;

        let color = 'grey';
        if (+open < +close) {
          color = 'green';
        } else if (+open > +close) {
          color = 'maroon';
        }

        return (
          <polygon key={date} points={`${x2},${y6} ${x2},${y3} ${x1},${y3} ${x1},${y2} ${x2},${y2} ${x2},${y1} ${x3},${y1} ${x3},${y4} ${x4},${y4} ${x4},${y5} ${x3},${y5} ${x3},${y6}`} style={{ fill: `${color}` }} />
        );
      })}
    </g>
  );
}

Symbols.propTypes = {
  data: PropTypes.shape({}),
  dataDatesSorted: PropTypes.arrayOf(PropTypes.string),
  xDataItrvl: PropTypes.number,
  dataMin: PropTypes.number,
  dataMax: PropTypes.number,
};

Symbols.defaultProps = {
  data: {},
  dataDatesSorted: [],
  xDataItrvl: 0,
  dataMin: 0,
  dataMax: 0,
};

export default Symbols;
