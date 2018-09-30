/* global window */
import React, { Component } from 'react';
import stockData from './constants/stockData';
import avTimeSeriesDailyApi from './utils/avTimeSeriesDailyApi';
import OhlcChart from './components/ohlcChart/OhlcChart';
import SiderContainer from './components/sider/SiderContainer';
import {
  Loader,
  MainRow,
  MainCol,
  Header,
  Content,
  Footer,
} from './styles/Layout';

const symbolFilterTxt = window.localStorage.getItem('filterTxt') || '';

const symbolIndexStorage = window.localStorage.getItem('symbolIndex');

const symbolStorage = window.localStorage.getItem('symbol');

function filterStocks(filterTxt = '') {
  return filterTxt ? Object.keys(stockData).filter(symbol => new RegExp(filterTxt, 'gi').test(symbol)) : Object.keys(stockData);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbols: filterStocks(symbolFilterTxt),
      filterTxt: symbolFilterTxt || '',
      symbolIndex: symbolIndexStorage === undefined ? 5 : +symbolIndexStorage,
      symbol: symbolStorage || 'AAPL',
      loading: false,
      data: {},
      err: null,
    };
    this.handleFilterStocks = this.handleFilterStocks.bind(this);
    this.viewPage = this.viewPage.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleApiSearch = this.handleApiSearch.bind(this);
  }

  componentDidMount() {
    const { symbol = 'AAPL' } = this.state;
    this.handleApiSearch(symbol);
  }

  async handleFilterStocks(filterTxt = '') {
    try {
      const stockSymbols = filterStocks(filterTxt);
      await this.setState({ stockSymbols, filterTxt, symbolIndex: 0 });
    } catch (err) {
      this.setState({ err });
    }
  }

  viewPage(type) {
    const { stockSymbols, symbolIndex } = this.state;
    let nextIndex = symbolIndex;
    if (type === 'prev') {
      nextIndex = symbolIndex - 10 < 0 ? 0 : symbolIndex - 10;
    } else if (type === 'next') {
      nextIndex = symbolIndex + 10 > (stockSymbols.length - 1)
        ? stockSymbols.length - 1
        : symbolIndex + 10;
    }
    this.setState({ symbolIndex: nextIndex });
  }

  async handleSelect(symbol) {
    const { filterTxt, symbolIndex, symbol: prevSymbol } = this.state;
    try {
      await this.setState({ symbol });
      await this.handleApiSearch(symbol);
      await window.localStorage.setItem('symbol', symbol);
      await window.localStorage.setItem('symbolIndex', +symbolIndex);
      await window.localStorage.setItem('filterTxt', filterTxt);
    } catch (err) {
      this.setState({ symbol: prevSymbol });
    }
  }

  async handleApiSearch(symbol) {
    try {
      await this.setState({ loading: true });

      const data = await avTimeSeriesDailyApi({ symbol }).then(res => res.data);

      if (data['Time Series (Daily)']) {
        await this.setState({
          loading: false,
          data: data['Time Series (Daily)'],
          err: null,
        });
      } else if (data['Error Message']) {
        await this.setState({
          loading: false,
          err: { message: data['Error Message'] },
        });
      } else if (data.Information) {
        await this.setState({
          loading: false,
          err: { message: data.Information },
        });
      } else {
        await this.setState({
          loading: false,
          err: { message: 'API Error' },
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
        err: { message: 'API Error' },
      });
    }
  }

  render() {
    const {
      stockSymbols,
      filterTxt,
      symbolIndex,
      symbol,
      loading,
      data = {},
      err = {},
    } = this.state;

    return (
      <MainRow>
        {loading && (
        <Loader>
          <span style={{ color: 'white' }}>Loading...</span>
        </Loader>)}
        <SiderContainer
          stockSymbols={stockSymbols}
          filterTxt={filterTxt}
          symbolIndex={symbolIndex}
          symbol={symbol}
          handleFilterStocks={this.handleFilterStocks}
          viewPage={this.viewPage}
          handleSelect={this.handleSelect}
        />
        <MainCol>
          <Header>
            <h1>{symbol}</h1>
            <span>
              {stockData[symbol].security}
            </span>
          </Header>
          <Content>
            {err ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><p>{err.message}</p></div> : <OhlcChart data={data} />}
          </Content>
          <Footer>
            <span>
              Designed by DarrellTZJ
            </span>
          </Footer>
        </MainCol>
      </MainRow>
    );
  }
}

export default App;
