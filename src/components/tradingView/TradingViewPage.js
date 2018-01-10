import React from 'react';
import socketIOClient from "socket.io-client";
import Clock from './clocks/clock';
import BtcUsd from './BTCUSD';
import Articles from './Articles';
import TableContent from './currencyTable/TableContent';
class TradingViewPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showNews: false,
      showBloomberg: true,
      showBusinessInsider: false,
      showCNN: false,
      showCNBC: false,
      showAltCoins: true,
      showFilteredAltCoins: true,
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
  ToggleBloomberg = () => { this.setState({ showBloomberg: true, showBusinessInsider: false, showCNN: false, showCNBC: false }); };
  ToggleBusinessInsider = () => { this.setState({ showBloomberg: false, showBusinessInsider: true, showCNN: false, showCNBC: false }); };
  ToggleCNN = () => { this.setState({ showBloomberg: false, showBusinessInsider: false, showCNN: true, showCNBC: false }); };
  ToggleCNBC = () => { this.setState({ showBloomberg: false, showBusinessInsider: false, showCNN: false, showCNBC: true }); };
  ToggleAltCoins = () => { this.setState({ showAltCoins: !this.state.showAltCoins }); };
  ToggleFilteredAltCoins = () => { this.setState({ showFilteredAltCoins: !this.state.showFilteredAltCoins }); };

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

    let styles = {
      toggleButton: {
        main: {
          color: "#ccc",
          border: "1px white solid",
          padding: "3px"
        },
        show: {
          backgroundColor: "#000"
        },
        hide: {
          backgroundColor: "#444"
        }
      },
      tab : {
        first: {
          width: "25%",
          marginLeft: "-10%"
        },
        middle: {
          width: "30%",
        },
        last: {
          width: "35%",
          marginRight: "-10%"
        }
      }
    }
    return (
      <div>
        <div style={{marginTop: "15px", marginBottom: "0px"}} className="row">
          <Clock />
        </div>
        <div style={{marginTop: "0px"}} className="row">
          {btcusdCCCAGG ? <BtcUsd btcusd={btcusdCCCAGG} /> : ''}
          {btcusdBitfinex ? <BtcUsd btcusd={btcusdBitfinex} /> : ''}
          {bittrex && bittrex['BTC'] ? <BtcUsd btcusd={bittrex['BTC']} /> : ''}
          {btcusdCoinbase ? <BtcUsd btcusd={btcusdCoinbase} /> : ''}
          {btcusdPoloniex ? <BtcUsd btcusd={btcusdPoloniex} /> : ''}
          {this.state.showNews ?
            <button onClick={this.ToggleNews} className="col-xs-2" style={{...styles.toggleButton.main,...styles.toggleButton.hide}}>Hide News</button> :
            <button onClick={this.ToggleNews} className="col-xs-2" style={{...styles.toggleButton.main,...styles.toggleButton.show}}>Show News</button>
          }
          <div className="col-xs-2">
            {this.state.showNews && !this.state.showBloomberg? <button onClick={this.ToggleBloomberg} style={{...styles.toggleButton.main,...styles.toggleButton.show,...styles.tab.first}}>BL</button> : ''}
            {this.state.showNews && this.state.showBloomberg ? <button style={{...styles.toggleButton.main,...styles.toggleButton.hide,...styles.tab.first}}>BL</button> : ''}
            {this.state.showNews && !this.state.showBusinessInsider? <button onClick={this.ToggleBusinessInsider} style={{...styles.toggleButton.main,...styles.toggleButton.show,...styles.tab.middle}}>BI</button> : ''}
            {this.state.showNews && this.state.showBusinessInsider ? <button style={{...styles.toggleButton.main,...styles.toggleButton.hide,...styles.tab.middle}}>BI</button> : ''}
            {this.state.showNews && !this.state.showCNN? <button onClick={this.ToggleCNN} style={{...styles.toggleButton.main,...styles.toggleButton.show,...styles.tab.middle}}>CNN</button> : ''}
            {this.state.showNews && this.state.showCNN ? <button style={{...styles.toggleButton.main,...styles.toggleButton.hide,...styles.tab.middle}}>CNN</button> : ''}
            {this.state.showNews && !this.state.showCNBC ? <button onClick={this.ToggleCNBC} style={{...styles.toggleButton.main,...styles.toggleButton.show,...styles.tab.last}}>CNBC</button> : ''}
            {this.state.showNews && this.state.showCNBC ? <button style={{...styles.toggleButton.main,...styles.toggleButton.hide,...styles.tab.last}}>CNBC</button> : ''}
          </div>
          {this.state.showAltCoins ?
            <button onClick={this.ToggleAltCoins} className="col-xs-2" style={{...styles.toggleButton.main,...styles.toggleButton.hide}}>Hide AltCoins</button> :
            <button onClick={this.ToggleAltCoins} className="col-xs-2" style={{...styles.toggleButton.main,...styles.toggleButton.show}}>Show AltCoins</button>
          }
          {this.state.showFilteredAltCoins ?
            <button onClick={this.ToggleFilteredAltCoins} className="col-xs-2" style={{...styles.toggleButton.main,...styles.toggleButton.hide}}>Hide Filtered AC</button> :
            <button onClick={this.ToggleFilteredAltCoins} className="col-xs-2" style={{...styles.toggleButton.main,...styles.toggleButton.show}}>Show Filtered AC</button>
          }
        </div>
        <div>
          {this.state.showNews ? <h2>News</h2> : ''}
          {this.state.showNews && this.state.showBloomberg ? <h4>Bloomberg</h4> : ''}
          {this.state.showNews && this.state.showBloomberg && bloombergArticles ? <Articles articles={bloombergArticles} /> : '' }
          {this.state.showNews && this.state.showBusinessInsider ? <h4>Business Insider</h4> : ''}
          {this.state.showNews && this.state.showBusinessInsider && businessInsiderArticles ? <Articles articles={businessInsiderArticles} /> : '' }
          {this.state.showCNN ? <h4>CNN</h4> : ''}
          {this.state.showNews && this.state.showCNN && cnnArticles ? <Articles articles={cnnArticles} /> : '' }
          {this.state.showCNBC ? <h4>CNBC</h4> : ''}
          {this.state.showNews && this.state.showCNBC && cnbcArticles ? <Articles articles={cnbcArticles} /> : '' }
        </div>
        <div style={{marginTop: "15px", marginBottom: "0px"}} className="row">
          <div>
            {this.state.showAltCoins ? <TableContent content={bittrex} /> : ''}
            {this.state.showFilteredAltCoins ? <TableContent content={bittrex} /> : ''}
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
