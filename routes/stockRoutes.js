const mongoose = require('mongoose');
const axios = require('axios');
const _ = require('lodash');
const User = mongoose.model('users');
const Ticker = mongoose.model('tickers');
const TYPE = {STOCK: 'STOCK', CRYPTO: 'CRYPTO'};

const API_KEY = 'BIYQYMYZ9KIBXS9V';
const BASE_URL = `https://www.alphavantage.co/query?apikey=${API_KEY}&`;

const STOCK_URL = `${BASE_URL}function=TIME_SERIES_INTRADAY&interval=1min&symbol=`;
const CRYPTO_URL = `${BASE_URL}function=DIGITAL_CURRENCY_INTRADAY&market=USD&symbol=`;

const replaceKeys = (data) => { //removes . from keys of data object. '.' are not valid keys in mongodb
   data = _.mapKeys(data, (value, key) => {
      return key.replace('.', '_');
   })

   for (let key in data) {
      if ( typeof data[key] == 'object') {
         for (let subkey in data[key]) {
            if (typeof data[key][subkey] == 'object') {
               data[key][subkey] = _.mapKeys(data[key][subkey], (value, key) => {
                  return key.replace('.', '_');
               })
            }
         }

         data[key] = _.mapKeys(data[key], (value, key) => {
            return key.replace('.', '_');
         })
      }
   }

   return data;
}

const addTickerToTickers = async (newTicker  = {name: '', type: ''}) => {

   const { name } = newTicker;

   const URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=BIYQYMYZ9KIBXS9V'; //ticker.type == TYPE.STOCK ? `${STOCK_URL}${name}` : `${CRYPTO_URL}${name}`; //if stock, url = 1st, if not, url = 2nd

   let { data } = await axios.get(URL);
   data = replaceKeys(data);

   const addTicker = new Ticker ({ ...newTicker, data: { frequency: 'intraday', data: data } });
   addTicker.save( (err, addedTic) => {
      if (err) return console.log(addedTic + ' had this error while being added: ' + err);
   })

}

module.exports = app => {

   app.post('/api/tickers/', async (req, res) => { //add new ticker             //add error checking

      try {
         const newTicker = req.body;
         const { _id } = req.user;

         //check if ticker is in Ticker
         const queryTicker = await Ticker.findOne( { ...newTicker });

         if (!queryTicker)
            addTickerToTickers(newTicker); //if not found, add to Ticker collection

         const queryUser = await User.findOne( { _id, tickerList: { $elemMatch: newTicker } } );


         if (!queryUser) { //if user does not contain ticker in their list, add it to their tickerList
            await User.findByIdAndUpdate( _id, { $push: { tickerList: newTicker } } );
            res.send(newTicker);
         }
      } catch(err) {
         console.log('err');
         return res.status(500).send(err);
      }

   });

   app.get('/api/tickers', (req, res) => { //get list of tickers
      res.send(req.user.tickerList);
   });

   app.get('/api/tickers/current_prices', (req, res) => { //return list of all current prices
      const currentPriceList = { STOCK: {}, CRYPTO: {} };

      try {
         console.log(req.user.tickerList);
         req.user.tickerList.forEach( tic => {
            const { type, name } = tic;

            // let tickerData = await Ticker.findOne( { name, type } );

            await Ticker.findOne( { name, type }, function (err, ticker) {
               if (ticker) {
                  console.log('found ticker' + ticker);
                  const timeSeries = ticker['data']['data']['Time Series (1min)'];
                  console.log('timeSeries = ', timeSeries);
                  const seriesKey = Object.keys(timeSeries).sort()[0]
                  console.log('seriesKey = ', seriesKey);
                  const currentPrice = timeSeries[seriesKey]['4_ close'];
                  console.log('currentPrice = ', currentPrice);

                  currentPriceList[type][name] = currentPrice;
                  console.log('currentPriceList = ', currentPriceList);
               }
            });
         });
         console.log('post');
         console.log(' after forEach, currentPriceList = ', currentPriceList);
         res.send(currentPriceList);

      } catch(err) {
         console.log('err');
         return res.status(500).send(err);
      }


   });

}
