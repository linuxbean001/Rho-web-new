import axios from 'axios';
import {apiUrl} from '../../config';

export default class Trading{
    constructor(){

    }
    previewOrder(Authorization,account_id,formData) {
        return axios.post(apiUrl+'trading/previewOrder', {Authorization,account_id,formData})
            .then((result) => {
                //console.log('xxxxxxx xxxxxxxxxxx response is ', result);
                if(result.data.message=='success'){
                    return result;
                }else{ 
                    return false; 
                }
             }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
        }
    createOrder(Authorization,account_id,formData) {
        //console.log('formdata=',formData);
        return axios.post(apiUrl+'trading/Order', {Authorization,account_id,formData})
            .then((result) => {
                console.log('xxxxxxx xxxxxxxxxxx response  is ', result);
                if(result.data.message=='success'){
                    return result;
                }else{
                    return false; 
                }
            }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
        } 
    updateOrder(Authorization,account_id,formData,orderId) {
      //  console.log('formdata=',formData);
        return axios.post(apiUrl+'trading/OrderUpdate', {Authorization,account_id,formData,orderId})
                .then((result) => {
                    if(result.data.message=='success'){
                        return result;
                    }else{
                        return false; 
                    }
                }).catch(err => {
                   // console.log('xxxxxxx xxxxxxxxxxx err is ', err);
                });
            }  
    deleteOrder(Authorization,account_id,orderId) {
        return axios.post(apiUrl+'trading/OrderDelete', {Authorization,account_id,orderId})
                .then((result) => {
                    if(result.data.message=='success'){
                          return result;
                     }else{
                            return false; 
                     }
                  }).catch(err => {
                              console.log('xxxxxxx xxxxxxxxxxx err is ', err);
                  });
     }

     //----Trade option expire date react api
     expireDate(Authorization,formData) {
        return axios.post(apiUrl+'tradeoption/expirations', {Authorization,formData})
            .then((result) => {
                //console.log('xxxxxxx xxxxxxxxxxx response is ', result);
                if(result.data.message=='success'){
                    return result;
                }else{ 
                    return false; 
                }
             }).catch(err => {
                console.log('xxxxxxx xxxxxxxxxxx err is ', err);
            });
        }

    expireChainDate(Authorization,formData){
        console.log('Fomrdataa chain',formData);
        return axios.post(apiUrl+'tradeoption/chain', {Authorization,formData})
        .then((result) => {
            //console.log('xxxxxxx xxxxxxxxxxx response is ', result);
            if(result.data.message=='success'){
                return result;
            }else{ 
                return false; 
            }
         }).catch(err => {
            console.log('xxxxxxx xxxxxxxxxxx err is ', err);
        });
      }  
}