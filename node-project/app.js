const express =require('express');
const app = express();
const productRoutes =require ('./api/routes/auth');
const productUser =require ('./api/routes/user');
const productBalance =require ('./api/routes/balance');
const productwatchlists =require ('./api/routes/watchlists');
const ProductMarketData =require ('./api/routes/marketData');
const ProductTrading =require ('./api/routes/trading');
const TradeOption =require ('./api/routes/tradeOption');
app.use('/',productRoutes);
app.use('/user',productUser);
app.use('/balance',productBalance);
app.use('/watchlists',productwatchlists);
app.use('/marketData',ProductMarketData);
app.use('/trading',ProductTrading);
app.use('/tradeoption',TradeOption);
module.exports =app;