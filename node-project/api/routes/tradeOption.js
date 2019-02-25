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

//-----Trade option Expirations date Node API

router.post('/expirations',(req,res,next)=>{
    
    const AuthorizationCode = req.body.Authorization;
    //console.log('Authorization', AuthorizationCode);
    const symbol = req.body.formData.Symbol;
   /* const classData = req.body.formData.Class;
    var  option_symbol = '';
    if(classData==='option'){
         option_symbol = symbol;
    }*/
var options = { method: 'GET',
  url: apiBaseUrl+'markets/options/expirations',
  headers: 
   { 'cache-control': 'no-cache',
      Authorization: 'Bearer '+ AuthorizationCode,
     'Content-Type': 'application/x-www-form-urlencoded',
     Accept: 'application/json' },
     form:{ symbol : symbol, includeAllRoots: 'true' } 
  };
    request(options, function (error, response, body) {
        if (error) {}
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json({
                    message:'success',
                    data:body,
                });

                console.log('trading option:',response);
            });
});


//-----Expire chain date option

router.post('/chain',(req,res)=>{
      
    const AuthorizationCode = req.body.Authorization;
    console.log('AuthorizationCode',AuthorizationCode);
    const symbol = req.body.formData.Symbol;
    const ExpireDate = req.body.formData.ExpireDate;
   /* const classData = req.body.formData.Class;
    var  option_symbol = '';
    if(classData==='option'){
         option_symbol = symbol;
    }*/
var options = { method: 'GET',
  url: apiBaseUrl+'markets/options/chains',
  headers: 
   { 'cache-control': 'no-cache',
      Authorization: 'Bearer '+ AuthorizationCode,
     'Content-Type': 'application/x-www-form-urlencoded',
     Accept: 'application/json' },
     form:{ symbol : symbol, expiration: ExpireDate } 
  };
    request(options, function (error, response, body) {
        if (error) {}
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json({
                    message:'success',
                    data:body,
                });

                console.log('trading option:',response);
            });

});
module.exports=router;