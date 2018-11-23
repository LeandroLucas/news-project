var express = require('express');
var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

//start routes
//routes
const news = require('./routes/news-rest');
const domain = require('./routes/domain-rest');
const user = require('./routes/user-rest');

app.use('/user', user);
app.use('/news', news);
app.use('/domain', domain);

//end routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://verdadeproduction:ColdWater!2#@ds115244.mlab.com:15244/verdade', { promiseLibrary: require('bluebird'), useNewUrlParser: true}, )
  .then(() =>  console.log('Database connection succesful'))
  .catch((err) => console.error(err));

var domainSynchronizer = require('./schedulers/domain-synchronizer');
domainSynchronizer.synchronizeDomains();
setInterval(() => domainSynchronizer.synchronizeDomains(), 1000 * 60 * 60);

module.exports = app;