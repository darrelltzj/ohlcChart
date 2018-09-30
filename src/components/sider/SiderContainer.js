import React from 'react';
import PropTypes from 'prop-types';
import { Sider } from '../../styles/Layout';
import { SiderMain, SiderCard } from '../../styles/Sider';
import Input from '../../styles/Form';

const selectionSize = 10;

function SiderMainContainer(props) {
  const {
    // stockData,
    stockSymbols,
    filterTxt,
    symbolIndex,
    symbol: selectedSymbol,
    handleFilterStocks,
    viewPage,
    handleSelect,
  } = props;

  return (
    <Sider>
      <SiderMain>
        <Input
          value={filterTxt}
          onChange={e => handleFilterStocks(e.target.value)}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#fff',
          width: '90%',
        }}
        >
          <span
            onClick={() => viewPage('prev')}
            role="presentation"
            style={{
              cursor: 'pointer',
              fontSize: 20,
            }}
          >
            {'<'}
          </span>
          <span
            onClick={() => viewPage('next')}
            role="presentation"
            style={{
              cursor: 'pointer',
              fontSize: 20,
            }}
          >
            {'>'}
          </span>
        </div>
      </SiderMain>
      {stockSymbols.slice(symbolIndex, +selectionSize + +symbolIndex).map(symbol => (
        <SiderCard
          key={symbol}
          selected={selectedSymbol === symbol}
          onClick={() => handleSelect(symbol)}
        >
          <p>{symbol}</p>
        </SiderCard>
      ))}
    </Sider>
  );
}

SiderMainContainer.propTypes = {
  stockSymbols: PropTypes.arrayOf(PropTypes.string),
  filterTxt: PropTypes.string,
  symbolIndex: PropTypes.number,
  symbol: PropTypes.string,
  handleFilterStocks: PropTypes.func,
  viewPage: PropTypes.func,
  handleSelect: PropTypes.func,
};

SiderMainContainer.defaultProps = {
  stockSymbols: [],
  filterTxt: '',
  symbolIndex: 5,
  symbol: 'AAPL',
  handleFilterStocks: () => {},
  viewPage: () => {},
  handleSelect: () => {},
};

export default SiderMainContainer;
