import axios from 'axios';

export default function ({ symbol = 'AAPL' } = {}) {
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
