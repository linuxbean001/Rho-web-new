import { VIEW_LOSS,VIEW_LOSS_ERR } from '../constants/Constants';
import GainLoss from '../../modal/marketData/gainLoss';
const gainLoss = new GainLoss;

export const getMarketLoss = () => {
        var Authorization=localStorage.getItem('Authorization');
        return dispatch => {
            gainLoss.losers(Authorization)
            .then(res => {
                 const data = JSON.parse(res.data.data);
                  dispatch(lossFatchSuccess(data));                        
                }).catch(err => {
                         dispatch(lossFatchERROR(err));
                    })
                }
}
export const lossFatchSuccess = (lossData) => {
   return {
    type: VIEW_LOSS,
    payload:lossData
  }
}

export const lossFatchERROR = (err) => {
    return {
      type: VIEW_LOSS_ERR,
     // payload:'noData'
    }
  }