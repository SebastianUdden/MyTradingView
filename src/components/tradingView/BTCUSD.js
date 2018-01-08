import React from 'react';

const BtcUsd = ({btcusd}) => {
  if (!btcusd) {
    btcusd = {};
  }
  if (!btcusd.CHANGE24HOURPCT) {
    btcusd.CHANGE24HOURPCT = ' ';
  }
  let btcusdTitles = {
    change: "24h Change: ",
    change1h: "1h Change: ",
    volume: "24h Vol: "
  };
  let MarketBTCUSD = {
    backgroundColor: "#000",
    color: "#ccc",
    border: "1px white solid",
    padding: "3px"
  };
  let MarketBTCUSDTitle = {
    fontWeight: "800"
  };
  let down = {
    color: "#DC143C",
    fontSize: "150%"
  };
  let up = {
    color: "#32CD32",
    fontSize: "150%"
  };
  return (
    <div className="col-xs-2" style={MarketBTCUSD}>
      <span style={MarketBTCUSDTitle}>{btcusd.MARKET}</span><br />
      <span style={btcusd.UP ? up : down}>${Math.round(btcusd.PRICE * 100) / 100}</span><br />
      <span>{btcusdTitles.change}{btcusd.CHANGE24HOURPCT}</span><br />
      <span>{btcusdTitles.volume}${btcusd.VOLUME24HOURTO}M</span><br />
      <span>-</span>
    </div>
  );
};

export default BtcUsd;
