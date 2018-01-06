import React from 'react';
import socketIOClient from "socket.io-client";
import Clock from './clocks/clock';
// import BtcUsd from './BTCUSD';

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
    let cryptoCompare = [
      // BTCUSD
      '2~Bitfinex~BTC~USD',
      '2~BitTrex~BTC~USD',
      '5~CCCAGG~BTC~USD',
      '2~Coinbase~BTC~USD',
      '2~Poloniex~BTC~USD',

      // Test
      '7~CCCAGG~BTC~USD',

      // Assets Bittrex
      '2~BitTrex~1ST~BTC',
      '2~BitTrex~2GIVE~BTC',
      '2~BitTrex~ABY~BTC',
      '2~BitTrex~ADA~BTC',
      '2~BitTrex~ADT~BTC',
      '2~BitTrex~ADX~BTC',
      '2~BitTrex~AEON~BTC',
      '2~BitTrex~AGRS~BTC',
      '2~BitTrex~AMP~BTC',
      '2~BitTrex~ANT~BTC',
      '2~BitTrex~APX~BTC',
      '2~BitTrex~ARDR~BTC',
      '2~BitTrex~ARK~BTC',
      '2~BitTrex~AUR~BTC',
      '2~BitTrex~BAT~BTC',
      '2~BitTrex~BAY~BTC',
      '2~BitTrex~BCC~BTC',
      '2~BitTrex~BCY~BTC',
      '2~BitTrex~BITB~BTC',
      '2~BitTrex~BLITZ~BTC',
      '2~BitTrex~BLK~BTC',
      '2~BitTrex~BLOCK~BTC',
      '2~BitTrex~BNT~BTC',
      '2~BitTrex~BRK~BTC',
      '2~BitTrex~BRX~BTC',
      '2~BitTrex~BSD~BTC',
      '2~BitTrex~BTCD~BTC',
      '2~BitTrex~BTG~BTC',
      '2~BitTrex~BURST~BTC',
      '2~BitTrex~BYC~BTC',
      '2~BitTrex~CANN~BTC',
      '2~BitTrex~CFI~BTC',
      '2~BitTrex~CLAM~BTC',
      '2~BitTrex~CLOAK~BTC',
      '2~BitTrex~CLUB~BTC',
      '2~BitTrex~COVAL~BTC',
      '2~BitTrex~CPC~BTC',
      '2~BitTrex~CRB~BTC',
      '2~BitTrex~CRW~BTC',
      '2~BitTrex~CURE~BTC',
      '2~BitTrex~CVC~BTC',
      '2~BitTrex~DASH~BTC',
      '2~BitTrex~DCR~BTC',
      '2~BitTrex~DCT~BTC',
      '2~BitTrex~DGB~BTC',
      '2~BitTrex~DGD~BTC',
      '2~BitTrex~DMD~BTC',
      '2~BitTrex~DNT~BTC',
      '2~BitTrex~DOGE~BTC',
      '2~BitTrex~DOPE~BTC',
      '2~BitTrex~DTB~BTC',
      '2~BitTrex~DYN~BTC',
      '2~BitTrex~EBST~BTC',
      '2~BitTrex~EDG~BTC',
      '2~BitTrex~EFL~BTC',
      '2~BitTrex~EGC~BTC',
      '2~BitTrex~EMC~BTC',
      '2~BitTrex~EMC2~BTC',
      '2~BitTrex~ENG~BTC',
      '2~BitTrex~ENRG~BTC',
      '2~BitTrex~ERC~BTC',
      '2~BitTrex~ETC~BTC',
      '2~BitTrex~ETH~BTC',
      '2~BitTrex~EXCL~BTC',
      '2~BitTrex~EXP~BTC',
      '2~BitTrex~FAIR~BTC',
      '2~BitTrex~FCT~BTC',
      '2~BitTrex~FLDC~BTC',
      '2~BitTrex~FLO~BTC',
      '2~BitTrex~FTC~BTC',
      '2~BitTrex~FUN~BTC',
      '2~BitTrex~GAM~BTC',
      '2~BitTrex~GAME~BTC',
      '2~BitTrex~GBG~BTC',
      '2~BitTrex~GBYTE~BTC',
      '2~BitTrex~GCR~BTC',
      '2~BitTrex~GEO~BTC',
      '2~BitTrex~GLD~BTC',
      '2~BitTrex~GNO~BTC',
      '2~BitTrex~GNT~BTC',
      '2~BitTrex~GOLOS~BTC',
      '2~BitTrex~GRC~BTC',
      '2~BitTrex~GRS~BTC',
      '2~BitTrex~GUP~BTC',
      '2~BitTrex~HMQ~BTC',
      '2~BitTrex~INCNT~BTC',
      '2~BitTrex~INFX~BTC',
      '2~BitTrex~IOC~BTC',
      '2~BitTrex~ION~BTC',
      '2~BitTrex~IOP~BTC',
      '2~BitTrex~KMD~BTC',
      '2~BitTrex~KORE~BTC',
      '2~BitTrex~LBC~BTC',
      '2~BitTrex~LGD~BTC',
      '2~BitTrex~LMC~BTC',
      '2~BitTrex~LSK~BTC',
      '2~BitTrex~LTC~BTC',
      '2~BitTrex~LUN~BTC',
      '2~BitTrex~MAID~BTC',
      '2~BitTrex~MANA~BTC',
      '2~BitTrex~MCO~BTC',
      '2~BitTrex~MEME~BTC',
      '2~BitTrex~MER~BTC',
      '2~BitTrex~MLN~BTC',
      '2~BitTrex~MONA~BTC',
      '2~BitTrex~MTL~BTC',
      '2~BitTrex~MUE~BTC',
      '2~BitTrex~MUSIC~BTC',
      '2~BitTrex~MYST~BTC',
      '2~BitTrex~NAV~BTC',
      '2~BitTrex~NBT~BTC',
      '2~BitTrex~NEO~BTC',
      '2~BitTrex~NEOS~BTC',
      '2~BitTrex~NLG~BTC',
      '2~BitTrex~NMR~BTC',
      '2~BitTrex~NXC~BTC',
      '2~BitTrex~NXS~BTC',
      '2~BitTrex~NXT~BTC',
      '2~BitTrex~OK~BTC',
      '2~BitTrex~OMG~BTC',
      '2~BitTrex~OMNI~BTC',
      '2~BitTrex~PART~BTC',
      '2~BitTrex~PAY~BTC',
      '2~BitTrex~PDC~BTC',
      '2~BitTrex~PINK~BTC',
      '2~BitTrex~PIVX~BTC',
      '2~BitTrex~PKB~BTC',
      '2~BitTrex~POT~BTC',
      '2~BitTrex~POWR~BTC',
      '2~BitTrex~PPC~BTC',
      '2~BitTrex~PTC~BTC',
      '2~BitTrex~PTOY~BTC',
      '2~BitTrex~QRL~BTC',
      '2~BitTrex~QTUM~BTC',
      '2~BitTrex~QWARK~BTC',
      '2~BitTrex~RADS~BTC',
      '2~BitTrex~RBY~BTC',
      '2~BitTrex~RCN~BTC',
      '2~BitTrex~RDD~BTC',
      '2~BitTrex~REP~BTC',
      '2~BitTrex~RISE~BTC',
      '2~BitTrex~RLC~BTC',
      '2~BitTrex~SALT~BTC',
      '2~BitTrex~SBD~BTC',
      '2~BitTrex~SC~BTC',
      '2~BitTrex~SEQ~BTC',
      '2~BitTrex~SHIFT~BTC',
      '2~BitTrex~SIB~BTC',
      '2~BitTrex~SLR~BTC',
      '2~BitTrex~SLS~BTC',
      '2~BitTrex~SNRG~BTC',
      '2~BitTrex~SNT~BTC',
      '2~BitTrex~SPHR~BTC',
      '2~BitTrex~SPR~BTC',
      '2~BitTrex~START~BTC',
      '2~BitTrex~STEEM~BTC',
      '2~BitTrex~STORJ~BTC',
      '2~BitTrex~STRAT~BTC',
      '2~BitTrex~SWIFT~BTC',
      '2~BitTrex~SWT~BTC',
      '2~BitTrex~SYNX~BTC',
      '2~BitTrex~SYS~BTC',
      '2~BitTrex~THC~BTC',
      '2~BitTrex~TIX~BTC',
      '2~BitTrex~TKS~BTC',
      '2~BitTrex~TRIG~BTC',
      '2~BitTrex~TRST~BTC',
      '2~BitTrex~TRUST~BTC',
      '2~BitTrex~TX~BTC',
      '2~BitTrex~UBQ~BTC',
      '2~BitTrex~UKG~BTC',
      '2~BitTrex~UNB~BTC',
      '2~BitTrex~VIA~BTC',
      '2~BitTrex~VIB~BTC',
      '2~BitTrex~VOX~BTC',
      '2~BitTrex~VRC~BTC',
      '2~BitTrex~VRM~BTC',
      '2~BitTrex~VTC~BTC',
      '2~BitTrex~VTR~BTC',
      '2~BitTrex~WAVES~BTC',
      '2~BitTrex~WINGS~BTC',
      '2~BitTrex~XCP~BTC',
      '2~BitTrex~XDN~BTC',
      '2~BitTrex~XEL~BTC',
      '2~BitTrex~XEM~BTC',
      '2~BitTrex~XLM~BTC',
      '2~BitTrex~XMG~BTC',
      '2~BitTrex~XMR~BTC',
      '2~BitTrex~XMY~BTC',
      '2~BitTrex~XRP~BTC',
      '2~BitTrex~XST~BTC',
      '2~BitTrex~XVC~BTC',
      '2~BitTrex~XVG~BTC',
      '2~BitTrex~XWC~BTC',
      '2~BitTrex~XZC~BTC',
      '2~BitTrex~ZCL~BTC',
      '2~BitTrex~ZEC~BTC',
      '2~BitTrex~ZEN~BTC',
    ];

    // 1 hour change
    let cccaggChange1H = "";

    // 24 hour change
    let cccaggChange24H = "";
    let bitfinexChange24H = "";
    let bittrexChange24H = "";
    let coinbaseChange24H = "";
    let poloniexChange24H = "";

    // Last price
    let bitfinexLastPrice = "";
    let bittrexLastPrice = "";
    let cccaggLastPrice = "";
    let coinbaseLastPrice = "";
    let poloniexLastPrice = "";

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

    // Direct API Socket-connection
    socket.emit('SubAdd', { subs: cryptoCompare });
    socket.on("m", data => {
      let valuesArray = data.split("~");
      let valuesArrayLength = valuesArray.length;
      let mask = valuesArray[valuesArrayLength - 1];
      let maskInt = parseInt(mask, 16);
      let ccy = {};
      let currentField = 0;

      for (let property in FIELDS) {
        if (FIELDS[property] === 0) {
          ccy[property] = valuesArray[currentField];
          currentField++;
        }
        else if(maskInt&FIELDS[property]) {
        //i know this is a hack, for cccagg, future code please don't hate me:(, i did this to avoid
        //subscribing to trades as well in order to show the last market
          if (property === 'LASTMARKET') {
            ccy[property] = valuesArray[currentField];
          } else {
            ccy[property] = parseFloat(valuesArray[currentField]);
          }
          currentField++;
        }
      }
      if (ccy.OPENHOUR) {
        ccy.CHANGE1HOURPCT = ((ccy.PRICE - ccy.OPENHOUR) / ccy.OPENHOUR * 100).toFixed(2) + "%";
        if (ccy.MARKET === 'CCCAGG') { cccaggChange1H = ccy.CHANGE1HOURPCT; }
      } else {
        if (ccy.MARKET === 'CCCAGG') { ccy.CHANGE1HOURPCT = cccaggChange1H; }
      }
      if (ccy.OPEN24HOUR) {
        ccy.CHANGE24HOURPCT = ((ccy.PRICE - ccy.OPEN24HOUR) / ccy.OPEN24HOUR * 100).toFixed(2) + "%";
        if (ccy.MARKET === 'Bitfinex') { bitfinexChange24H = ccy.CHANGE24HOURPCT; }
        if (ccy.MARKET === 'BitTrex' && ccy.FROMSYMBOL === 'BTC') { bittrexChange24H = ccy.CHANGE24HOURPCT; }
        if (ccy.MARKET === 'CCCAGG') { cccaggChange24H = ccy.CHANGE24HOURPCT; }
        if (ccy.MARKET === 'Coinbase') { coinbaseChange24H = ccy.CHANGE24HOURPCT; }
        if (ccy.MARKET === 'Poloniex') { poloniexChange24H = ccy.CHANGE24HOURPCT; }
      } else {
        if (ccy.MARKET === 'Bitfinex') { ccy.CHANGE24HOURPCT = bitfinexChange24H; }
        if (ccy.MARKET === 'BitTrex' && ccy.FROMSYMBOL === 'BTC') { ccy.CHANGE24HOURPCT = bittrexChange24H; }
        if (ccy.MARKET === 'CCCAGG') { ccy.CHANGE24HOURPCT = cccaggChange24H; }
        if (ccy.MARKET === 'Coinbase') { ccy.CHANGE24HOURPCT = coinbaseChange24H; }
        if (ccy.MARKET === 'Poloniex') { ccy.CHANGE24HOURPCT = poloniexChange24H; }
      }
      if (ccy.FROMSYMBOL === 'BTC') { ccy.VOLUME24HOURTO = ((ccy.VOLUME24HOURTO / 1000000).toFixed(2)); }
      if (ccy.PRICE) {
        if (ccy.MARKET === 'Bitfinex') { ccy.PRICE > bitfinexLastPrice ? ccy.UP = true : ccy.UP = false; bitfinexLastPrice = ccy.PRICE; }
        if (ccy.MARKET === 'BitTrex' && ccy.FROMSYMBOL === 'BTC') { ccy.PRICE > bittrexLastPrice ? ccy.UP = true : ccy.UP = false; bittrexLastPrice = ccy.PRICE; }
        if (ccy.MARKET === 'CCCAGG') { ccy.PRICE > cccaggLastPrice ? ccy.UP = true : ccy.UP = false; cccaggLastPrice = ccy.PRICE; }
        if (ccy.MARKET === 'Coinbase') { ccy.PRICE > coinbaseLastPrice ? ccy.UP = true : ccy.UP = false; coinbaseLastPrice = ccy.PRICE; }
        if (ccy.MARKET === 'Poloniex') { ccy.PRICE > poloniexLastPrice ? ccy.UP = true : ccy.UP = false; poloniexLastPrice = ccy.PRICE; }
      } else {
        if (ccy.MARKET === 'Bitfinex') { ccy.PRICE = bitfinexLastPrice; }
        if (ccy.MARKET === 'BitTrex' && ccy.FROMSYMBOL === 'BTC') { ccy.PRICE = bittrexLastPrice; }
        if (ccy.MARKET === 'CCCAGG') { ccy.PRICE = cccaggLastPrice; }
        if (ccy.MARKET === 'Coinbase') { ccy.PRICE = coinbaseLastPrice; }
        if (ccy.MARKET === 'Poloniex') { ccy.PRICE = poloniexLastPrice; }
      }
      if (ccy.MARKET === 'Bitfinex') { this.setState({ btcusdBitfinex: ccy }); }
      if (ccy.MARKET === 'BitTrex' && ccy.FROMSYMBOL === 'BTC') { this.setState({ btcusdBittrex: ccy }); }
      // if (ccy.MARKET === 'BitTrex' && ccy.FROMSYMBOL === 'ETH') { this.setState({ ethBittrex: ccy }); }
      if (ccy.MARKET === 'BitTrex' && ccy.FROMSYMBOL !== 'BTC') {
        let ccySymbol = ccy.FROMSYMBOL + 'Bittrex';
        this.setState({ [ccySymbol]: ccy }); }
      if (ccy.MARKET === 'CCCAGG') { this.setState({ btcusdCCCAGG: ccy }); }
      if (ccy.MARKET === 'Coinbase') { this.setState({ btcusdCoinbase: ccy }); }
      if (ccy.MARKET === 'Poloniex') { this.setState({ btcusdPoloniex: ccy }); }
      console.log(ccy);
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

      // BTCUSD
      btcusdPoloniex,
      btcusdBitfinex,
      btcusdBittrex,
      btcusdCCCAGG,
      btcusdCoinbase,

      // Bittrex Assets
      // ethBittrex,

      bloombergArticles,
      businessInsiderArticles,
      cnnArticles,
      cnbcArticles,
    } = this.state;
    let btcusdTitles = {
      change: "24h Change: ",
      change1h: "1h Change: ",
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
    let MarketBTCUSDPriceUp = {
      color: "#32CD32",
      fontSize: "150%"
    }
    let MarketBTCUSDPriceDown = {
      color: "#DC143C",
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
      <div>
        <div style={{marginTop: "15px", marginBottom: "0px"}} className="row">
          <Clock />
        </div>
        <div style={{marginTop: "0px"}} className="row">
          {btcusdCCCAGG ?
            <div className="col-xs-2" style={MarketBTCUSD}>
              <span style={MarketBTCUSDTitle}>Market Average</span><br />
        <span style={btcusdCCCAGG.UP ? MarketBTCUSDPriceUp : MarketBTCUSDPriceDown}>${Math.round(btcusdCCCAGG.PRICE * 100) / 100}</span><br />
              <span>{btcusdTitles.change}{btcusdCCCAGG.CHANGE24HOURPCT}</span><br />
              <span>{btcusdTitles.volume}${btcusdCCCAGG.VOLUME24HOURTO}M</span><br />
              <span>{btcusdTitles.change1h}{btcusdCCCAGG.CHANGE1HOURPCT}%</span>
            </div> : ''
          }
          {btcusdBitfinex ?
            <div className="col-xs-2" style={MarketBTCUSD}>
              <span style={MarketBTCUSDTitle}>Bitfinex</span><br />
              <span style={btcusdBitfinex.UP ? MarketBTCUSDPriceUp : MarketBTCUSDPriceDown}>${Math.round(btcusdBitfinex.PRICE * 100) / 100}</span><br />
              <span>{btcusdTitles.change}{btcusdBitfinex.CHANGE24HOURPCT}</span><br />
              <span>{btcusdTitles.volume}${btcusdBitfinex.VOLUME24HOURTO}M</span><br />
              <span>-</span>
            </div> : ''
          }
          {btcusdBittrex ?
            <div className="col-xs-2" style={MarketBTCUSD}>
              <span style={MarketBTCUSDTitle}>Bittrex</span><br />
              <span style={btcusdBittrex.UP ? MarketBTCUSDPriceUp : MarketBTCUSDPriceDown}>${Math.round(btcusdBittrex.PRICE * 100) / 100}</span><br />
              <span>{btcusdTitles.change} {btcusdBittrex.CHANGE24HOURPCT}</span><br />
              <span>{btcusdTitles.volume}${btcusdBittrex.VOLUME24HOURTO}M</span><br />
              <span>-</span>
            </div> : ''
          }
          {btcusdCoinbase ?
            <div className="col-xs-2" style={MarketBTCUSD}>
              <span style={MarketBTCUSDTitle}>Coinbase</span><br />
              <span style={btcusdCoinbase.UP ? MarketBTCUSDPriceUp : MarketBTCUSDPriceDown}>${Math.round(btcusdCoinbase.PRICE * 100) / 100}</span><br />
              <span>{btcusdTitles.change} {btcusdCoinbase.CHANGE24HOURPCT}</span><br />
              <span>{btcusdTitles.volume}${btcusdCoinbase.VOLUME24HOURTO}M</span><br />
              <span>-</span>
            </div> : ''
          }
          {btcusdPoloniex ?
            <div className="col-xs-2" style={MarketBTCUSD}>
              <span style={MarketBTCUSDTitle}>Poloniex</span><br />
              <span style={btcusdPoloniex.UP ? MarketBTCUSDPriceUp : MarketBTCUSDPriceDown}>${Math.round(btcusdPoloniex.PRICE * 100) / 100}</span><br />
              <span>{btcusdTitles.change}{btcusdPoloniex.CHANGE24HOURPCT}</span><br />
              <span>{btcusdTitles.volume}${btcusdPoloniex.VOLUME24HOURTO}M</span><br />
              <span>-</span>
            </div> : ''
          }
        </div>
        <div style={{marginTop: "15px", marginBottom: "0px"}} className="row">
          <div>
            <table style={{textAlign: "left"}} className="col-xs-6">
              <thead>
                <th>Symbol</th>
                <th>Volume</th>
                <th>Change</th>
                <th>Price</th>
              </thead>
              <tbody>
              {this.state['1STBittrex'] ? <tr>
              <td>{this.state['1STBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['1STBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['1STBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['1STBittrex'].PRICE}</td></tr> : ''}
              {this.state['2GIVEBittrex'] ? <tr>
              <td>{this.state['2GIVEBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['2GIVEBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['2GIVEBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['2GIVEBittrex'].PRICE}</td></tr> : ''}
              {this.state['ABYBittrex'] ? <tr>
              <td>{this.state['ABYBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ABYBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ABYBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ABYBittrex'].PRICE}</td></tr> : ''}
              {this.state['ADABittrex'] ? <tr>
              <td>{this.state['ADABittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ADABittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ADABittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ADABittrex'].PRICE}</td></tr> : ''}
              {this.state['ADTBittrex'] ? <tr>
              <td>{this.state['ADTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ADTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ADTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ADTBittrex'].PRICE}</td></tr> : ''}
              {this.state['ADXBittrex'] ? <tr>
              <td>{this.state['ADXBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ADXBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ADXBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ADXBittrex'].PRICE}</td></tr> : ''}
              {this.state['AEONBittrex'] ? <tr>
              <td>{this.state['AEONBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['AEONBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['AEONBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['AEONBittrex'].PRICE}</td></tr> : ''}
              {this.state['AGRSBittrex'] ? <tr>
              <td>{this.state['AGRSBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['AGRSBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['AGRSBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['AGRSBittrex'].PRICE}</td></tr> : ''}
              {this.state['AMPBittrex'] ? <tr>
              <td>{this.state['AMPBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['AMPBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['AMPBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['AMPBittrex'].PRICE}</td></tr> : ''}
              {this.state['ANTBittrex'] ? <tr>
              <td>{this.state['ANTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ANTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ANTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ANTBittrex'].PRICE}</td></tr> : ''}
              {this.state['APXBittrex'] ? <tr>
              <td>{this.state['APXBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['APXBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['APXBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['APXBittrex'].PRICE}</td></tr> : ''}
              {this.state['ARDRBittrex'] ? <tr>
              <td>{this.state['ARDRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ARDRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ARDRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ARDRBittrex'].PRICE}</td></tr> : ''}
              {this.state['ARKBittrex'] ? <tr>
              <td>{this.state['ARKBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ARKBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ARKBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ARKBittrex'].PRICE}</td></tr> : ''}
              {this.state['AURBittrex'] ? <tr>
              <td>{this.state['AURBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['AURBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['AURBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['AURBittrex'].PRICE}</td></tr> : ''}
              {this.state['BATBittrex'] ? <tr>
              <td>{this.state['BATBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BATBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BATBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BATBittrex'].PRICE}</td></tr> : ''}
              {this.state['BAYBittrex'] ? <tr>
              <td>{this.state['BAYBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BAYBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BAYBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BAYBittrex'].PRICE}</td></tr> : ''}
              {this.state['BCCBittrex'] ? <tr>
              <td>{this.state['BCCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BCCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BCCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BCCBittrex'].PRICE}</td></tr> : ''}
              {this.state['BCYBittrex'] ? <tr>
              <td>{this.state['BCYBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BCYBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BCYBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BCYBittrex'].PRICE}</td></tr> : ''}
              {this.state['BITBBittrex'] ? <tr>
              <td>{this.state['BITBBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BITBBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BITBBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BITBBittrex'].PRICE}</td></tr> : ''}
              {this.state['BLITZBittrex'] ? <tr>
              <td>{this.state['BLITZBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BLITZBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BLITZBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BLITZBittrex'].PRICE}</td></tr> : ''}
              {this.state['BLKBittrex'] ? <tr>
              <td>{this.state['BLKBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BLKBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BLKBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BLKBittrex'].PRICE}</td></tr> : ''}
              {this.state['BLOCKBittrex'] ? <tr>
              <td>{this.state['BLOCKBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BLOCKBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BLOCKBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BLOCKBittrex'].PRICE}</td></tr> : ''}
              {this.state['BNTBittrex'] ? <tr>
              <td>{this.state['BNTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BNTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BNTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BNTBittrex'].PRICE}</td></tr> : ''}
              {this.state['BRKBittrex'] ? <tr>
              <td>{this.state['BRKBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BRKBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BRKBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BRKBittrex'].PRICE}</td></tr> : ''}
              {this.state['BRXBittrex'] ? <tr>
              <td>{this.state['BRXBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BRXBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BRXBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BRXBittrex'].PRICE}</td></tr> : ''}
              {this.state['BSDBittrex'] ? <tr>
              <td>{this.state['BSDBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BSDBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BSDBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BSDBittrex'].PRICE}</td></tr> : ''}
              {this.state['BTCDBittrex'] ? <tr>
              <td>{this.state['BTCDBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BTCDBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BTCDBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BTCDBittrex'].PRICE}</td></tr> : ''}
              {this.state['BTGBittrex'] ? <tr>
              <td>{this.state['BTGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BTGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BTGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BTGBittrex'].PRICE}</td></tr> : ''}
              {this.state['BURSTBittrex'] ? <tr>
              <td>{this.state['BURSTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BURSTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BURSTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BURSTBittrex'].PRICE}</td></tr> : ''}
              {this.state['BYCBittrex'] ? <tr>
              <td>{this.state['BYCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['BYCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['BYCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['BYCBittrex'].PRICE}</td></tr> : ''}
              {this.state['CANNBittrex'] ? <tr>
              <td>{this.state['CANNBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['CANNBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['CANNBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['CANNBittrex'].PRICE}</td></tr> : ''}
              {this.state['CFIBittrex'] ? <tr>
              <td>{this.state['CFIBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['CFIBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['CFIBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['CFIBittrex'].PRICE}</td></tr> : ''}
              {this.state['CLAMBittrex'] ? <tr>
              <td>{this.state['CLAMBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['CLAMBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['CLAMBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['CLAMBittrex'].PRICE}</td></tr> : ''}
              {this.state['CLOAKBittrex'] ? <tr>
              <td>{this.state['CLOAKBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['CLOAKBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['CLOAKBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['CLOAKBittrex'].PRICE}</td></tr> : ''}
              {this.state['CLUBBittrex'] ? <tr>
              <td>{this.state['CLUBBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['CLUBBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['CLUBBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['CLUBBittrex'].PRICE}</td></tr> : ''}
              {this.state['COVALBittrex'] ? <tr>
              <td>{this.state['COVALBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['COVALBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['COVALBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['COVALBittrex'].PRICE}</td></tr> : ''}
              {this.state['CPCBittrex'] ? <tr>
              <td>{this.state['CPCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['CPCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['CPCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['CPCBittrex'].PRICE}</td></tr> : ''}
              {this.state['CRBBittrex'] ? <tr>
              <td>{this.state['CRBBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['CRBBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['CRBBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['CRBBittrex'].PRICE}</td></tr> : ''}
              {this.state['CRWBittrex'] ? <tr>
              <td>{this.state['CRWBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['CRWBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['CRWBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['CRWBittrex'].PRICE}</td></tr> : ''}
              {this.state['CUREBittrex'] ? <tr>
              <td>{this.state['CUREBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['CUREBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['CUREBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['CUREBittrex'].PRICE}</td></tr> : ''}
              {this.state['CVCBittrex'] ? <tr>
              <td>{this.state['CVCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['CVCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['CVCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['CVCBittrex'].PRICE}</td></tr> : ''}
              {this.state['DASHBittrex'] ? <tr>
              <td>{this.state['DASHBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DASHBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DASHBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DASHBittrex'].PRICE}</td></tr> : ''}
              {this.state['DCRBittrex'] ? <tr>
              <td>{this.state['DCRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DCRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DCRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DCRBittrex'].PRICE}</td></tr> : ''}
              {this.state['DCTBittrex'] ? <tr>
              <td>{this.state['DCTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DCTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DCTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DCTBittrex'].PRICE}</td></tr> : ''}
              {this.state['DGBBittrex'] ? <tr>
              <td>{this.state['DGBBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DGBBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DGBBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DGBBittrex'].PRICE}</td></tr> : ''}
              {this.state['DGDBittrex'] ? <tr>
              <td>{this.state['DGDBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DGDBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DGDBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DGDBittrex'].PRICE}</td></tr> : ''}
              {this.state['DMDBittrex'] ? <tr>
              <td>{this.state['DMDBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DMDBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DMDBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DMDBittrex'].PRICE}</td></tr> : ''}
              {this.state['DNTBittrex'] ? <tr>
              <td>{this.state['DNTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DNTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DNTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DNTBittrex'].PRICE}</td></tr> : ''}
              {this.state['DOGEBittrex'] ? <tr>
              <td>{this.state['DOGEBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DOGEBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DOGEBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DOGEBittrex'].PRICE}</td></tr> : ''}
              {this.state['DOPEBittrex'] ? <tr>
              <td>{this.state['DOPEBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DOPEBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DOPEBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DOPEBittrex'].PRICE}</td></tr> : ''}
              {this.state['DTBBittrex'] ? <tr>
              <td>{this.state['DTBBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DTBBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DTBBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DTBBittrex'].PRICE}</td></tr> : ''}
              {this.state['DYNBittrex'] ? <tr>
              <td>{this.state['DYNBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['DYNBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['DYNBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['DYNBittrex'].PRICE}</td></tr> : ''}
              {this.state['EBSTBittrex'] ? <tr>
              <td>{this.state['EBSTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['EBSTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['EBSTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['EBSTBittrex'].PRICE}</td></tr> : ''}
              {this.state['EDGBittrex'] ? <tr>
              <td>{this.state['EDGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['EDGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['EDGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['EDGBittrex'].PRICE}</td></tr> : ''}
              {this.state['EFLBittrex'] ? <tr>
              <td>{this.state['EFLBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['EFLBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['EFLBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['EFLBittrex'].PRICE}</td></tr> : ''}
              {this.state['EGCBittrex'] ? <tr>
              <td>{this.state['EGCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['EGCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['EGCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['EGCBittrex'].PRICE}</td></tr> : ''}
              {this.state['EMCBittrex'] ? <tr>
              <td>{this.state['EMCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['EMCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['EMCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['EMCBittrex'].PRICE}</td></tr> : ''}
              {this.state['EMC2Bittrex'] ? <tr>
              <td>{this.state['EMC2Bittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['EMC2Bittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['EMC2Bittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['EMC2Bittrex'].PRICE}</td></tr> : ''}
              {this.state['ENGBittrex'] ? <tr>
              <td>{this.state['ENGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ENGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ENGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ENGBittrex'].PRICE}</td></tr> : ''}
              {this.state['ENRGBittrex'] ? <tr>
              <td>{this.state['ENRGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ENRGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ENRGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ENRGBittrex'].PRICE}</td></tr> : ''}
              {this.state['ERCBittrex'] ? <tr>
              <td>{this.state['ERCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ERCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ERCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ERCBittrex'].PRICE}</td></tr> : ''}
              {this.state['ETCBittrex'] ? <tr>
              <td>{this.state['ETCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ETCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ETCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ETCBittrex'].PRICE}</td></tr> : ''}
              {this.state['ETHBittrex'] ? <tr>
              <td>{this.state['ETHBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ETHBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ETHBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ETHBittrex'].PRICE}</td></tr> : ''}
              {this.state['EXCLBittrex'] ? <tr>
              <td>{this.state['EXCLBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['EXCLBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['EXCLBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['EXCLBittrex'].PRICE}</td></tr> : ''}
              {this.state['EXPBittrex'] ? <tr>
              <td>{this.state['EXPBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['EXPBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['EXPBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['EXPBittrex'].PRICE}</td></tr> : ''}
              {this.state['FAIRBittrex'] ? <tr>
              <td>{this.state['FAIRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['FAIRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['FAIRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['FAIRBittrex'].PRICE}</td></tr> : ''}
              {this.state['FCTBittrex'] ? <tr>
              <td>{this.state['FCTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['FCTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['FCTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['FCTBittrex'].PRICE}</td></tr> : ''}
              {this.state['FLDCBittrex'] ? <tr>
              <td>{this.state['FLDCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['FLDCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['FLDCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['FLDCBittrex'].PRICE}</td></tr> : ''}
              {this.state['FLOBittrex'] ? <tr>
              <td>{this.state['FLOBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['FLOBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['FLOBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['FLOBittrex'].PRICE}</td></tr> : ''}
              {this.state['FTCBittrex'] ? <tr>
              <td>{this.state['FTCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['FTCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['FTCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['FTCBittrex'].PRICE}</td></tr> : ''}
              {this.state['FUNBittrex'] ? <tr>
              <td>{this.state['FUNBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['FUNBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['FUNBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['FUNBittrex'].PRICE}</td></tr> : ''}
              {this.state['GAMBittrex'] ? <tr>
              <td>{this.state['GAMBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GAMBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GAMBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GAMBittrex'].PRICE}</td></tr> : ''}
              {this.state['GAMEBittrex'] ? <tr>
              <td>{this.state['GAMEBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GAMEBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GAMEBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GAMEBittrex'].PRICE}</td></tr> : ''}
              {this.state['GBGBittrex'] ? <tr>
              <td>{this.state['GBGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GBGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GBGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GBGBittrex'].PRICE}</td></tr> : ''}
              {this.state['GBYTEBittrex'] ? <tr>
              <td>{this.state['GBYTEBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GBYTEBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GBYTEBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GBYTEBittrex'].PRICE}</td></tr> : ''}
              {this.state['GCRBittrex'] ? <tr>
              <td>{this.state['GCRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GCRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GCRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GCRBittrex'].PRICE}</td></tr> : ''}
              {this.state['GEOBittrex'] ? <tr>
              <td>{this.state['GEOBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GEOBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GEOBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GEOBittrex'].PRICE}</td></tr> : ''}
              {this.state['GLDBittrex'] ? <tr>
              <td>{this.state['GLDBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GLDBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GLDBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GLDBittrex'].PRICE}</td></tr> : ''}
              {this.state['GNOBittrex'] ? <tr>
              <td>{this.state['GNOBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GNOBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GNOBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GNOBittrex'].PRICE}</td></tr> : ''}
              {this.state['GNTBittrex'] ? <tr>
              <td>{this.state['GNTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GNTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GNTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GNTBittrex'].PRICE}</td></tr> : ''}
              {this.state['GOLOSBittrex'] ? <tr>
              <td>{this.state['GOLOSBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GOLOSBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GOLOSBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GOLOSBittrex'].PRICE}</td></tr> : ''}
              {this.state['GRCBittrex'] ? <tr>
              <td>{this.state['GRCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GRCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GRCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GRCBittrex'].PRICE}</td></tr> : ''}
              {this.state['GRSBittrex'] ? <tr>
              <td>{this.state['GRSBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GRSBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GRSBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GRSBittrex'].PRICE}</td></tr> : ''}
              {this.state['GUPBittrex'] ? <tr>
              <td>{this.state['GUPBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['GUPBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['GUPBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['GUPBittrex'].PRICE}</td></tr> : ''}
              {this.state['HMQBittrex'] ? <tr>
              <td>{this.state['HMQBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['HMQBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['HMQBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['HMQBittrex'].PRICE}</td></tr> : ''}
              {this.state['INCNTBittrex'] ? <tr>
              <td>{this.state['INCNTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['INCNTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['INCNTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['INCNTBittrex'].PRICE}</td></tr> : ''}
              {this.state['INFXBittrex'] ? <tr>
              <td>{this.state['INFXBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['INFXBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['INFXBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['INFXBittrex'].PRICE}</td></tr> : ''}
              {this.state['IOCBittrex'] ? <tr>
              <td>{this.state['IOCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['IOCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['IOCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['IOCBittrex'].PRICE}</td></tr> : ''}
              {this.state['IONBittrex'] ? <tr>
              <td>{this.state['IONBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['IONBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['IONBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['IONBittrex'].PRICE}</td></tr> : ''}
              {this.state['IOPBittrex'] ? <tr>
              <td>{this.state['IOPBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['IOPBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['IOPBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['IOPBittrex'].PRICE}</td></tr> : ''}
              {this.state['KMDBittrex'] ? <tr>
              <td>{this.state['KMDBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['KMDBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['KMDBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['KMDBittrex'].PRICE}</td></tr> : ''}
              {this.state['KOREBittrex'] ? <tr>
              <td>{this.state['KOREBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['KOREBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['KOREBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['KOREBittrex'].PRICE}</td></tr> : ''}
              {this.state['LBCBittrex'] ? <tr>
              <td>{this.state['LBCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['LBCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['LBCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['LBCBittrex'].PRICE}</td></tr> : ''}
              {this.state['LGDBittrex'] ? <tr>
              <td>{this.state['LGDBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['LGDBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['LGDBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['LGDBittrex'].PRICE}</td></tr> : ''}
              {this.state['LMCBittrex'] ? <tr>
              <td>{this.state['LMCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['LMCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['LMCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['LMCBittrex'].PRICE}</td></tr> : ''}
              {this.state['LSKBittrex'] ? <tr>
              <td>{this.state['LSKBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['LSKBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['LSKBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['LSKBittrex'].PRICE}</td></tr> : ''}
              {this.state['LTCBittrex'] ? <tr>
              <td>{this.state['LTCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['LTCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['LTCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['LTCBittrex'].PRICE}</td></tr> : ''}
              {this.state['LUNBittrex'] ? <tr>
              <td>{this.state['LUNBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['LUNBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['LUNBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['LUNBittrex'].PRICE}</td></tr> : ''}
              {this.state['MAIDBittrex'] ? <tr>
              <td>{this.state['MAIDBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MAIDBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MAIDBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MAIDBittrex'].PRICE}</td></tr> : ''}
              {this.state['MANABittrex'] ? <tr>
              <td>{this.state['MANABittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MANABittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MANABittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MANABittrex'].PRICE}</td></tr> : ''}
              {this.state['MCOBittrex'] ? <tr>
              <td>{this.state['MCOBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MCOBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MCOBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MCOBittrex'].PRICE}</td></tr> : ''}
              {this.state['MEMEBittrex'] ? <tr>
              <td>{this.state['MEMEBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MEMEBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MEMEBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MEMEBittrex'].PRICE}</td></tr> : ''}
              {this.state['MERBittrex'] ? <tr>
              <td>{this.state['MERBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MERBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MERBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MERBittrex'].PRICE}</td></tr> : ''}
              {this.state['MLNBittrex'] ? <tr>
              <td>{this.state['MLNBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MLNBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MLNBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MLNBittrex'].PRICE}</td></tr> : ''}
              {this.state['MONABittrex'] ? <tr>
              <td>{this.state['MONABittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MONABittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MONABittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MONABittrex'].PRICE}</td></tr> : ''}
              {this.state['MTLBittrex'] ? <tr>
              <td>{this.state['MTLBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MTLBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MTLBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MTLBittrex'].PRICE}</td></tr> : ''}
              {this.state['MUEBittrex'] ? <tr>
              <td>{this.state['MUEBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MUEBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MUEBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MUEBittrex'].PRICE}</td></tr> : ''}
              {this.state['MUSICBittrex'] ? <tr>
              <td>{this.state['MUSICBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MUSICBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MUSICBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MUSICBittrex'].PRICE}</td></tr> : ''}
              {this.state['MYSTBittrex'] ? <tr>
              <td>{this.state['MYSTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['MYSTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['MYSTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['MYSTBittrex'].PRICE}</td></tr> : ''}
              {this.state['NAVBittrex'] ? <tr>
              <td>{this.state['NAVBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['NAVBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['NAVBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['NAVBittrex'].PRICE}</td></tr> : ''}
              {this.state['NBTBittrex'] ? <tr>
              <td>{this.state['NBTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['NBTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['NBTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['NBTBittrex'].PRICE}</td></tr> : ''}
              {this.state['NEOBittrex'] ? <tr>
              <td>{this.state['NEOBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['NEOBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['NEOBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['NEOBittrex'].PRICE}</td></tr> : ''}
              {this.state['NEOSBittrex'] ? <tr>
              <td>{this.state['NEOSBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['NEOSBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['NEOSBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['NEOSBittrex'].PRICE}</td></tr> : ''}
              {this.state['NLGBittrex'] ? <tr>
              <td>{this.state['NLGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['NLGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['NLGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['NLGBittrex'].PRICE}</td></tr> : ''}
              {this.state['NMRBittrex'] ? <tr>
              <td>{this.state['NMRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['NMRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['NMRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['NMRBittrex'].PRICE}</td></tr> : ''}
              {this.state['NXCBittrex'] ? <tr>
              <td>{this.state['NXCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['NXCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['NXCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['NXCBittrex'].PRICE}</td></tr> : ''}
              {this.state['NXSBittrex'] ? <tr>
              <td>{this.state['NXSBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['NXSBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['NXSBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['NXSBittrex'].PRICE}</td></tr> : ''}
              {this.state['NXTBittrex'] ? <tr>
              <td>{this.state['NXTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['NXTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['NXTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['NXTBittrex'].PRICE}</td></tr> : ''}
              {this.state['OKBittrex'] ? <tr>
              <td>{this.state['OKBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['OKBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['OKBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['OKBittrex'].PRICE}</td></tr> : ''}
              {this.state['OMGBittrex'] ? <tr>
              <td>{this.state['OMGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['OMGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['OMGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['OMGBittrex'].PRICE}</td></tr> : ''}
              {this.state['OMNIBittrex'] ? <tr>
              <td>{this.state['OMNIBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['OMNIBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['OMNIBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['OMNIBittrex'].PRICE}</td></tr> : ''}
              {this.state['PARTBittrex'] ? <tr>
              <td>{this.state['PARTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['PARTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['PARTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['PARTBittrex'].PRICE}</td></tr> : ''}
              {this.state['PAYBittrex'] ? <tr>
              <td>{this.state['PAYBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['PAYBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['PAYBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['PAYBittrex'].PRICE}</td></tr> : ''}
              {this.state['PDCBittrex'] ? <tr>
              <td>{this.state['PDCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['PDCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['PDCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['PDCBittrex'].PRICE}</td></tr> : ''}
              {this.state['PINKBittrex'] ? <tr>
              <td>{this.state['PINKBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['PINKBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['PINKBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['PINKBittrex'].PRICE}</td></tr> : ''}
              {this.state['PIVXBittrex'] ? <tr>
              <td>{this.state['PIVXBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['PIVXBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['PIVXBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['PIVXBittrex'].PRICE}</td></tr> : ''}
              {this.state['PKBBittrex'] ? <tr>
              <td>{this.state['PKBBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['PKBBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['PKBBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['PKBBittrex'].PRICE}</td></tr> : ''}
              {this.state['POTBittrex'] ? <tr>
              <td>{this.state['POTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['POTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['POTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['POTBittrex'].PRICE}</td></tr> : ''}
              {this.state['POWRBittrex'] ? <tr>
              <td>{this.state['POWRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['POWRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['POWRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['POWRBittrex'].PRICE}</td></tr> : ''}
              {this.state['PPCBittrex'] ? <tr>
              <td>{this.state['PPCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['PPCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['PPCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['PPCBittrex'].PRICE}</td></tr> : ''}
              {this.state['PTCBittrex'] ? <tr>
              <td>{this.state['PTCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['PTCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['PTCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['PTCBittrex'].PRICE}</td></tr> : ''}
              {this.state['PTOYBittrex'] ? <tr>
              <td>{this.state['PTOYBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['PTOYBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['PTOYBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['PTOYBittrex'].PRICE}</td></tr> : ''}
              {this.state['QRLBittrex'] ? <tr>
              <td>{this.state['QRLBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['QRLBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['QRLBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['QRLBittrex'].PRICE}</td></tr> : ''}
              {this.state['QTUMBittrex'] ? <tr>
              <td>{this.state['QTUMBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['QTUMBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['QTUMBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['QTUMBittrex'].PRICE}</td></tr> : ''}
              {this.state['QWARKBittrex'] ? <tr>
              <td>{this.state['QWARKBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['QWARKBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['QWARKBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['QWARKBittrex'].PRICE}</td></tr> : ''}
              {this.state['RADSBittrex'] ? <tr>
              <td>{this.state['RADSBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['RADSBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['RADSBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['RADSBittrex'].PRICE}</td></tr> : ''}
              {this.state['RBYBittrex'] ? <tr>
              <td>{this.state['RBYBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['RBYBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['RBYBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['RBYBittrex'].PRICE}</td></tr> : ''}
              {this.state['RCNBittrex'] ? <tr>
              <td>{this.state['RCNBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['RCNBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['RCNBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['RCNBittrex'].PRICE}</td></tr> : ''}
              {this.state['RDDBittrex'] ? <tr>
              <td>{this.state['RDDBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['RDDBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['RDDBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['RDDBittrex'].PRICE}</td></tr> : ''}
              {this.state['REPBittrex'] ? <tr>
              <td>{this.state['REPBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['REPBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['REPBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['REPBittrex'].PRICE}</td></tr> : ''}
              {this.state['RISEBittrex'] ? <tr>
              <td>{this.state['RISEBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['RISEBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['RISEBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['RISEBittrex'].PRICE}</td></tr> : ''}
              {this.state['RLCBittrex'] ? <tr>
              <td>{this.state['RLCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['RLCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['RLCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['RLCBittrex'].PRICE}</td></tr> : ''}
              {this.state['SALTBittrex'] ? <tr>
              <td>{this.state['SALTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SALTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SALTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SALTBittrex'].PRICE}</td></tr> : ''}
              {this.state['SBDBittrex'] ? <tr>
              <td>{this.state['SBDBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SBDBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SBDBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SBDBittrex'].PRICE}</td></tr> : ''}
              {this.state['SCBittrex'] ? <tr>
              <td>{this.state['SCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SCBittrex'].PRICE}</td></tr> : ''}
              {this.state['SEQBittrex'] ? <tr>
              <td>{this.state['SEQBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SEQBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SEQBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SEQBittrex'].PRICE}</td></tr> : ''}
              {this.state['SHIFTBittrex'] ? <tr>
              <td>{this.state['SHIFTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SHIFTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SHIFTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SHIFTBittrex'].PRICE}</td></tr> : ''}
              {this.state['SIBBittrex'] ? <tr>
              <td>{this.state['SIBBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SIBBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SIBBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SIBBittrex'].PRICE}</td></tr> : ''}
              {this.state['SLRBittrex'] ? <tr>
              <td>{this.state['SLRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SLRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SLRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SLRBittrex'].PRICE}</td></tr> : ''}
              {this.state['SLSBittrex'] ? <tr>
              <td>{this.state['SLSBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SLSBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SLSBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SLSBittrex'].PRICE}</td></tr> : ''}
              {this.state['SNRGBittrex'] ? <tr>
              <td>{this.state['SNRGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SNRGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SNRGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SNRGBittrex'].PRICE}</td></tr> : ''}
              {this.state['SNTBittrex'] ? <tr>
              <td>{this.state['SNTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SNTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SNTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SNTBittrex'].PRICE}</td></tr> : ''}
              {this.state['SPHRBittrex'] ? <tr>
              <td>{this.state['SPHRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SPHRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SPHRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SPHRBittrex'].PRICE}</td></tr> : ''}
              {this.state['SPRBittrex'] ? <tr>
              <td>{this.state['SPRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SPRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SPRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SPRBittrex'].PRICE}</td></tr> : ''}
              {this.state['STARTBittrex'] ? <tr>
              <td>{this.state['STARTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['STARTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['STARTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['STARTBittrex'].PRICE}</td></tr> : ''}
              {this.state['STEEMBittrex'] ? <tr>
              <td>{this.state['STEEMBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['STEEMBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['STEEMBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['STEEMBittrex'].PRICE}</td></tr> : ''}
              {this.state['STORJBittrex'] ? <tr>
              <td>{this.state['STORJBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['STORJBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['STORJBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['STORJBittrex'].PRICE}</td></tr> : ''}
              {this.state['STRATBittrex'] ? <tr>
              <td>{this.state['STRATBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['STRATBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['STRATBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['STRATBittrex'].PRICE}</td></tr> : ''}
              {this.state['SWIFTBittrex'] ? <tr>
              <td>{this.state['SWIFTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SWIFTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SWIFTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SWIFTBittrex'].PRICE}</td></tr> : ''}
              {this.state['SWTBittrex'] ? <tr>
              <td>{this.state['SWTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SWTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SWTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SWTBittrex'].PRICE}</td></tr> : ''}
              {this.state['SYNXBittrex'] ? <tr>
              <td>{this.state['SYNXBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SYNXBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SYNXBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SYNXBittrex'].PRICE}</td></tr> : ''}
              {this.state['SYSBittrex'] ? <tr>
              <td>{this.state['SYSBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['SYSBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['SYSBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['SYSBittrex'].PRICE}</td></tr> : ''}
              {this.state['THCBittrex'] ? <tr>
              <td>{this.state['THCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['THCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['THCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['THCBittrex'].PRICE}</td></tr> : ''}
              {this.state['TIXBittrex'] ? <tr>
              <td>{this.state['TIXBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['TIXBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['TIXBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['TIXBittrex'].PRICE}</td></tr> : ''}
              {this.state['TKSBittrex'] ? <tr>
              <td>{this.state['TKSBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['TKSBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['TKSBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['TKSBittrex'].PRICE}</td></tr> : ''}
              {this.state['TRIGBittrex'] ? <tr>
              <td>{this.state['TRIGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['TRIGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['TRIGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['TRIGBittrex'].PRICE}</td></tr> : ''}
              {this.state['TRSTBittrex'] ? <tr>
              <td>{this.state['TRSTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['TRSTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['TRSTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['TRSTBittrex'].PRICE}</td></tr> : ''}
              {this.state['TRUSTBittrex'] ? <tr>
              <td>{this.state['TRUSTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['TRUSTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['TRUSTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['TRUSTBittrex'].PRICE}</td></tr> : ''}
              {this.state['TXBittrex'] ? <tr>
              <td>{this.state['TXBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['TXBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['TXBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['TXBittrex'].PRICE}</td></tr> : ''}
              {this.state['UBQBittrex'] ? <tr>
              <td>{this.state['UBQBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['UBQBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['UBQBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['UBQBittrex'].PRICE}</td></tr> : ''}
              {this.state['UKGBittrex'] ? <tr>
              <td>{this.state['UKGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['UKGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['UKGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['UKGBittrex'].PRICE}</td></tr> : ''}
              {this.state['UNBBittrex'] ? <tr>
              <td>{this.state['UNBBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['UNBBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['UNBBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['UNBBittrex'].PRICE}</td></tr> : ''}
              {this.state['VIABittrex'] ? <tr>
              <td>{this.state['VIABittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['VIABittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['VIABittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['VIABittrex'].PRICE}</td></tr> : ''}
              {this.state['VIBBittrex'] ? <tr>
              <td>{this.state['VIBBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['VIBBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['VIBBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['VIBBittrex'].PRICE}</td></tr> : ''}
              {this.state['VOXBittrex'] ? <tr>
              <td>{this.state['VOXBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['VOXBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['VOXBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['VOXBittrex'].PRICE}</td></tr> : ''}
              {this.state['VRCBittrex'] ? <tr>
              <td>{this.state['VRCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['VRCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['VRCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['VRCBittrex'].PRICE}</td></tr> : ''}
              {this.state['VRMBittrex'] ? <tr>
              <td>{this.state['VRMBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['VRMBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['VRMBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['VRMBittrex'].PRICE}</td></tr> : ''}
              {this.state['VTCBittrex'] ? <tr>
              <td>{this.state['VTCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['VTCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['VTCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['VTCBittrex'].PRICE}</td></tr> : ''}
              {this.state['VTRBittrex'] ? <tr>
              <td>{this.state['VTRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['VTRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['VTRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['VTRBittrex'].PRICE}</td></tr> : ''}
              {this.state['WAVESBittrex'] ? <tr>
              <td>{this.state['WAVESBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['WAVESBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['WAVESBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['WAVESBittrex'].PRICE}</td></tr> : ''}
              {this.state['WINGSBittrex'] ? <tr>
              <td>{this.state['WINGSBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['WINGSBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['WINGSBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['WINGSBittrex'].PRICE}</td></tr> : ''}
              {this.state['XCPBittrex'] ? <tr>
              <td>{this.state['XCPBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XCPBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XCPBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XCPBittrex'].PRICE}</td></tr> : ''}
              {this.state['XDNBittrex'] ? <tr>
              <td>{this.state['XDNBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XDNBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XDNBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XDNBittrex'].PRICE}</td></tr> : ''}
              {this.state['XELBittrex'] ? <tr>
              <td>{this.state['XELBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XELBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XELBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XELBittrex'].PRICE}</td></tr> : ''}
              {this.state['XEMBittrex'] ? <tr>
              <td>{this.state['XEMBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XEMBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XEMBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XEMBittrex'].PRICE}</td></tr> : ''}
              {this.state['XLMBittrex'] ? <tr>
              <td>{this.state['XLMBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XLMBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XLMBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XLMBittrex'].PRICE}</td></tr> : ''}
              {this.state['XMGBittrex'] ? <tr>
              <td>{this.state['XMGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XMGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XMGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XMGBittrex'].PRICE}</td></tr> : ''}
              {this.state['XMRBittrex'] ? <tr>
              <td>{this.state['XMRBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XMRBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XMRBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XMRBittrex'].PRICE}</td></tr> : ''}
              {this.state['XMYBittrex'] ? <tr>
              <td>{this.state['XMYBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XMYBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XMYBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XMYBittrex'].PRICE}</td></tr> : ''}
              {this.state['XRPBittrex'] ? <tr>
              <td>{this.state['XRPBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XRPBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XRPBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XRPBittrex'].PRICE}</td></tr> : ''}
              {this.state['XSTBittrex'] ? <tr>
              <td>{this.state['XSTBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XSTBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XSTBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XSTBittrex'].PRICE}</td></tr> : ''}
              {this.state['XVCBittrex'] ? <tr>
              <td>{this.state['XVCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XVCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XVCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XVCBittrex'].PRICE}</td></tr> : ''}
              {this.state['XVGBittrex'] ? <tr>
              <td>{this.state['XVGBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XVGBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XVGBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XVGBittrex'].PRICE}</td></tr> : ''}
              {this.state['XWCBittrex'] ? <tr>
              <td>{this.state['XWCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XWCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XWCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XWCBittrex'].PRICE}</td></tr> : ''}
              {this.state['XZCBittrex'] ? <tr>
              <td>{this.state['XZCBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['XZCBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['XZCBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['XZCBittrex'].PRICE}</td></tr> : ''}
              {this.state['ZCLBittrex'] ? <tr>
              <td>{this.state['ZCLBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ZCLBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ZCLBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ZCLBittrex'].PRICE}</td></tr> : ''}
              {this.state['ZECBittrex'] ? <tr>
              <td>{this.state['ZECBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ZECBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ZECBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ZECBittrex'].PRICE}</td></tr> : ''}
              {this.state['ZENBittrex'] ? <tr>
              <td>{this.state['ZENBittrex'].FROMSYMBOL}</td>
              <td>{Math.round(this.state['ZENBittrex'].VOLUME24HOURTO * 100) / 100}</td>
              <td>{this.state['ZENBittrex'].CHANGE24HOURPCT}</td>
              <td>{this.state['ZENBittrex'].PRICE}</td></tr> : ''}
              </tbody>
            </table>
          </div>
        </div>
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
