import { VIEW_MARKET,VIEW_MARTKET_ERR } from '../constants/Constants';
import MarketData from '../../modal/marketData/marketData';
const market = new MarketData;

export const getMarket = (symbols) => {
        var Authorization=localStorage.getItem('Authorization');
        return dispatch => {
            market.quotes(Authorization,symbols)
            .then(res => {
                 const data = JSON.parse(res.data.data);
                  dispatch(marketsFatchSuccess(data));                        
                }).catch(err => {
                         dispatch(marketFatchERROR(err));
                    })
                }
}
export const marketsFatchSuccess = (marketData) => {
  //console.log('gain',userGains)
   return {
    type: VIEW_MARKET,
    payload:marketData
  }
}

export const marketFatchERROR = (err) => {
   // console.log('success',err);
    return {
      type: VIEW_MARTKET_ERR,
     // payload:'noData'
    }
  }