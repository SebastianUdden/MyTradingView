import React from 'react';
import socketIOClient from "socket.io-client";
import Clock from './clocks/clock';

class TradingViewPage extends React.Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    // socket.on("DarkSkyAPI", data => this.setState({ weather: data }));
    socket.on("BittrexAPI", data => this.setState({ btcltc_price: data }));
    socket.on("CryptoCompareAPI", data => this.setState({ btcusdeureth_price: data }));
    socket.on("CryptoWatchAPI", data => this.setState({ usdbtc_price: data }));
    socket.on("BitfinexAPI", data => this.setState({ usdbtc_last_price: data }));
    socket.on("NewsAPI", data => this.setState({ latestNewsArticle: data }));
  }

  render() {
    const {
      // weather,
      latestNewsArticle,
      btcltc_price,
      btcusdeureth_price,
      usdbtc_price,
      usdbtc_last_price
     } = this.state;
     let newsArticle = {
      backgroundColor: "#343434",
      padding: "10px",
      borderRadius: "10px"
    };
    return (
      <div>
        <h1>Trading View</h1>
        <section id="temp">
        <h2>API-Test</h2>
        <div style={newsArticle}>
          { latestNewsArticle
            ? <h4>
                (NewsAPI) {latestNewsArticle.title}
              </h4>
            : <h4>Loading NewsAPI title...</h4> }
          { latestNewsArticle
            ? <p>
                (NewsAPI) {latestNewsArticle.description}
              </p>
            : <p>Loading NewsAPI description...</p> }
        </div>
        { btcusdeureth_price
          ? <p>
              (CryptoCompareAPI) Ether: <br />{btcusdeureth_price.BTC} BTC<br />{btcusdeureth_price.USD} USD<br />{btcusdeureth_price.EUR} EUR
            </p>
          : <p>Loading CryptoCompareAPI...</p> }
        { btcltc_price
          ? <p>
              (BittrexAPI) LiteCoin: {btcltc_price} BTC
            </p>
          : <p>Loading BittrexAPI...</p> }
        { usdbtc_price
          ? <p>
              (CryptoWatchAPI) BitCoin: {usdbtc_price} USD
            </p>
          : <p>Loading CryptoWatchAPI...</p> }
        { usdbtc_last_price
          ? <p>
              (BitfinexAPI) BitCoin Last bid: {usdbtc_last_price} USD
            </p>
          : <p>Loading BitfinexAPI...</p> }
        </section>
        <section id="top">
          <h2>Top</h2>
          <Clock />
        </section>
        <section id="Bittrex">
          <h2>Bittrex</h2>
        </section>
        <section id="Portfolio">
          <h2>Portfolio</h2>
        </section>
        <section id="BTCvsBCH">
          <h2>BTC vs BCH</h2>
        </section>
        <section id="NewsAndSocialMedia">
          <h2>News and social media</h2>
        </section>
      </div>
    );
  }
}

export default TradingViewPage;
// { weather
//   ? <p>
//       The temperature in Stockholm is: {Math.round(weather * 100) / 100} °C
//     </p>
//   : <p>Loading weather...</p> }


 // { latestNewsArticle
        //   ? <h3>
        //       {latestNewsArticle.title}
        //     </h3>
        //     <p>
        //       {latestNewsArticle.description}
        //     </p>
        //   : <p>Loading BittrexAPI...</p> }
