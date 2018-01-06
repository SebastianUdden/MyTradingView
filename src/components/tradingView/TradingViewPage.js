import React from 'react';
import socketIOClient from "socket.io-client";
import Clock from './clocks/clock';

class TradingViewPage extends React.Component {
  constructor() {
    super();
    this.state = {
      response: false,
      // endpoint: "http://127.0.0.1:4001"
      endpoint: "https://streamer.cryptocompare.com/"
    };
  }

  componentDidMount() {
    // One time
    let FIELDS = {
        'TYPE'            : 0x0       // hex for binary 0, it is a special case of fields that are always there
      , 'MARKET'          : 0x0       // hex for binary 0, it is a special case of fields that are always there
      , 'FROMSYMBOL'      : 0x0       // hex for binary 0, it is a special case of fields that are always there
      , 'TOSYMBOL'        : 0x0       // hex for binary 0, it is a special case of fields that are always there
      , 'FLAGS'           : 0x0       // hex for binary 0, it is a special case of fields that are always there
      , 'PRICE'           : 0x1       // hex for binary 1
      , 'BID'             : 0x2       // hex for binary 10
      , 'OFFER'           : 0x4       // hex for binary 100
      , 'LASTUPDATE'      : 0x8       // hex for binary 1000
      , 'AVG'             : 0x10      // hex for binary 10000
      , 'LASTVOLUME'      : 0x20      // hex for binary 100000
      , 'LASTVOLUMETO'    : 0x40      // hex for binary 1000000
      , 'LASTTRADEID'     : 0x80      // hex for binary 10000000
      , 'VOLUMEHOUR'      : 0x100     // hex for binary 100000000
      , 'VOLUMEHOURTO'    : 0x200     // hex for binary 1000000000
      , 'VOLUME24HOUR'    : 0x400     // hex for binary 10000000000
      , 'VOLUME24HOURTO'  : 0x800     // hex for binary 100000000000
      , 'OPENHOUR'        : 0x1000    // hex for binary 1000000000000
      , 'HIGHHOUR'        : 0x2000    // hex for binary 10000000000000
      , 'LOWHOUR'         : 0x4000    // hex for binary 100000000000000
      , 'OPEN24HOUR'      : 0x8000    // hex for binary 1000000000000000
      , 'HIGH24HOUR'      : 0x10000   // hex for binary 10000000000000000
      , 'LOW24HOUR'       : 0x20000   // hex for binary 100000000000000000
      , 'LASTMARKET'      : 0x40000   // hex for binary 1000000000000000000, this is a special case and will only appear on CCCAGG messages
    };
    let bitfinexBTCUSD = ['2~Bitfinex~BTC~USD'];
    let bittrexBTCUSD = ['2~BitTrex~BTC~USD'];
    let coinbaseBTCUSD = ['2~Coinbase~BTC~USD'];
    let poloniexBTCUSD = ['2~Poloniex~BTC~USD'];
    let bitfinexChange24H = "";
    let bittrexChange24H = "";
    let coinbaseChange24H = "";
    let poloniexChange24H = "";
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    // socket.on("DarkSkyAPI", data => this.setState({ weather: data }));
    // socket.on("BittrexAPI", data => this.setState({ btcltc_price: data }));
    // socket.on("CryptoCompareAPI", data => this.setState({ btcusdeureth_price: data }));
    // socket.on("CryptoWatchAPI", data => this.setState({ usdbtc_price: data }));
    // socket.on("BitfinexAPI", data => this.setState({ usdbtc_last_price: data }));
    // socket.on("BloombergArticles", data => this.setState({ bloombergArticles: data }));
    // socket.on("BusinessInsiderArticles", data => this.setState({ businessInsiderArticles: data }));
    // socket.on("CnnArticles", data => this.setState({ cnnArticles: data }));
    // socket.on("CnbcArticles", data => this.setState({ cnbcArticles: data }));

    // socket.on("NewsAPI", data => this.setState({ latestNewsArticle: data }));


    // Direct API connection
    // socket.on('2~Coinbase~BTC~USD', data => this.setState({ weather: data }));
    socket.emit('SubAdd', { subs: bitfinexBTCUSD });
    socket.emit('SubAdd', { subs: bittrexBTCUSD });
    socket.emit('SubAdd', { subs: coinbaseBTCUSD });
    socket.emit('SubAdd', { subs: poloniexBTCUSD });
    socket.on("m", data => {
      let valuesArray = data.split("~");
      let valuesArrayLength = valuesArray.length;
      let mask = valuesArray[valuesArrayLength - 1];
      let maskInt = parseInt(mask, 16);
      let btcusd = {};
      let currentField = 0;

      for (let property in FIELDS) {
        if (FIELDS[property] === 0) {
          btcusd[property] = valuesArray[currentField];
          currentField++;
        }
        else if(maskInt&FIELDS[property]) {
        //i know this is a hack, for cccagg, future code please don't hate me:(, i did this to avoid
        //subscribing to trades as well in order to show the last market
          if (property === 'LASTMARKET') {
            btcusd[property] = valuesArray[currentField];
          } else {
            btcusd[property] = parseFloat(valuesArray[currentField]);
          }
          currentField++;
        }
      }
      console.log(btcusd);
      if (btcusd.OPEN24HOUR) {
        btcusd.CHANGE24HOURPCT = ((btcusd.PRICE - btcusd.OPEN24HOUR) / btcusd.OPEN24HOUR * 100).toFixed(2) + "%";
        if (btcusd.MARKET === 'Bitfinex') { bitfinexChange24H = btcusd.CHANGE24HOURPCT; }
        if (btcusd.MARKET === 'BitTrex') { bittrexChange24H = btcusd.CHANGE24HOURPCT; }
        if (btcusd.MARKET === 'Coinbase') { coinbaseChange24H = btcusd.CHANGE24HOURPCT; }
        if (btcusd.MARKET === 'Poloniex') { poloniexChange24H = btcusd.CHANGE24HOURPCT; }
      } else {
        if (btcusd.MARKET === 'Bitfinex') { btcusd.CHANGE24HOURPCT = bitfinexChange24H; }
        if (btcusd.MARKET === 'BitTrex') { btcusd.CHANGE24HOURPCT = bittrexChange24H;  }
        if (btcusd.MARKET === 'Coinbase') { btcusd.CHANGE24HOURPCT = coinbaseChange24H; }
        if (btcusd.MARKET === 'Poloniex') { btcusd.CHANGE24HOURPCT = poloniexChange24H; }
      }
      btcusd.VOLUME24HOURTO = ((btcusd.VOLUME24HOURTO / 1000000).toFixed(2));
      btcusd.PRICE = Math.round(btcusd.PRICE * 100) / 100
      if (btcusd.MARKET === 'Bitfinex') { this.setState({ btcusdBitfinex: btcusd }); }
      if (btcusd.MARKET === 'BitTrex') { this.setState({ btcusdBittrex: btcusd }); }
      if (btcusd.MARKET === 'Coinbase') { this.setState({ btcusdCoinbase: btcusd }); }
      if (btcusd.MARKET === 'Poloniex') { this.setState({ btcusdPoloniex: btcusd }); }
    });
  }

  render() {
    const {
      // weather,
      // latestNewsArticle,
      // btcltc_price,
      // btcusdeureth_price,
      // usdbtc_price,
      // usdbtc_last_price,
      btcusdPoloniex,
      btcusdBitfinex,
      btcusdBittrex,
      btcusdCoinbase,
      bloombergArticles,
      businessInsiderArticles,
      cnnArticles,
      cnbcArticles,
    } = this.state;
    let btcusdTitles = {
      change: "24h Change: ",
      volume: "24h Vol: "
    }
    let MarketBTCUSD = {
      backgroundColor: "#000",
      color: "#ccc",
      border: "1px white solid",
      padding: "3px"
    }
    let MarketBTCUSDTitle = {
      fontWeight: "800"
    }
    let MarketBTCUSDPrice = {
      color: "#DAA520",
      fontSize: "150%"
    }
    let newsArticle = {
      backgroundColor: "#343434",
      padding: "10px",
      borderRadius: "10px",
      marginBottom: "3px"
    };
    let newsArticleHeader = {
      color: "#5bb7db",
    };
    let newsArticleDescription = {
      color: "#bbb",
    };
    const bloombergArticlesJSX = [];
    const businessInsiderArticlesJSX = [];
    const cnnArticlesJSX = [];
    const cnbcArticlesJSX = [];
    if (bloombergArticles) {
      for (let i = 0; i < bloombergArticles.length; i++) {
          // note: we add a key prop here to allow react to uniquely identify each
          // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
          bloombergArticlesJSX.push(
            <div key={i} style={newsArticle}>
            <a href={bloombergArticles[i].url} style={newsArticleHeader} target="_blank">{bloombergArticles[i].title}</a><br />
              <span style={newsArticleDescription}>{bloombergArticles[i].description}</span>
            </div>
          );
      }
    }
    if (businessInsiderArticles) {
      for (let i = 0; i < businessInsiderArticles.length; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        businessInsiderArticlesJSX.push(
          <div key={i} style={newsArticle}>
            <a href={businessInsiderArticles[i].url} style={newsArticleHeader} target="_blank">{businessInsiderArticles[i].title}</a><br />
            <span style={newsArticleDescription}>{businessInsiderArticles[i].description}</span>
          </div>
        );
      }
    }
    if (cnnArticles) {
      for (let i = 0; i < cnnArticles.length; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        cnnArticlesJSX.push(
          <div key={i}style={newsArticle}>
          <a href={cnnArticles[i].url} style={newsArticleHeader} target="_blank">{cnnArticles[i].title}</a><br />
          <span style={newsArticleDescription}>{cnnArticles[i].description}</span>
          </div>
        );
      }
    }
    if (cnbcArticles) {
      for (let i = 0; i < cnbcArticles.length; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        cnbcArticlesJSX.push(
          <div key={i}style={newsArticle}>
          <a href={cnbcArticles[i].url} style={newsArticleHeader} target="_blank">{cnbcArticles[i].title}</a><br />
          <span style={newsArticleDescription}>{cnbcArticles[i].description}</span>
          </div>
        );
      }
    }

    return (
      <div style={{marginTop: "5px"}} className="row">
        {btcusdPoloniex ?
          <div className="col-xs-3" style={MarketBTCUSD}>
            <span style={MarketBTCUSDTitle}>Binance</span><br />
            <span style={MarketBTCUSDPrice}>${btcusdPoloniex.PRICE}</span><br />
            <span>{btcusdTitles.change}{btcusdPoloniex.CHANGE24HOURPCT}</span><br />
            <span>{btcusdTitles.volume}${btcusdPoloniex.VOLUME24HOURTO}M</span>
          </div> : ''
        }
        {btcusdBitfinex ?
          <div className="col-xs-3" style={MarketBTCUSD}>
            <span style={MarketBTCUSDTitle}>Poloniex</span><br />
            <span style={MarketBTCUSDPrice}>${btcusdBitfinex.PRICE}</span><br />
            <span>{btcusdTitles.change}{btcusdBitfinex.CHANGE24HOURPCT}</span><br />
            <span>{btcusdTitles.volume}${btcusdBitfinex.VOLUME24HOURTO}M</span>
          </div> : ''
        }
        {btcusdBittrex ?
          <div className="col-xs-3" style={MarketBTCUSD}>
            <span style={MarketBTCUSDTitle}>Bittrex</span><br />
            <span style={MarketBTCUSDPrice}>${btcusdBittrex.PRICE}</span><br />
            <span>{btcusdTitles.change} {btcusdBittrex.CHANGE24HOURPCT}</span><br />
            <span>{btcusdTitles.volume}${btcusdBittrex.VOLUME24HOURTO}M</span>
          </div> : ''
        }
        {btcusdCoinbase ?
          <div className="col-xs-3" style={MarketBTCUSD}>
            <span style={MarketBTCUSDTitle}>Coinbase</span><br />
            <span style={MarketBTCUSDPrice}>${btcusdCoinbase.PRICE}</span><br />
            <span>{btcusdTitles.change} {btcusdCoinbase.CHANGE24HOURPCT}</span><br />
            <span>{btcusdTitles.volume}${btcusdCoinbase.VOLUME24HOURTO}M</span>
          </div> : ''
        }
      </div>
    );
  }
}

export default TradingViewPage;


// <div>
// <h1>Trading View</h1>
// <section id="temp">
//   { btcusdeureth_price
//     ? <p>(CryptoCompareAPI) Ether: <br />{btcusdeureth_price.BTC} BTC<br />{btcusdeureth_price.USD} USD<br />{btcusdeureth_price.EUR} EUR</p>
//     : <p>Loading CryptoCompareAPI...</p> }
//   { btcltc_price
//     ? <p>(BittrexAPI) LiteCoin: {btcltc_price} BTC</p>
//     : <p>Loading BittrexAPI...</p> }
//   { usdbtc_price
//     ? <p>(CryptoWatchAPI) BitCoin: {usdbtc_price} USD</p>
//     : <p>Loading CryptoWatchAPI...</p> }
//   { usdbtc_last_price
//     ? <p>(BitfinexAPI) BitCoin Last bid: {usdbtc_last_price} USD</p>
//     : <p>Loading BitfinexAPI...</p> }
// </section>
// <section id="top">
//   <h2>Top</h2>
//   <Clock />
// </section>
// <section id="Bittrex">
//   <h2>Bittrex</h2>
// </section>
// <section id="Portfolio">
//   <h2>Portfolio</h2>
// </section>
// <section id="BTCvsBCH">
//   <h2>BTC vs BCH</h2>
// </section>
// <section id="NewsAndSocialMedia">
//   <h2>News and social media</h2>
//   <h3>Bloomberg</h3>
//   {bloombergArticlesJSX}
//   <h3>Business Insider</h3>
//   {businessInsiderArticlesJSX}
//   <h3>CNN</h3>
//   {cnnArticlesJSX}
//   <h3>CNBC</h3>
//   {cnbcArticlesJSX}
// </section>
// </div>
