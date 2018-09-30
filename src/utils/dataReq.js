import axios from 'axios';
import stockData from '../constants/stockData';

export function avTimeSeriesDailyApi({ symbol = 'AAPL' } = {}) {
  return axios({
    url: 'https://www.alphavantage.co/query',
    method: 'GET',
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol,
      outputsize: 'compact',
      datatype: 'json',
      apikey: process.env.REACT_APP_AV_ACCESS_KEY,
    },
  });
}

export function filterStocks(filterTxt = '') {
  return filterTxt ? Object.keys(stockData).filter(symbol => new RegExp(filterTxt, 'gi').test(symbol)) : Object.keys(stockData);
}
