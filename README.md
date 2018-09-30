# OHLC Chart

## Introduction
A single page daily Open-high-low-close Chart app that displays data from https://www.alphavantage.co/. This app is also available at https://ohlc.darrelltzj.com/.

## Engines
The app was developed with the following engines.

 Node 10.11.0

 npm 6.4.1

 yarn 1.9.4

## Setup

1) Clone Git Repository.

```
git clone https://github.com/darrelltzj/ohlcChart.git
```

2) Claim Alpha Vantage API key at https://www.alphavantage.co/support/#api-key

3) Create .env file and input Alpha Vantage API key under REACT_APP_AV_ACCESS_KEY.
```
touch .env
```

```
REACT_APP_AV_ACCESS_KEY=**********
```

4) Install yarn https://yarnpkg.com/en/docs/install if necessary.

5) Install dependencies by running yarn.

```
yarn
```

6) Start the app by running yarn start. The app will start on http://localhost:3000/

```
yarn start
```
