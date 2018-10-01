/* global window */
import React, { Component } from 'react';
import stockData from './constants/stockData';
import { avTimeSeriesDailyApi, filterStocks } from './utils/dataReq';
import OhlcChart from './components/ohlcChart/OhlcChart';
import SiderContainer from './components/sider/SiderContainer';
import {
  Loader,
  ErrContainer,
  MainRow,
  MainCol,
  Header,
  Content,
  Footer,
} from './styles/Layout';

const symbolFilterTxt = window.localStorage.getItem('filterTxt') || '';

const symbolIndexStorage = window.localStorage.getItem('symbolIndex');

const symbolStorage = window.localStorage.getItem('symbol');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbols: filterStocks(symbolFilterTxt),
      filterTxt: symbolFilterTxt || '',
      symbolIndex: symbolIndexStorage === undefined || symbolIndexStorage === null
        ? 5 : +symbolIndexStorage,
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
          err: {
            message: data['Error Message'],
            alt: 'There was an error loading the data. Data for this stock ticker may not be available.',
          },
        });
      } else if (data.Information) {
        await this.setState({
          loading: false,
          err: {
            message: data.Information,
            alt: 'High API traffic detected. Please try again later.',
          },
        });
      } else {
        await this.setState({
          loading: false,
          err: {
            message: 'There was an error loading the data. Please try again later.',
          },
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
        err: {
          ...err,
          alt: 'There was an error loading the data. Please try again later.',
        },
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
          <span>Loading...</span>
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
            {err ? (
              <ErrContainer>
                <p>
                  {err.alt ? `${err.alt} ` : ''}
                  {err.message ? `Error Message: ${err.message} ` : ''}
                </p>
              </ErrContainer>
            ) : <OhlcChart data={data} />}
          </Content>
          <Footer>
            <a href="https://www.darrelltzj.com/" target="_blank" rel="noopener noreferrer">Designed by DarrellTZJ</a>
          </Footer>
        </MainCol>
      </MainRow>
    );
  }
}

export default App;
