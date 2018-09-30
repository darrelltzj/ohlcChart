/* global window */
import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
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

const symbolIndexStorage = window.localStorage.getItem('symbolIndex');

const symbolStorage = window.localStorage.getItem('symbol');

console.log(symbolIndexStorage, symbolStorage);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbols: Object.keys(stockData), // filter
      symbolIndex: symbolIndexStorage === undefined ? 5 : +symbolIndexStorage,
      symbol: symbolStorage || 'AAPL',
      loading: false,
      data: {},
      err: null,
    };
    this.viewPage = this.viewPage.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleApiSearch = this.handleApiSearch.bind(this);
  }

  componentDidMount() {
    const { symbol = 'AAPL' } = this.state;
    this.handleApiSearch(symbol);
  }

  viewPage(type) {
    const { symbolIndex } = this.state;
    let nextIndex = symbolIndex;
    if (type === 'prev') {
      nextIndex = symbolIndex - 10 < 0 ? 0 : symbolIndex - 10;
    } else if (type === 'next') {
      nextIndex = symbolIndex + 10 > Object.keys(stockData).length - 1
        ? Object.keys(stockData).length - 1
        : symbolIndex + 10;
    }
    this.setState({ symbolIndex: nextIndex });
  }

  async handleSelect(symbol) {
    const { symbol: prevSymbol, symbolIndex } = this.state;
    try {
      await this.setState({ symbol });
      await this.handleApiSearch(symbol);
      await window.localStorage.setItem('symbol', symbol);
      await window.localStorage.setItem('symbolIndex', +symbolIndex);
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
      symbolIndex,
      symbol,
      loading,
      data = {},
      err = {},
    } = this.state;

    return (
      <LocaleProvider locale={enUS}>
        <MainRow>
          {loading && (
          <Loader>
            <span style={{ color: 'white' }}>Loading...</span>
          </Loader>)}
          <SiderContainer
            stockData={stockData}
            stockSymbols={stockSymbols}
            symbolIndex={symbolIndex}
            symbol={symbol}
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
              {err ? <div>Error</div> : <OhlcChart data={data} />}
            </Content>
            <Footer>
              <span>
                Designed by DarrellTZJ
              </span>
            </Footer>
          </MainCol>
        </MainRow>
      </LocaleProvider>
    );
  }
}

export default App;
