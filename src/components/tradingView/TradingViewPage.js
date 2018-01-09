import React from 'react';
import socketIOClient from "socket.io-client";
import Clock from './clocks/clock';
import BtcUsd from './BTCUSD';
import Ccy from './Currency';
import Articles from './Articles';

class TradingViewPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showNews: true,
      showBloomberg: false,
      showBusinessInsider: false,
      showAltCoins: true,
      response: false,
      localEndpoint: "http://127.0.0.1:4001",
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
    let bittrexChange24H = {};
    let coinbaseChange24H = "";
    let poloniexChange24H = "";

    // Last price
    let bitfinexLastPrice = "";
    let bittrexLastPrice = "";
    let cccaggLastPrice = "";
    let coinbaseLastPrice = "";
    let poloniexLastPrice = "";

    let bittrex = {};

    const { endpoint, localEndpoint } = this.state;
    const socket = socketIOClient(endpoint);
    const localSocket = socketIOClient(localEndpoint);
    // socket.on("DarkSkyAPI", data => this.setState({ weather: data }));
    // socket.on("BittrexAPI", data => this.setState({ btcltc_price: data }));
    // socket.on("CryptoCompareAPI", data => this.setState({ btcusdeureth_price: data }));
    // socket.on("CryptoWatchAPI", data => this.setState({ usdbtc_price: data }));
    // socket.on("BitfinexAPI", data => this.setState({ usdbtc_last_price: data }));
    localSocket.on("BloombergArticles", data => this.setState({ bloombergArticles: data }));
    localSocket.on("BusinessInsiderArticles", data => this.setState({ businessInsiderArticles: data }));
    localSocket.on("CnnArticles", data => this.setState({ cnnArticles: data }));
    localSocket.on("CnbcArticles", data => this.setState({ cnbcArticles: data }));

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
        if (ccy.MARKET === 'CCCAGG') { cccaggChange24H = ccy.CHANGE24HOURPCT; }
        if (ccy.MARKET === 'Coinbase') { coinbaseChange24H = ccy.CHANGE24HOURPCT; }
        if (ccy.MARKET === 'Poloniex') { poloniexChange24H = ccy.CHANGE24HOURPCT; }
        if (ccy.MARKET === 'BitTrex') {
          let ccySymbol = ccy.FROMSYMBOL;
          bittrexChange24H[ccySymbol] = ccy.CHANGE24HOURPCT;
        }
      } else {
        if (ccy.MARKET === 'Bitfinex') { ccy.CHANGE24HOURPCT = bitfinexChange24H; }
        if (ccy.MARKET === 'CCCAGG') { ccy.CHANGE24HOURPCT = cccaggChange24H; }
        if (ccy.MARKET === 'Coinbase') { ccy.CHANGE24HOURPCT = coinbaseChange24H; }
        if (ccy.MARKET === 'Poloniex') { ccy.CHANGE24HOURPCT = poloniexChange24H; }
        if (ccy.MARKET === 'BitTrex') {
          let ccySymbol = ccy.FROMSYMBOL;
          ccy.CHANGE24HOURPCT = bittrexChange24H[ccySymbol];
        }
      }
      if (ccy.FROMSYMBOL === 'BTC') { ccy.VOLUME24HOURTO = ((ccy.VOLUME24HOURTO / 1000000).toFixed(2)); }
      if (ccy.PRICE) {
        if (ccy.MARKET === 'Bitfinex') { ccy.PRICE > bitfinexLastPrice ? ccy.UP = true : ccy.UP = false; bitfinexLastPrice = ccy.PRICE; }
        if (ccy.MARKET === 'CCCAGG') { ccy.PRICE > cccaggLastPrice ? ccy.UP = true : ccy.UP = false; cccaggLastPrice = ccy.PRICE; }
        if (ccy.MARKET === 'Coinbase') { ccy.PRICE > coinbaseLastPrice ? ccy.UP = true : ccy.UP = false; coinbaseLastPrice = ccy.PRICE; }
        if (ccy.MARKET === 'Poloniex') { ccy.PRICE > poloniexLastPrice ? ccy.UP = true : ccy.UP = false; poloniexLastPrice = ccy.PRICE; }
        if (ccy.MARKET === 'BitTrex' && ccy.FROMSYMBOL === 'BTC') { ccy.PRICE > bittrexLastPrice ? ccy.UP = true : ccy.UP = false; bittrexLastPrice = ccy.PRICE; }
      } else {
        if (ccy.MARKET === 'Bitfinex') { ccy.PRICE = bitfinexLastPrice; }
        if (ccy.MARKET === 'CCCAGG') { ccy.PRICE = cccaggLastPrice; }
        if (ccy.MARKET === 'Coinbase') { ccy.PRICE = coinbaseLastPrice; }
        if (ccy.MARKET === 'Poloniex') { ccy.PRICE = poloniexLastPrice; }
        if (ccy.MARKET === 'BitTrex' && ccy.FROMSYMBOL === 'BTC') { ccy.PRICE = bittrexLastPrice; }
      }
      if (ccy.MARKET === 'Bitfinex') { this.setState({ btcusdBitfinex: ccy }); }
      if (ccy.MARKET === 'CCCAGG') { this.setState({ btcusdCCCAGG: ccy }); }
      if (ccy.MARKET === 'Coinbase') { this.setState({ btcusdCoinbase: ccy }); }
      if (ccy.MARKET === 'Poloniex') { this.setState({ btcusdPoloniex: ccy }); }

      if (ccy.MARKET === 'BitTrex') {
        let ccySymbol = ccy.FROMSYMBOL;
        bittrex[ccySymbol] = ccy;
        this.setState({ bittrex: bittrex });
      }
      // console.log(ccy);
    });
  }

  ToggleNews = () => { this.setState({ showNews: !this.state.showNews }); };
  ToggleBloomberg = () => { this.setState({ showBloomberg: !this.state.showBloomberg }); };
  ToggleBusinessInsider = () => { this.setState({ showBusinessInsider: !this.state.showBusinessInsider }); };
  ToggleAltCoins = () => { this.setState({ showAltCoins: !this.state.showAltCoins }); };

  render() {
    const {
      // BTCUSD
      btcusdPoloniex,
      btcusdBitfinex,
      btcusdCCCAGG,
      btcusdCoinbase,

      // Bittrex Assets
      bittrex,

      // News Articles
      bloombergArticles,
      businessInsiderArticles,
      cnnArticles,
      cnbcArticles,
    } = this.state;
    let topToggle = {
      backgroundColor: "#000",
      color: "#ccc",
      border: "1px white solid",
      padding: "3px"
    };
    let topToggleTab = {
      backgroundColor: "#000",
      color: "#ccc",
      border: "1px white solid",
      padding: "3px",
      width: "25%",
      marginLeft: "0"
    };
    return (
      <div>
        <div style={{marginTop: "15px", marginBottom: "0px"}} className="row">
          <Clock />
        </div>
        <div style={{marginTop: "0px"}} className="row">
          {btcusdCCCAGG ? <BtcUsd btcusd={btcusdCCCAGG} /> : ''}
          {btcusdBitfinex ? <BtcUsd btcusd={btcusdBitfinex} /> : ''}
          {bittrex['BTC'] ? <BtcUsd btcusd={bittrex['BTC']} /> : ''}
          {btcusdCoinbase ? <BtcUsd btcusd={btcusdCoinbase} /> : ''}
          {btcusdPoloniex ? <BtcUsd btcusd={btcusdPoloniex} /> : ''}
          {this.state.showNews ?
            <button onClick={this.ToggleNews} className="col-xs-2" style={topToggle}>Hide News</button> :
            <button onClick={this.ToggleNews} className="col-xs-2" style={topToggle}>Show News</button>
          }
          <div className="col-xs-2">
            {this.state.showNews ? <button onClick={this.ToggleBloomberg} style={topToggleTab}>1</button> : ''}
            {this.state.showNews ? <button onClick={this.ToggleBusinessInsider} style={topToggleTab}>2</button> : ''}
          </div>
          {this.state.showAltCoins ?
            <button onClick={this.ToggleAltCoins} className="col-xs-2" style={topToggle}>Hide AltCoins</button> :
            <button onClick={this.ToggleAltCoins} className="col-xs-2" style={topToggle}>Show AltCoins</button>
          }
        </div>
        <div>
          {this.state.showNews ? <h2>News</h2> : ''}
          {this.state.showNews && this.state.showBloomberg ? <h4>Bloomberg</h4> : ''}
          {this.state.showNews && this.state.showBloomberg && bloombergArticles ? <Articles articles={bloombergArticles} /> : '' }
          {this.state.showBusinessInsider ? <h4>Business Insider</h4> : ''}
          {this.state.showNews && this.state.showBusinessInsider && businessInsiderArticles ? <Articles articles={businessInsiderArticles} /> : '' }
        </div>
        <div style={{marginTop: "15px", marginBottom: "0px"}} className="row">
          <div>
          {this.state.showAltCoins ?
            <table style={{textAlign: "left"}} className="col-xs-6">
              <tr>
                <th>Symbol</th>
                <th>Volume</th>
                <th>Change</th>
                <th>Price</th>
              </tr>
              <tbody>
                {bittrex['1ST'] ? <Ccy ccy={bittrex['1ST']} /> : ''}
                {bittrex['2GIVE'] ? <Ccy ccy={bittrex['2GIVE']} /> : ''}
                {bittrex['ABY'] ? <Ccy ccy={bittrex['ABY']} /> : ''}
                {bittrex['ADA'] ? <Ccy ccy={bittrex['ADA']} /> : ''}
                {bittrex['ADT'] ? <Ccy ccy={bittrex['ADT']} /> : ''}
                {bittrex['ADX'] ? <Ccy ccy={bittrex['ADX']} /> : ''}
                {bittrex['AEON'] ? <Ccy ccy={bittrex['AEON']} /> : ''}
                {bittrex['AGRS'] ? <Ccy ccy={bittrex['AGRS']} /> : ''}
                {bittrex['AMP'] ? <Ccy ccy={bittrex['AMP']} /> : ''}
                {bittrex['ANT'] ? <Ccy ccy={bittrex['ANT']} /> : ''}
                {bittrex['APX'] ? <Ccy ccy={bittrex['APX']} /> : ''}
                {bittrex['ARDR'] ? <Ccy ccy={bittrex['ARDR']} /> : ''}
                {bittrex['ARK'] ? <Ccy ccy={bittrex['ARK']} /> : ''}
                {bittrex['AUR'] ? <Ccy ccy={bittrex['AUR']} /> : ''}
                {bittrex['BAT'] ? <Ccy ccy={bittrex['BAT']} /> : ''}
                {bittrex['BAY'] ? <Ccy ccy={bittrex['BAY']} /> : ''}
                {bittrex['BCC'] ? <Ccy ccy={bittrex['BCC']} /> : ''}
                {bittrex['BCY'] ? <Ccy ccy={bittrex['BCY']} /> : ''}
                {bittrex['BIT'] ? <Ccy ccy={bittrex['BIT']} /> : ''}
                {bittrex['BLITZ'] ? <Ccy ccy={bittrex['BLITZ']} /> : ''}
                {bittrex['BLK'] ? <Ccy ccy={bittrex['BLK']} /> : ''}
                {bittrex['BLOCK'] ? <Ccy ccy={bittrex['BLOCK']} /> : ''}
                {bittrex['BNT'] ? <Ccy ccy={bittrex['BNT']} /> : ''}
                {bittrex['BRK'] ? <Ccy ccy={bittrex['BRK']} /> : ''}
                {bittrex['BRX'] ? <Ccy ccy={bittrex['BRX']} /> : ''}
                {bittrex['BSD'] ? <Ccy ccy={bittrex['BSD']} /> : ''}
                {bittrex['BTCD'] ? <Ccy ccy={bittrex['BTCD']} /> : ''}
                {bittrex['BTG'] ? <Ccy ccy={bittrex['BTG']} /> : ''}
                {bittrex['BURST'] ? <Ccy ccy={bittrex['BURST']} /> : ''}
                {bittrex['BYC'] ? <Ccy ccy={bittrex['BYC']} /> : ''}
                {bittrex['CANN'] ? <Ccy ccy={bittrex['CANN']} /> : ''}
                {bittrex['CFI'] ? <Ccy ccy={bittrex['CFI']} /> : ''}
                {bittrex['CLAM'] ? <Ccy ccy={bittrex['CLAM']} /> : ''}
                {bittrex['CLOAK'] ? <Ccy ccy={bittrex['CLOAK']} /> : ''}
                {bittrex['CLUB'] ? <Ccy ccy={bittrex['CLUB']} /> : ''}
                {bittrex['COVAL'] ? <Ccy ccy={bittrex['COVAL']} /> : ''}
                {bittrex['CPC'] ? <Ccy ccy={bittrex['CPC']} /> : ''}
                {bittrex['CRB'] ? <Ccy ccy={bittrex['CRB']} /> : ''}
                {bittrex['CRW'] ? <Ccy ccy={bittrex['CRW']} /> : ''}
                {bittrex['CURE'] ? <Ccy ccy={bittrex['CURE']} /> : ''}
                {bittrex['CVC'] ? <Ccy ccy={bittrex['CVC']} /> : ''}
                {bittrex['CURE'] ? <Ccy ccy={bittrex['CURE']} /> : ''}
                {bittrex['DASH'] ? <Ccy ccy={bittrex['DASH']} /> : ''}
                {bittrex['DCR'] ? <Ccy ccy={bittrex['DCR']} /> : ''}
                {bittrex['DCT'] ? <Ccy ccy={bittrex['DCT']} /> : ''}
                {bittrex['DGB'] ? <Ccy ccy={bittrex['DGB']} /> : ''}
                {bittrex['DGD'] ? <Ccy ccy={bittrex['DGD']} /> : ''}
                {bittrex['DMD'] ? <Ccy ccy={bittrex['DMD']} /> : ''}
                {bittrex['DNT'] ? <Ccy ccy={bittrex['DNT']} /> : ''}
                {bittrex['DOGE'] ? <Ccy ccy={bittrex['DOGE']} /> : ''}
                {bittrex['DOPE'] ? <Ccy ccy={bittrex['DOPE']} /> : ''}
                {bittrex['DTB'] ? <Ccy ccy={bittrex['DTB']} /> : ''}
                {bittrex['DYN'] ? <Ccy ccy={bittrex['DYN']} /> : ''}
                {bittrex['EBST'] ? <Ccy ccy={bittrex['EBST']} /> : ''}
                {bittrex['EDG'] ? <Ccy ccy={bittrex['EDG']} /> : ''}
                {bittrex['EFL'] ? <Ccy ccy={bittrex['EFL']} /> : ''}
                {bittrex['EGC'] ? <Ccy ccy={bittrex['EGC']} /> : ''}
                {bittrex['EMC'] ? <Ccy ccy={bittrex['EMC']} /> : ''}
                {bittrex['EMC2'] ? <Ccy ccy={bittrex['EMC2']} /> : ''}
                {bittrex['ENG'] ? <Ccy ccy={bittrex['ENG']} /> : ''}
                {bittrex['ENRG'] ? <Ccy ccy={bittrex['ENRG']} /> : ''}
                {bittrex['ERC'] ? <Ccy ccy={bittrex['ERC']} /> : ''}
                {bittrex['ETC'] ? <Ccy ccy={bittrex['ETC']} /> : ''}
                {bittrex['ETH'] ? <Ccy ccy={bittrex['ETH']} /> : ''}
                {bittrex['EXCL'] ? <Ccy ccy={bittrex['EXCL']} /> : ''}
                {bittrex['EXP'] ? <Ccy ccy={bittrex['EXP']} /> : ''}
                {bittrex['FAIR'] ? <Ccy ccy={bittrex['FAIR']} /> : ''}
                {bittrex['FCT'] ? <Ccy ccy={bittrex['FCT']} /> : ''}
                {bittrex['FLDC'] ? <Ccy ccy={bittrex['FLDC']} /> : ''}
                {bittrex['FLO'] ? <Ccy ccy={bittrex['FLO']} /> : ''}
                {bittrex['FTC'] ? <Ccy ccy={bittrex['FTC']} /> : ''}
                {bittrex['FUN'] ? <Ccy ccy={bittrex['FUN']} /> : ''}
                {bittrex['GAM'] ? <Ccy ccy={bittrex['GAM']} /> : ''}
                {bittrex['GAME'] ? <Ccy ccy={bittrex['GAME']} /> : ''}
                {bittrex['GBG'] ? <Ccy ccy={bittrex['GBG']} /> : ''}
                {bittrex['GBYTE'] ? <Ccy ccy={bittrex['GBYTE']} /> : ''}
                {bittrex['GCR'] ? <Ccy ccy={bittrex['GCR']} /> : ''}
                {bittrex['GEO'] ? <Ccy ccy={bittrex['GEO']} /> : ''}
                {bittrex['GLD'] ? <Ccy ccy={bittrex['GLD']} /> : ''}
                {bittrex['GNO'] ? <Ccy ccy={bittrex['GNO']} /> : ''}
                {bittrex['GNT'] ? <Ccy ccy={bittrex['GNT']} /> : ''}
                {bittrex['GOLO'] ? <Ccy ccy={bittrex['GOLO']} /> : ''}
                {bittrex['GRC'] ? <Ccy ccy={bittrex['GRC']} /> : ''}
                {bittrex['GRS'] ? <Ccy ccy={bittrex['GRS']} /> : ''}
                {bittrex['GUP'] ? <Ccy ccy={bittrex['GUP']} /> : ''}
                {bittrex['HMQ'] ? <Ccy ccy={bittrex['HMQ']} /> : ''}
                {bittrex['INCNT'] ? <Ccy ccy={bittrex['INCNT']} /> : ''}
                {bittrex['INFX'] ? <Ccy ccy={bittrex['INFX']} /> : ''}
                {bittrex['IOC'] ? <Ccy ccy={bittrex['IOC']} /> : ''}
                {bittrex['ION'] ? <Ccy ccy={bittrex['ION']} /> : ''}
                {bittrex['IOP'] ? <Ccy ccy={bittrex['IOP']} /> : ''}
                {bittrex['KMD'] ? <Ccy ccy={bittrex['KMD']} /> : ''}
                {bittrex['KORE'] ? <Ccy ccy={bittrex['KORE']} /> : ''}
                {bittrex['LBC'] ? <Ccy ccy={bittrex['LBC']} /> : ''}
                {bittrex['LGD'] ? <Ccy ccy={bittrex['LGD']} /> : ''}
                {bittrex['LMC'] ? <Ccy ccy={bittrex['LMC']} /> : ''}
                {bittrex['LSK'] ? <Ccy ccy={bittrex['LSK']} /> : ''}
                {bittrex['LTC'] ? <Ccy ccy={bittrex['LTC']} /> : ''}
                {bittrex['LUN'] ? <Ccy ccy={bittrex['LUN']} /> : ''}
                {bittrex['MAID'] ? <Ccy ccy={bittrex['MAID']} /> : ''}
                {bittrex['MANA'] ? <Ccy ccy={bittrex['MANA']} /> : ''}
                {bittrex['MCO'] ? <Ccy ccy={bittrex['MCO']} /> : ''}
                {bittrex['MEME'] ? <Ccy ccy={bittrex['MEME']} /> : ''}
                {bittrex['MER'] ? <Ccy ccy={bittrex['MER']} /> : ''}
                {bittrex['MLN'] ? <Ccy ccy={bittrex['MLN']} /> : ''}
                {bittrex['MONA'] ? <Ccy ccy={bittrex['MONA']} /> : ''}
                {bittrex['MTL'] ? <Ccy ccy={bittrex['MTL']} /> : ''}
                {bittrex['MUE'] ? <Ccy ccy={bittrex['MUE']} /> : ''}
                {bittrex['MUSIC'] ? <Ccy ccy={bittrex['MUSIC']} /> : ''}
                {bittrex['MYST'] ? <Ccy ccy={bittrex['MYST']} /> : ''}
                {bittrex['NAV'] ? <Ccy ccy={bittrex['NAV']} /> : ''}
                {bittrex['NBT'] ? <Ccy ccy={bittrex['NBT']} /> : ''}
                {bittrex['NEO'] ? <Ccy ccy={bittrex['NEO']} /> : ''}
                {bittrex['NEOS'] ? <Ccy ccy={bittrex['NEOS']} /> : ''}
                {bittrex['NLG'] ? <Ccy ccy={bittrex['NLG']} /> : ''}
                {bittrex['NMR'] ? <Ccy ccy={bittrex['NMR']} /> : ''}
                {bittrex['NXC'] ? <Ccy ccy={bittrex['NXC']} /> : ''}
                {bittrex['NXS'] ? <Ccy ccy={bittrex['NXS']} /> : ''}
                {bittrex['NXT'] ? <Ccy ccy={bittrex['NXT']} /> : ''}
                {bittrex['OK'] ? <Ccy ccy={bittrex['OK']} /> : ''}
                {bittrex['OMG'] ? <Ccy ccy={bittrex['OMG']} /> : ''}
                {bittrex['OMNI'] ? <Ccy ccy={bittrex['OMNI']} /> : ''}
                {bittrex['PART'] ? <Ccy ccy={bittrex['PART']} /> : ''}
                {bittrex['PAY'] ? <Ccy ccy={bittrex['PAY']} /> : ''}
                {bittrex['PDC'] ? <Ccy ccy={bittrex['PDC']} /> : ''}
                {bittrex['PINK'] ? <Ccy ccy={bittrex['PINK']} /> : ''}
                {bittrex['PIVX'] ? <Ccy ccy={bittrex['PIVX']} /> : ''}
                {bittrex['PKB'] ? <Ccy ccy={bittrex['PKB']} /> : ''}
                {bittrex['POT'] ? <Ccy ccy={bittrex['POT']} /> : ''}
                {bittrex['POWR'] ? <Ccy ccy={bittrex['POWR']} /> : ''}
                {bittrex['PPC'] ? <Ccy ccy={bittrex['PPC']} /> : ''}
                {bittrex['PTC'] ? <Ccy ccy={bittrex['PTC']} /> : ''}
                {bittrex['PTOY'] ? <Ccy ccy={bittrex['PTOY']} /> : ''}
                {bittrex['QRL'] ? <Ccy ccy={bittrex['QRL']} /> : ''}
                {bittrex['QTUM'] ? <Ccy ccy={bittrex['QTUM']} /> : ''}
                {bittrex['QWARK'] ? <Ccy ccy={bittrex['QWARK']} /> : ''}
                {bittrex['RADS'] ? <Ccy ccy={bittrex['RADS']} /> : ''}
                {bittrex['RBY'] ? <Ccy ccy={bittrex['RBY']} /> : ''}
                {bittrex['RCN'] ? <Ccy ccy={bittrex['RCN']} /> : ''}
                {bittrex['RDD'] ? <Ccy ccy={bittrex['RDD']} /> : ''}
                {bittrex['REP'] ? <Ccy ccy={bittrex['REP']} /> : ''}
                {bittrex['RISE'] ? <Ccy ccy={bittrex['RISE']} /> : ''}
                {bittrex['RLCB'] ? <Ccy ccy={bittrex['RLCB']} /> : ''}
                {bittrex['SALT'] ? <Ccy ccy={bittrex['SALT']} /> : ''}
                {bittrex['SBD'] ? <Ccy ccy={bittrex['SBD']} /> : ''}
                {bittrex['SC'] ? <Ccy ccy={bittrex['SC']} /> : ''}
                {bittrex['SEQ'] ? <Ccy ccy={bittrex['SEQ']} /> : ''}
                {bittrex['SHIFT'] ? <Ccy ccy={bittrex['SHIFT']} /> : ''}
                {bittrex['SIB'] ? <Ccy ccy={bittrex['SIB']} /> : ''}
                {bittrex['SLR'] ? <Ccy ccy={bittrex['SLR']} /> : ''}
                {bittrex['SLS'] ? <Ccy ccy={bittrex['SLS']} /> : ''}
                {bittrex['SNRG'] ? <Ccy ccy={bittrex['SNRG']} /> : ''}
                {bittrex['SNT'] ? <Ccy ccy={bittrex['SNT']} /> : ''}
                {bittrex['SPHR'] ? <Ccy ccy={bittrex['SPHR']} /> : ''}
                {bittrex['SPR'] ? <Ccy ccy={bittrex['SPR']} /> : ''}
                {bittrex['START'] ? <Ccy ccy={bittrex['START']} /> : ''}
                {bittrex['STEEM'] ? <Ccy ccy={bittrex['STEEM']} /> : ''}
                {bittrex['STORJ'] ? <Ccy ccy={bittrex['STORJ']} /> : ''}
                {bittrex['STRAT'] ? <Ccy ccy={bittrex['STRAT']} /> : ''}
                {bittrex['SWIFT'] ? <Ccy ccy={bittrex['SWIFT']} /> : ''}
                {bittrex['SWT'] ? <Ccy ccy={bittrex['SWT']} /> : ''}
                {bittrex['SYNX'] ? <Ccy ccy={bittrex['SYNX']} /> : ''}
                {bittrex['SYS'] ? <Ccy ccy={bittrex['SYS']} /> : ''}
                {bittrex['THC'] ? <Ccy ccy={bittrex['THC']} /> : ''}
                {bittrex['TIX'] ? <Ccy ccy={bittrex['TIX']} /> : ''}
                {bittrex['TKS'] ? <Ccy ccy={bittrex['TKS']} /> : ''}
                {bittrex['TRIG'] ? <Ccy ccy={bittrex['TRIG']} /> : ''}
                {bittrex['TRST'] ? <Ccy ccy={bittrex['TRST']} /> : ''}
                {bittrex['TRUST'] ? <Ccy ccy={bittrex['TRUST']} /> : ''}
                {bittrex['TX'] ? <Ccy ccy={bittrex['TX']} /> : ''}
                {bittrex['UBQ'] ? <Ccy ccy={bittrex['UBQ']} /> : ''}
                {bittrex['UKG'] ? <Ccy ccy={bittrex['UKG']} /> : ''}
                {bittrex['UNB'] ? <Ccy ccy={bittrex['UNB']} /> : ''}
                {bittrex['VIA'] ? <Ccy ccy={bittrex['VIA']} /> : ''}
                {bittrex['VIB'] ? <Ccy ccy={bittrex['VIB']} /> : ''}
                {bittrex['VOX'] ? <Ccy ccy={bittrex['VOX']} /> : ''}
                {bittrex['VRC'] ? <Ccy ccy={bittrex['VRC']} /> : ''}
                {bittrex['VRM'] ? <Ccy ccy={bittrex['VRM']} /> : ''}
                {bittrex['VTC'] ? <Ccy ccy={bittrex['VTC']} /> : ''}
                {bittrex['VTR'] ? <Ccy ccy={bittrex['VTR']} /> : ''}
                {bittrex['WAVES'] ? <Ccy ccy={bittrex['WAVES']} /> : ''}
                {bittrex['WINGS'] ? <Ccy ccy={bittrex['WINGS']} /> : ''}
                {bittrex['XCP'] ? <Ccy ccy={bittrex['XCP']} /> : ''}
                {bittrex['XDN'] ? <Ccy ccy={bittrex['XDN']} /> : ''}
                {bittrex['XEL'] ? <Ccy ccy={bittrex['XEL']} /> : ''}
                {bittrex['XEM'] ? <Ccy ccy={bittrex['XEM']} /> : ''}
                {bittrex['XLM'] ? <Ccy ccy={bittrex['XLM']} /> : ''}
                {bittrex['XMG'] ? <Ccy ccy={bittrex['XMG']} /> : ''}
                {bittrex['XMR'] ? <Ccy ccy={bittrex['XMR']} /> : ''}
                {bittrex['XMY'] ? <Ccy ccy={bittrex['XMY']} /> : ''}
                {bittrex['XRP'] ? <Ccy ccy={bittrex['XRP']} /> : ''}
                {bittrex['XST'] ? <Ccy ccy={bittrex['XST']} /> : ''}
                {bittrex['XVC'] ? <Ccy ccy={bittrex['XVC']} /> : ''}
                {bittrex['XVG'] ? <Ccy ccy={bittrex['XVG']} /> : ''}
                {bittrex['XWC'] ? <Ccy ccy={bittrex['XWC']} /> : ''}
                {bittrex['XZC'] ? <Ccy ccy={bittrex['XZC']} /> : ''}
                {bittrex['ZCL'] ? <Ccy ccy={bittrex['ZCL']} /> : ''}
                {bittrex['ZEC'] ? <Ccy ccy={bittrex['ZEC']} /> : ''}
                {bittrex['ZEN'] ? <Ccy ccy={bittrex['ZEN']} /> : ''}
              </tbody>
            </table>
          : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default TradingViewPage;
// **********************************************************************************************************************************************
// **********************************************************************************************************************************************
// **********************************************************************************************************************************************
// const bloombergArticlesJSX = [];
// const businessInsiderArticlesJSX = [];
// const cnnArticlesJSX = [];
// const cnbcArticlesJSX = [];
// if (bloombergArticles) {
//   for (let i = 0; i < bloombergArticles.length; i++) {
//       bloombergArticlesJSX.push(
//         <div key={i} style={newsArticle}>
//         <a href={bloombergArticles[i].url} style={newsArticleHeader} target="_blank">{bloombergArticles[i].title}</a><br />
//           <span style={newsArticleDescription}>{bloombergArticles[i].description}</span>
//         </div>
//       );
//   }
// }
// if (businessInsiderArticles) {
//   for (let i = 0; i < businessInsiderArticles.length; i++) {
//     businessInsiderArticlesJSX.push(
//       <div key={i} style={newsArticle}>
//         <a href={businessInsiderArticles[i].url} style={newsArticleHeader} target="_blank">{businessInsiderArticles[i].title}</a><br />
//         <span style={newsArticleDescription}>{businessInsiderArticles[i].description}</span>
//       </div>
//     );
//   }
// }
// if (cnnArticles) {
//   for (let i = 0; i < cnnArticles.length; i++) {
//     cnnArticlesJSX.push(
//       <div key={i}style={newsArticle}>
//       <a href={cnnArticles[i].url} style={newsArticleHeader} target="_blank">{cnnArticles[i].title}</a><br />
//       <span style={newsArticleDescription}>{cnnArticles[i].description}</span>
//       </div>
//     );
//   }
// }
// if (cnbcArticles) {
//   for (let i = 0; i < cnbcArticles.length; i++) {
//     cnbcArticlesJSX.push(
//       <div key={i}style={newsArticle}>
//       <a href={cnbcArticles[i].url} style={newsArticleHeader} target="_blank">{cnbcArticles[i].title}</a><br />
//       <span style={newsArticleDescription}>{cnbcArticles[i].description}</span>
//       </div>
//     );
//   }
// }



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

// **********************************************************************************************************************************************
// **********************************************************************************************************************************************
// **********************************************************************************************************************************************
