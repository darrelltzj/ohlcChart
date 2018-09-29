import React from 'react';
import PropTypes from 'prop-types';
import { Sider } from '../../styles/Layout';
import { SiderMain, SiderCard } from '../../styles/Sider';
import Input from '../../styles/Form';

function SiderMainContainer(props) {
  const { stockData, symbol: selectedSymbol, handleSelect } = props;

  return (
    <Sider>
      <SiderMain>
        <Input />
      </SiderMain>
      {Object.keys(stockData).map(symbol => (
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
  stockData: PropTypes.shape({}),
  symbol: PropTypes.string,
  handleSelect: PropTypes.func,
};

SiderMainContainer.defaultProps = {
  stockData: {},
  symbol: 'AAPL',
  handleSelect: e => e,
};

export default SiderMainContainer;
