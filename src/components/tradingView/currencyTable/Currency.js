import React from 'react';

const Ccy = ({ccy}) => {
  if (!ccy) {
    ccy = {};
  }
  if (!ccy.CHANGE24HOURPCT) { ccy.CHANGE24HOURPCT = ''; }
  if (!ccy.FROMSYMBOL) { ccy.FROMSYMBOL = ''; }
  if (!ccy.VOLUME24HOURTO) { ccy.VOLUME24HOURTO = ''; }
  if (!ccy.PRICE) { ccy.PRICE = ''; }
  let currencyRow = {
    border: "1px white solid",
    backgroundColor: "#222"
  };
  let down = {
    color: "#DC143C"
  };
  let up = {
    color: "#32CD32"
  };
  return (
    <tr style={currencyRow}>
      <td>{ccy.FROMSYMBOL}</td>
      <td>{Math.round(ccy.VOLUME24HOURTO * 100) / 100}</td>
      <td style={ccy.CHANGE24HOURPCT[0] === '-' ? down : up}>{ccy.CHANGE24HOURPCT}</td>
      <td>{ccy.PRICE}</td>
    </tr>
  );
};

export default Ccy;
