import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import stockData from './constants/stockData';
import avTimeSeriesDailyApi from './utils/avTimeSeriesDailyApi';
import OhlcChart from './components/ohlcChart/OhlcChart';
import SiderContainer from './components/sider/SiderContainer';
import {
  MainRow,
  MainCol,
  Header,
  Content,
  Footer,
} from './styles/Layout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: 'AAPL',
      loading: false,
      data: {},
      // err: null,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleApiSearch = this.handleApiSearch.bind(this);
  }

  async componentDidMount() {
    try {
      const { symbol = 'AAPL' } = this.state;

      this.handleApiSearch(symbol);
    } catch (err) {
      console.log('err', err.message);
      // this.setState({ err });
    }
  }

  async handleSelect(symbol) {
    try {
      await this.handleApiSearch(symbol);
      await this.setState({ symbol });
    } catch (err) {
      console.log('err', err.message);
    }
  }

  async handleApiSearch(symbol) {
    try {
      await this.setState({ loading: true });

      const data = await avTimeSeriesDailyApi({ symbol }).then(res => res.data);

      if (data['Time Series (Daily)']) {
        await this.setState({
          data: data['Time Series (Daily)'],
          loading: false,
        });
      // } else if (data['Error Message']) {
      //   await this.setState({
      //     err: { message: data['Error Message'] },
      //   });
      // } else if (data['Information']) {
      //   await this.setState({
      //     err: { message: data['Information'] },
      //   });
      // } else {
      //   await this.setState({
      //     err: { message: 'API Error' },
      //   });
      }

      console.log('data', data);

      return data;
    } catch (err) {
      console.log('err', err.message);
    }
  }

  render() {
    const { symbol, loading, data = {} } = this.state;

    console.log('loading', loading);

    return (
      <LocaleProvider locale={enUS}>
        <MainRow>
          {loading && <div style={{ width: '100vw', height: '100vh', zIndex: 100, position: 'absolute' }}><p>Loading...</p></div>}
          <SiderContainer
            stockData={stockData}
            symbol={symbol}
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
              <OhlcChart data={data} />
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
