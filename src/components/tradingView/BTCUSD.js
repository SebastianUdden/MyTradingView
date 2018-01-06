// import React from 'react';

// const BtcUsd = ({marketProp}) => {
//   let btcusdTitles = {
//     change: "24h Change: ",
//     volume: "24h Vol: "
//   };
//   let MarketBTCUSD = {
//     backgroundColor: "#000",
//     color: "#ccc",
//     border: "1px white solid",
//     padding: "3px"
//   };
//   let MarketBTCUSDTitle = {
//     fontWeight: "800"
//   };
//   let MarketBTCUSDPriceUp = {
//     color: "#32CD32",
//     fontSize: "150%"
//   };
//   let MarketBTCUSDPriceDown = {
//     color: "#DC143C",
//     fontSize: "150%"
//   };
//   let market = {};
//   if (marketProp) {
//     market.UP = marketProp.UP;
//     market.PRICE = marketProp.PRICE;
//     market.CHANGE24HOURPCT = marketProp.CHANGE24HOURPCT;
//     market.VOLUME24HOURTO = marketProp.VOLUME24HOURTO;
//   }
//   // if (market) {
//   //   {market ? display = (
//   //     <div className="col-xs-2" style={MarketBTCUSD}>
//   //       <span style={MarketBTCUSDTitle}>Market Average</span><br />
//   //       <span style={market.UP ? MarketBTCUSDPriceUp : MarketBTCUSDPriceDown}>${market.PRICE}</span><br />
//   //       <span>{btcusdTitles.change}{market.CHANGE24HOURPCT}</span><br />
//   //       <span>{btcusdTitles.volume}${market.VOLUME24HOURTO}M</span>
//   //     </div>) : '';
//   //   }
//   // }
//   return (
//     <div className="col-xs-2" style={MarketBTCUSD}>
//       <span style={MarketBTCUSDTitle}>{marketProp.MARKET}</span><br />
//       <span style={market.UP ? MarketBTCUSDPriceUp : MarketBTCUSDPriceDown}>${market.PRICE}</span><br />
//       <span>{btcusdTitles.change}{market.CHANGE24HOURPCT}</span><br />
//       <span>{btcusdTitles.volume}${market.VOLUME24HOURTO}M</span>
//     </div>
//   );
// };

// export default BtcUsd;
