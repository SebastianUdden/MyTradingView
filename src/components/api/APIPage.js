import React from 'react';

export default class APIPage extends React.Component {
  render() {
    return (
      <div>
        <h1>API-list</h1>
        <ul>
          <li>Bittrex WebSocket API
            <ul>
              <li><a href="https://bittrex.com/home/api" target="_blank">Documentation</a></li>
              <li>GET BTC-LTC: <a href="https://bittrex.com/api/v1.1/public/getticker?market=BTC-LTC" target="_blank"><br />https://bittrex.com/api/v1.1/public/getticker?market=BTC-LTC</a></li>
            </ul>
          </li>
          <li>CryptoCompare WebSocket API
            <ul>
              <li><a href="https://medium.com/@agalea91/cryptocompare-api-quick-start-guide-ca4430a484d4" target="_blank">Documentation</a></li>
              <li>GET BTC-LTC: <a href="" target="_blank"><br /></a></li>
            </ul>
          </li>
          <li>CryptoWatch API
            <ul>
              <li><a href="https://cryptowat.ch/docs/api" target="_blank">Documentation</a></li>
              <li>GET BTC-USD: <a href="https://api.cryptowat.ch/markets/gdax/btcusd/summary" target="_blank"><br />https://api.cryptowat.ch/markets/gdax/btcusd/summary</a></li>
            </ul>
          </li>
          <li>News API
            <ul>
              <li><a href="https://newsapi.org/" target="_blank">Documentation</a></li>
              <li>Latest news from The Economist: <a href="https://newsapi.org/v2/top-headlines?sources=the-economist&apiKey=a9abbe3465e94ced9e86589daaefcbcd" target="_blank"><br />https://newsapi.org/v2/top-headlines?sources=the-economist&apiKey=a9abbe3465e94ced9e86589daaefcbcd</a></li>
            </ul>
          </li>
          <li>Twitter API
            <ul>
              <li><a href="https://developer.twitter.com/en/docs" target="_blank">Documentation</a></li>
              <li><a href="https://developer.twitter.com/en/docs/tweets/timelines/overview" target="_blank">Latest tweets by user (Requires OAuth)</a></li>
            </ul>
          </li>
          <li>Bitfinex API
            <ul>
              <li><a href="https://docs.bitfinex.com/docs" target="_blank">Documentation</a></li>
              <li>GET BTC-USD: <a href="https://api.bitfinex.com/v1/book/btcusd" target="_blank"><br />https://api.bitfinex.com/v1/book/btcusd</a></li>
            </ul>
          </li>
          <li>Binance API
            <ul>
              <li><a href="" target="_blank">Documentation</a></li>
              <li>GET BTC-LTC: <a href="" target="_blank"><br /></a></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
