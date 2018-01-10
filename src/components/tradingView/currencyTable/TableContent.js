import React from 'react';
import Ccy from './Currency';

const TableContent = ({content}) => {
  if (!content) {
    content = {};
  }
  return (
    <div>
      <table style={{textAlign: "left"}} className="col-xs-6">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Volume</th>
            <th>Change</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {content['1ST'] ?<Ccy ccy={content['1ST']} />: ''}
          {content['2GIVE'] ?<Ccy ccy={content['2GIVE']} />: ''}
          {content['ABY'] ?<Ccy ccy={content['ABY']} />: ''}
          {content['ADA'] ?<Ccy ccy={content['ADA']} />: ''}
          {content['ADT'] ?<Ccy ccy={content['ADT']} />: ''}
          {content['ADX'] ?<Ccy ccy={content['ADX']} />: ''}
          {content['AEON'] ?<Ccy ccy={content['AEON']} />: ''}
          {content['AGRS'] ?<Ccy ccy={content['AGRS']} />: ''}
          {content['AMP'] ?<Ccy ccy={content['AMP']} />: ''}
          {content['ANT'] ?<Ccy ccy={content['ANT']} />: ''}
          {content['APX'] ?<Ccy ccy={content['APX']} />: ''}
          {content['ARDR'] ?<Ccy ccy={content['ARDR']} />: ''}
          {content['ARK'] ?<Ccy ccy={content['ARK']} />: ''}
          {content['AUR'] ?<Ccy ccy={content['AUR']} />: ''}
          {content['BAT'] ?<Ccy ccy={content['BAT']} />: ''}
          {content['BAY'] ?<Ccy ccy={content['BAY']} />: ''}
          {content['BCC'] ?<Ccy ccy={content['BCC']} />: ''}
          {content['BCY'] ?<Ccy ccy={content['BCY']} />: ''}
          {content['BIT'] ?<Ccy ccy={content['BIT']} />: ''}
          {content['BLITZ'] ?<Ccy ccy={content['BLITZ']} />: ''}
          {content['BLK'] ?<Ccy ccy={content['BLK']} />: ''}
          {content['BLOCK'] ?<Ccy ccy={content['BLOCK']} />: ''}
          {content['BNT'] ?<Ccy ccy={content['BNT']} />: ''}
          {content['BRK'] ?<Ccy ccy={content['BRK']} />: ''}
          {content['BRX'] ?<Ccy ccy={content['BRX']} />: ''}
          {content['BSD'] ?<Ccy ccy={content['BSD']} />: ''}
          {content['BTCD'] ?<Ccy ccy={content['BTCD']} />: ''}
          {content['BTG'] ?<Ccy ccy={content['BTG']} />: ''}
          {content['BURST'] ?<Ccy ccy={content['BURST']} />: ''}
          {content['BYC'] ?<Ccy ccy={content['BYC']} />: ''}
          {content['CANN'] ?<Ccy ccy={content['CANN']} />: ''}
          {content['CFI'] ?<Ccy ccy={content['CFI']} />: ''}
          {content['CLAM'] ?<Ccy ccy={content['CLAM']} />: ''}
          {content['CLOAK'] ?<Ccy ccy={content['CLOAK']} />: ''}
          {content['CLUB'] ?<Ccy ccy={content['CLUB']} />: ''}
          {content['COVAL'] ?<Ccy ccy={content['COVAL']} />: ''}
          {content['CPC'] ?<Ccy ccy={content['CPC']} />: ''}
          {content['CRB'] ?<Ccy ccy={content['CRB']} />: ''}
          {content['CRW'] ?<Ccy ccy={content['CRW']} />: ''}
          {content['CURE'] ?<Ccy ccy={content['CURE']} />: ''}
          {content['CVC'] ?<Ccy ccy={content['CVC']} />: ''}
          {content['CURE'] ?<Ccy ccy={content['CURE']} />: ''}
          {content['DASH'] ?<Ccy ccy={content['DASH']} />: ''}
          {content['DCR'] ?<Ccy ccy={content['DCR']} />: ''}
          {content['DCT'] ?<Ccy ccy={content['DCT']} />: ''}
          {content['DGB'] ?<Ccy ccy={content['DGB']} />: ''}
          {content['DGD'] ?<Ccy ccy={content['DGD']} />: ''}
          {content['DMD'] ?<Ccy ccy={content['DMD']} />: ''}
          {content['DNT'] ?<Ccy ccy={content['DNT']} />: ''}
          {content['DOGE'] ?<Ccy ccy={content['DOGE']} />: ''}
          {content['DOPE'] ?<Ccy ccy={content['DOPE']} />: ''}
          {content['DTB'] ?<Ccy ccy={content['DTB']} />: ''}
          {content['DYN'] ?<Ccy ccy={content['DYN']} />: ''}
          {content['EBST'] ?<Ccy ccy={content['EBST']} />: ''}
          {content['EDG'] ?<Ccy ccy={content['EDG']} />: ''}
          {content['EFL'] ?<Ccy ccy={content['EFL']} />: ''}
          {content['EGC'] ?<Ccy ccy={content['EGC']} />: ''}
          {content['EMC'] ?<Ccy ccy={content['EMC']} />: ''}
          {content['EMC2'] ?<Ccy ccy={content['EMC2']} />: ''}
          {content['ENG'] ?<Ccy ccy={content['ENG']} />: ''}
          {content['ENRG'] ?<Ccy ccy={content['ENRG']} />: ''}
          {content['ERC'] ?<Ccy ccy={content['ERC']} />: ''}
          {content['ETC'] ?<Ccy ccy={content['ETC']} />: ''}
          {content['ETH'] ?<Ccy ccy={content['ETH']} />: ''}
          {content['EXCL'] ?<Ccy ccy={content['EXCL']} />: ''}
          {content['EXP'] ?<Ccy ccy={content['EXP']} />: ''}
          {content['FAIR'] ?<Ccy ccy={content['FAIR']} />: ''}
          {content['FCT'] ?<Ccy ccy={content['FCT']} />: ''}
          {content['FLDC'] ?<Ccy ccy={content['FLDC']} />: ''}
          {content['FLO'] ?<Ccy ccy={content['FLO']} />: ''}
          {content['FTC'] ?<Ccy ccy={content['FTC']} />: ''}
          {content['FUN'] ?<Ccy ccy={content['FUN']} />: ''}
          {content['GAM'] ?<Ccy ccy={content['GAM']} />: ''}
          {content['GAME'] ?<Ccy ccy={content['GAME']} />: ''}
          {content['GBG'] ?<Ccy ccy={content['GBG']} />: ''}
          {content['GBYTE'] ?<Ccy ccy={content['GBYTE']} />: ''}
          {content['GCR'] ?<Ccy ccy={content['GCR']} />: ''}
          {content['GEO'] ?<Ccy ccy={content['GEO']} />: ''}
          {content['GLD'] ?<Ccy ccy={content['GLD']} />: ''}
          {content['GNO'] ?<Ccy ccy={content['GNO']} />: ''}
          {content['GNT'] ?<Ccy ccy={content['GNT']} />: ''}
          {content['GOLO'] ?<Ccy ccy={content['GOLO']} />: ''}
          {content['GRC'] ?<Ccy ccy={content['GRC']} />: ''}
          {content['GRS'] ?<Ccy ccy={content['GRS']} />: ''}
          {content['GUP'] ?<Ccy ccy={content['GUP']} />: ''}
          {content['HMQ'] ?<Ccy ccy={content['HMQ']} />: ''}
          {content['INCNT'] ?<Ccy ccy={content['INCNT']} />: ''}
          {content['INFX'] ?<Ccy ccy={content['INFX']} />: ''}
          {content['IOC'] ?<Ccy ccy={content['IOC']} />: ''}
          {content['ION'] ?<Ccy ccy={content['ION']} />: ''}
          {content['IOP'] ?<Ccy ccy={content['IOP']} />: ''}
          {content['KMD'] ?<Ccy ccy={content['KMD']} />: ''}
          {content['KORE'] ?<Ccy ccy={content['KORE']} />: ''}
          {content['LBC'] ?<Ccy ccy={content['LBC']} />: ''}
          {content['LGD'] ?<Ccy ccy={content['LGD']} />: ''}
          {content['LMC'] ?<Ccy ccy={content['LMC']} />: ''}
          {content['LSK'] ?<Ccy ccy={content['LSK']} />: ''}
          {content['LTC'] ?<Ccy ccy={content['LTC']} />: ''}
          {content['LUN'] ?<Ccy ccy={content['LUN']} />: ''}
          {content['MAID'] ?<Ccy ccy={content['MAID']} />: ''}
          {content['MANA'] ?<Ccy ccy={content['MANA']} />: ''}
          {content['MCO'] ?<Ccy ccy={content['MCO']} />: ''}
          {content['MEME'] ?<Ccy ccy={content['MEME']} />: ''}
          {content['MER'] ?<Ccy ccy={content['MER']} />: ''}
          {content['MLN'] ?<Ccy ccy={content['MLN']} />: ''}
          {content['MONA'] ?<Ccy ccy={content['MONA']} />: ''}
          {content['MTL'] ?<Ccy ccy={content['MTL']} />: ''}
          {content['MUE'] ?<Ccy ccy={content['MUE']} />: ''}
          {content['MUSIC'] ?<Ccy ccy={content['MUSIC']} />: ''}
          {content['MYST'] ?<Ccy ccy={content['MYST']} />: ''}
          {content['NAV'] ?<Ccy ccy={content['NAV']} />: ''}
          {content['NBT'] ?<Ccy ccy={content['NBT']} />: ''}
          {content['NEO'] ?<Ccy ccy={content['NEO']} />: ''}
          {content['NEOS'] ?<Ccy ccy={content['NEOS']} />: ''}
          {content['NLG'] ?<Ccy ccy={content['NLG']} />: ''}
          {content['NMR'] ?<Ccy ccy={content['NMR']} />: ''}
          {content['NXC'] ?<Ccy ccy={content['NXC']} />: ''}
          {content['NXS'] ?<Ccy ccy={content['NXS']} />: ''}
          {content['NXT'] ?<Ccy ccy={content['NXT']} />: ''}
          {content['OK'] ?<Ccy ccy={content['OK']} />: ''}
          {content['OMG'] ?<Ccy ccy={content['OMG']} />: ''}
          {content['OMNI'] ?<Ccy ccy={content['OMNI']} />: ''}
          {content['PART'] ?<Ccy ccy={content['PART']} />: ''}
          {content['PAY'] ?<Ccy ccy={content['PAY']} />: ''}
          {content['PDC'] ?<Ccy ccy={content['PDC']} />: ''}
          {content['PINK'] ?<Ccy ccy={content['PINK']} />: ''}
          {content['PIVX'] ?<Ccy ccy={content['PIVX']} />: ''}
          {content['PKB'] ?<Ccy ccy={content['PKB']} />: ''}
          {content['POT'] ?<Ccy ccy={content['POT']} />: ''}
          {content['POWR'] ?<Ccy ccy={content['POWR']} />: ''}
          {content['PPC'] ?<Ccy ccy={content['PPC']} />: ''}
          {content['PTC'] ?<Ccy ccy={content['PTC']} />: ''}
          {content['PTOY'] ?<Ccy ccy={content['PTOY']} />: ''}
          {content['QRL'] ?<Ccy ccy={content['QRL']} />: ''}
          {content['QTUM'] ?<Ccy ccy={content['QTUM']} />: ''}
          {content['QWARK'] ?<Ccy ccy={content['QWARK']} />: ''}
          {content['RADS'] ?<Ccy ccy={content['RADS']} />: ''}
          {content['RBY'] ?<Ccy ccy={content['RBY']} />: ''}
          {content['RCN'] ?<Ccy ccy={content['RCN']} />: ''}
          {content['RDD'] ?<Ccy ccy={content['RDD']} />: ''}
          {content['REP'] ?<Ccy ccy={content['REP']} />: ''}
          {content['RISE'] ?<Ccy ccy={content['RISE']} />: ''}
          {content['RLCB'] ?<Ccy ccy={content['RLCB']} />: ''}
          {content['SALT'] ?<Ccy ccy={content['SALT']} />: ''}
          {content['SBD'] ?<Ccy ccy={content['SBD']} />: ''}
          {content['SC'] ?<Ccy ccy={content['SC']} />: ''}
          {content['SEQ'] ?<Ccy ccy={content['SEQ']} />: ''}
          {content['SHIFT'] ?<Ccy ccy={content['SHIFT']} />: ''}
          {content['SIB'] ?<Ccy ccy={content['SIB']} />: ''}
          {content['SLR'] ?<Ccy ccy={content['SLR']} />: ''}
          {content['SLS'] ?<Ccy ccy={content['SLS']} />: ''}
          {content['SNRG'] ?<Ccy ccy={content['SNRG']} />: ''}
          {content['SNT'] ?<Ccy ccy={content['SNT']} />: ''}
          {content['SPHR'] ?<Ccy ccy={content['SPHR']} />: ''}
          {content['SPR'] ?<Ccy ccy={content['SPR']} />: ''}
          {content['START'] ?<Ccy ccy={content['START']} />: ''}
          {content['STEEM'] ?<Ccy ccy={content['STEEM']} />: ''}
          {content['STORJ'] ?<Ccy ccy={content['STORJ']} />: ''}
          {content['STRAT'] ?<Ccy ccy={content['STRAT']} />: ''}
          {content['SWIFT'] ?<Ccy ccy={content['SWIFT']} />: ''}
          {content['SWT'] ?<Ccy ccy={content['SWT']} />: ''}
          {content['SYNX'] ?<Ccy ccy={content['SYNX']} />: ''}
          {content['SYS'] ?<Ccy ccy={content['SYS']} />: ''}
          {content['THC'] ?<Ccy ccy={content['THC']} />: ''}
          {content['TIX'] ?<Ccy ccy={content['TIX']} />: ''}
          {content['TKS'] ?<Ccy ccy={content['TKS']} />: ''}
          {content['TRIG'] ?<Ccy ccy={content['TRIG']} />: ''}
          {content['TRST'] ?<Ccy ccy={content['TRST']} />: ''}
          {content['TRUST'] ?<Ccy ccy={content['TRUST']} />: ''}
          {content['TX'] ?<Ccy ccy={content['TX']} />: ''}
          {content['UBQ'] ?<Ccy ccy={content['UBQ']} />: ''}
          {content['UKG'] ?<Ccy ccy={content['UKG']} />: ''}
          {content['UNB'] ?<Ccy ccy={content['UNB']} />: ''}
          {content['VIA'] ?<Ccy ccy={content['VIA']} />: ''}
          {content['VIB'] ?<Ccy ccy={content['VIB']} />: ''}
          {content['VOX'] ?<Ccy ccy={content['VOX']} />: ''}
          {content['VRC'] ?<Ccy ccy={content['VRC']} />: ''}
          {content['VRM'] ?<Ccy ccy={content['VRM']} />: ''}
          {content['VTC'] ?<Ccy ccy={content['VTC']} />: ''}
          {content['VTR'] ?<Ccy ccy={content['VTR']} />: ''}
          {content['WAVES'] ?<Ccy ccy={content['WAVES']} />: ''}
          {content['WINGS'] ?<Ccy ccy={content['WINGS']} />: ''}
          {content['XCP'] ?<Ccy ccy={content['XCP']} />: ''}
          {content['XDN'] ?<Ccy ccy={content['XDN']} />: ''}
          {content['XEL'] ?<Ccy ccy={content['XEL']} />: ''}
          {content['XEM'] ?<Ccy ccy={content['XEM']} />: ''}
          {content['XLM'] ?<Ccy ccy={content['XLM']} />: ''}
          {content['XMG'] ?<Ccy ccy={content['XMG']} />: ''}
          {content['XMR'] ?<Ccy ccy={content['XMR']} />: ''}
          {content['XMY'] ?<Ccy ccy={content['XMY']} />: ''}
          {content['XRP'] ?<Ccy ccy={content['XRP']} />: ''}
          {content['XST'] ?<Ccy ccy={content['XST']} />: ''}
          {content['XVC'] ?<Ccy ccy={content['XVC']} />: ''}
          {content['XVG'] ?<Ccy ccy={content['XVG']} />: ''}
          {content['XWC'] ?<Ccy ccy={content['XWC']} />: ''}
          {content['XZC'] ?<Ccy ccy={content['XZC']} />: ''}
          {content['ZCL'] ?<Ccy ccy={content['ZCL']} />: ''}
          {content['ZEC'] ?<Ccy ccy={content['ZEC']} />: ''}
          {content['ZEN'] ?<Ccy ccy={content['ZEN']} />: ''}
        </tbody>
      </table>
    </div>
  );
};

export default TableContent;
