import { VIEW_GAIN,VIEW_GAIN_ERR } from '../constants/Constants';
import GainLoss from '../../modal/marketData/gainLoss';
const gainLoss = new GainLoss;

export const getMarketGain = () => {
        var Authorization=localStorage.getItem('Authorization');
        return dispatch => {
            gainLoss.gainers(Authorization)
            .then(res => {
                //  console.log('response is action',res);
                  const data = JSON.parse(res.data.data);
                  dispatch(gainFatchSuccess(data));                        
                }).catch(err => {
                         dispatch(gainFatchERROR(err));
                    })
                }
}
export const gainFatchSuccess = (gainData) => {
   return {
    type: VIEW_GAIN,
    payload:gainData
  }
}

export const gainFatchERROR = (err) => {
    return {
      type: VIEW_GAIN_ERR,
      //payload:'noData'
    }
  }