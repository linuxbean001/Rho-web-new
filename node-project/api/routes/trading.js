const express =require('express');
const router =express.Router();
var request = require('request');
var cors = require('cors');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router.use(cors())
const configApi = require('../../apiconfig.json');
var apiBaseUrl= configApi.apiurl;
if(configApi.isSendBox){
    apiBaseUrl=configApi.sendBoxurl;
}
//--------- code for get trading preview Order  ----------------
 
router.post('/previewOrder',(req , res, next) =>{
    const AuthorizationCode = req.body.Authorization;
    const account_id = req.body.account_id;
    const symbol = req.body.formData.Symbol;
    const type = req.body.formData.Type;
    const quantity = parseInt(req.body.formData.Quantity);
    const stop = req.body.formData.StopPrice;
    const limit = req.body.formData.LimitPrice;
    const duration = req.body.formData.Duration;
    const classData = req.body.formData.Class;
    const side = req.body.formData.Side;
    var  option_symbol = '';
    if(classData==='option'){
         option_symbol = symbol;
    }
var options = { method: 'POST',
  url: apiBaseUrl+'accounts/'+account_id+'/orders',
  headers: 
   { 'cache-control': 'no-cache',
      Authorization: 'Bearer '+ AuthorizationCode,
     'Content-Type': 'application/x-www-form-urlencoded',
     Accept: 'application/json' },
     form:{ side : side , symbol : symbol , type : type , quantity:quantity , stop : stop , price : limit ,duration : duration , class : classData ,  preview:'true' ,option_symbol:option_symbol } 
  };
    request(options, function (error, response, body) {
        if (error) {}
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json({
                    message:'success',
                    data:body,
                });
            });
});    
//--------- code for get trading create Order  ----------------
 
router.post('/Order',(req , res, next) =>{
    const AuthorizationCode = req.body.Authorization;
    const account_id = req.body.account_id;
    const symbol = req.body.formData.Symbol;
    const type = req.body.formData.Type;
    const quantity = parseInt(req.body.formData.Quantity);
    const stop = req.body.formData.StopPrice;
    const limit = req.body.formData.LimitPrice;
    const duration = req.body.formData.Duration;
    const classData = req.body.formData.Class;
    const side = req.body.formData.Side;
    var  option_symbol = '';
    if(classData==='option'){
         option_symbol = symbol;
    }
var options = { method: 'POST',
  url: apiBaseUrl+'accounts/'+account_id+'/orders',
  headers: 
   { 'cache-control': 'no-cache',
      Authorization: 'Bearer '+ AuthorizationCode,
     'Content-Type': 'application/x-www-form-urlencoded',
     Accept: 'application/json' },
     form:{ side : side , symbol : symbol , type : type , quantity:quantity , stop : stop , price : limit ,duration : duration , class : classData ,option_symbol:option_symbol } 
  };
    request(options, function (error, response, body) {
        if (error) {}
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json({
                    message:'success',
                    data:body,
                });
            });
});  
//--------- code for get trading update Order  ----------------
 
router.post('/OrderUpdate',(req , res, next) =>{
    const AuthorizationCode = req.body.Authorization;
    const account_id = req.body.account_id;
    const orderId = req.body.orderId;
    const type = req.body.formData.Type;
    const stop = req.body.formData.StopPrice;
    const limit = req.body.formData.price;
    const duration = req.body.formData.Duration;
     
    //console.log('all',req.body.formData.price);
    //console.log('all',limit);

var options = { method: 'PUT',
  url: apiBaseUrl+'accounts/'+account_id+'/orders/'+orderId,
  headers: 
   { 'cache-control': 'no-cache',
      Authorization: 'Bearer '+ AuthorizationCode,
     'Content-Type': 'application/x-www-form-urlencoded',
     Accept: 'application/json' },
     form:{type : type ,  stop : stop , price : limit , duration : duration  } 
  };
    request(options, function (error, response, body) {
        if (error) {}
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json({
                    message:'success',
                    data:body,
                });
            });
});  


//--------- code for get trading delete  Order  ----------------


router.post('/OrderDelete',(req , res, next) =>{
    const AuthorizationCode = req.body.Authorization;
    const account_id = req.body.account_id;
    const orderId = req.body.orderId;
   
var options = { method: 'DELETE',
  url: apiBaseUrl+'accounts/'+account_id+'/orders/'+orderId,
  headers: 
   { 'cache-control': 'no-cache',
      Authorization: 'Bearer '+ AuthorizationCode,
     'Content-Type': 'application/x-www-form-urlencoded',
     Accept: 'application/json' }
    
  };
    request(options, function (error, response, body) {
        if (error) {}
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json({
                    message:'success',
                    data:body,
                });
            });
});  
module.exports=router;