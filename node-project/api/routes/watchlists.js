const express = require('express');
const router = express.Router();
var request = require('request');
var cors = require('cors');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router.use(cors())
const configApi = require('../../apiconfig.json');
var apiBaseUrl = configApi.apiurl;
if (configApi.isSendBox) {
     apiBaseUrl = configApi.sendBoxurl;
}
//--------- code for get watchlist details  usign Authorization  ----------------
router.post('/', (req, res, next) => {
     const AuthorizationCode = req.body.Authorization;
     var options = {
          method: 'GET',
          url: apiBaseUrl + 'watchlists',
          headers:
          {
               'cache-control': 'no-cache',
               Authorization: 'Bearer ' + AuthorizationCode,
               Accept: 'application/json'
          }
     };

     request(options, function (error, response, body) {
          if (!error) {
               res.header("Access-Control-Allow-Origin", "*");
               res.status(200).json({
                    message: 'success',
                    data: body,

               });
          }


     });
});
router.post('/watchlists', (req, res, next) => {
     const AuthorizationCode = req.body.Authorization;
     const id = req.body.id;
     var options = {
          method: 'GET',
          url: apiBaseUrl + 'watchlists/' + id,
          headers:
          {
               'cache-control': 'no-cache',
               Authorization: 'Bearer ' + AuthorizationCode,
               Accept: 'application/json'
          },
          formData: { id: id }

     };

     request(options, function (error, response, body) {
          if (error) { }
          res.header("Access-Control-Allow-Origin", "*");
          res.status(200).json({
               message: 'success',
               data: body,
          });
     });
});


// code for combine watchlist and find gain using  his symbols.

router.post('/watchlistsWithSymbol', (req, res, next) => {
     var quoteArray = ['ram'];
     const AuthorizationCode = req.body.Authorization;
     var options = {
          method: 'GET',
          url: apiBaseUrl + 'watchlists',
          headers:
          {
               'cache-control': 'no-cache',
               Authorization: 'Bearer ' + AuthorizationCode,
               Accept: 'application/json'
          }
     };

     request(options, function (error, response, body) {
          if (error) { }
          res.header("Access-Control-Allow-Origin", "*");
          var obj = JSON.parse(body);
          var idArray = [];
          if (obj && obj.watchlists) {
               obj.watchlists.watchlist.forEach(function (item) {
                    idArray.push(item.id);
               });
          }
          idArray.forEach(function (id) {
               var options2 = {
                    method: 'GET',
                    url: apiBaseUrl + 'watchlists/' + id,
                    headers:
                    {
                         'cache-control': 'no-cache',
                         Authorization: 'Bearer ' + AuthorizationCode,
                         Accept: 'application/json'
                    },
                    formData: {}
               };
               request(options2, function (error, response, body) {
                    if (error) { }
                    var obj = JSON.parse(body);
                    if (obj && obj.watchlist.items && obj.watchlist.items.item) {
                         //   console.log('quoteArray RRRRRR',quoteArray);
                         if (obj.watchlist.items.item.length > 1) {
                              var str = '';
                              obj.watchlist.items.item.forEach(function (itm) {
                                   str = str + itm.symbol + ',';
                              });
                              //----------------------------------------
                              var options2 = {
                                   method: 'GET',
                                   url: apiBaseUrl + 'markets/quotes',
                                   headers:
                                   {
                                        'cache-control': 'no-cache',
                                        Authorization: 'Bearer ' + AuthorizationCode,
                                        Accept: 'application/json'
                                   },
                                   formData: { symbols: str }
                              };
                              request(options2, function (error, response, body) {
                                   if (error) { }
                                   var obj = JSON.parse(body);

                                   obj.quotes.quote.forEach(function (qute) {
                                        //console.log('objloop',qute.symbol);
                                        quoteArray.push('in');

                                   })
                                   console.log('quoteArray in', quoteArray);

                              });
                              //-----------------------------------------

                         } else {
                              //-----------------------------------------
                              var str = obj.watchlist.items.item.symbol;
                              var options2 = {
                                   method: 'GET',
                                   url: apiBaseUrl + 'markets/quotes',
                                   headers:
                                   {
                                        'cache-control': 'no-cache',
                                        Authorization: 'Bearer ' + AuthorizationCode,
                                        Accept: 'application/json'
                                   },
                                   formData: { symbols: str }
                              };
                              request(options2, function (error, response, body) {
                                   if (error) { }
                                   var obj = JSON.parse(body);
                                   quoteArray.push('out');
                                   console.log('quoteArray out -----------', quoteArray);
                              });
                              console.log('quoteArray out', quoteArray);
                              //-----------------------------------------
                         }

                    }
               });
          })


     });

});

// code for combine watchlist and find gain using  his symbols.

router.post('/watchlistsWithSymbolusingid', (req, res, next) => {
     var quoteArray = [];
     const AuthorizationCode = req.body.Authorization;
     var id = req.body.id;
     var options = {
          method: 'GET',
          url: apiBaseUrl + 'watchlists/' + id,
          headers:
          {
               'cache-control': 'no-cache',
               Authorization: 'Bearer ' + AuthorizationCode,
               Accept: 'application/json'
          },
          formData: {}
     };
     request(options, function (error, response, body) {
          if (error) {
               return
          }
          var obj = JSON.parse(body);
          var str = '';
          if (obj.watchlist.items.item.length > 1) {
               obj.watchlist.items.item.forEach(function (itm) {
                    str = str + itm.symbol + ',';
               });

          } else {
               str = obj.watchlist.items.item.symbol;
          }
          var options2 = {
               method: 'GET',
               url: apiBaseUrl + 'markets/quotes',
               headers:
               {
                    'cache-control': 'no-cache',
                    Authorization: 'Bearer ' + AuthorizationCode,
                    Accept: 'application/json'
               },
               formData: { symbols: str }
          };
          request(options2, function (error, response, body) {
               if (error) { }
               res.header("Access-Control-Allow-Origin", "*");
               res.status(200).json({
                    message: 'success',
                    data: body
               });
          });
     });

});

router.post('/watchlistsAdd', (req, res, next) => {
     const AuthorizationCode = req.body.Authorization;
     const name = req.body.name;
     const symbols = req.body.symbols;
     var options = {
          method: 'POST',
          url: apiBaseUrl + 'watchlists',
          headers:
          {
               'cache-control': 'no-cache',
               Authorization: 'Bearer ' + AuthorizationCode,
               Accept: 'application/json'
          },
          formData: { name: name, symbols: symbols }
     };

     request(options, function (error, response, body) {
          if (error) { }
          res.header("Access-Control-Allow-Origin", "*");
          res.status(200).json({
               message: 'success',
               data: body,

          });

     });
});
router.post('/watchlistsUpdate', (req, res, next) => {
     const AuthorizationCode = req.body.Authorization;
     const name = req.body.name;
     const symbols = req.body.symbols;
     const id = req.body.id;
     var options = {
          method: 'PUT',
          url: apiBaseUrl + 'watchlists/' + id,
          headers:
          {
               'cache-control': 'no-cache',
               Authorization: 'Bearer ' + AuthorizationCode,
               Accept: 'application/json'
          },
          formData: { id: id, name: name, symbols: symbols }
     };

     request(options, function (error, response, body) {
          if (error) { }
          res.header("Access-Control-Allow-Origin", "*");
          res.status(200).json({
               message: 'success',
               data: body,

          });

     });
});
router.post('/watchlistsDelete', (req, res, next) => {
     const AuthorizationCode = req.body.Authorization;
     const id = req.body.id;
     var options = {
          method: 'DELETE',
          url: apiBaseUrl + 'watchlists/' + id,
          headers:
          {
               'cache-control': 'no-cache',
               Authorization: 'Bearer ' + AuthorizationCode,
               Accept: 'application/json'
          },
          formData: { id: id }
     };

     request(options, function (error, response, body) {
          if (error) { }
          res.header("Access-Control-Allow-Origin", "*");
          res.status(200).json({
               message: 'success',
               data: body,

          });

     });
});
router.post('/watchlistsAddSymbols', (req, res, next) => {
     const AuthorizationCode = req.body.Authorization;
     const id = req.body.id;
     const symbols = req.body.symbols;
     console.log('xxxxx', req.body);
     //     var options = { method: 'POST',
     //          url: apiBaseUrl+'watchlists/'+ id +'/symbols',
     //          headers: 
     //           { 'cache-control': 'no-cache',
     //           Authorization: 'Bearer '+ AuthorizationCode,
     //             Accept: 'application/json' },
     //             formData:{ id: 'default', symbols: 'TJX'}
     //           };


    

     var options = {
          method: 'POST',
          url: apiBaseUrl+'watchlists/'+ id +'/symbols',
          headers:
          {
               'cache-control': 'no-cache',
               Authorization: 'Bearer '+ AuthorizationCode,
               'Content-Type': 'application/x-www-form-urlencoded',
               Accept: 'application/json'
          },
          form: { id: id, symbols: symbols }
     };

     request(options, function (error, response, body) {

          if (error) { }
          res.header("Access-Control-Allow-Origin", "*");
          res.status(200).json({
               message: 'success',
               data: body,

          });
     });




});
router.post('/watchlistsRemoveSymbols', (req, res, next) => {
     const AuthorizationCode = req.body.Authorization;
     const id = req.body.id;
     const symbol = req.body.symbol;
     var options = {
          method: 'DELETE',
          url: apiBaseUrl + 'watchlists/' +id + '/symbols/' + symbol,
          headers:
          {
               'cache-control': 'no-cache',
               Authorization: 'Bearer ' + AuthorizationCode,
               Accept: 'application/json'
          },
          formData: { id: id, symbol: symbol }
     };

     request(options, function (error, response, body) {
          if (error) { }
          res.header("Access-Control-Allow-Origin", "*");
          res.status(200).json({
               message: 'success',
               data: body,

          });

     });
});











module.exports = router;