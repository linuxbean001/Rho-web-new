import axios from 'axios';
import {apiUrl} from '../../config';
import MarketData from './marketData';
const marketData = new MarketData;
export default class GainLoss{
    gainers(Authorization){
        return axios.get('https://api.iextrading.com/1.0/stock/market/list/gainers')
        .then(res=>{
            var symbolStr='';
            res.data.forEach(sym => {
                symbolStr= symbolStr + sym.symbol+',';
            });
           return marketData.quotes(Authorization,symbolStr)
            .then((resQuoue)=>{
                //console.log('gainer success resonse',resQuoue);
                return resQuoue;
            })
            .catch(erres=>{
               // console.log('gainer error resonse',erres);
            })
           
        })
        .catch(err=>{
           //  console.log('gainer error resonse',err);
        })
    }
    losers(Authorization){
        return axios.get('https://api.iextrading.com/1.0/stock/market/list/losers')
        .then(res=>{
            var symbolStr='';
            res.data.forEach(sym => {
                symbolStr= symbolStr + sym.symbol+',';
            });
           return marketData.quotes(Authorization,symbolStr)
            .then((resQuoue)=>{
                //console.log('gainer success resonse',resQuoue);
                return resQuoue;
            })
            .catch(erres=>{
               // console.log('gainer error resonse',erres);
            })
           
        })
        .catch(err=>{
           //  console.log('gainer error resonse',err);
        })
    }
} 