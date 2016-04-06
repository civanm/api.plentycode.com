/* global __dirname */
/* global process */
var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('cookie-session'),
  app = express();

var modules = require('./app/modules');

//options service
app.use(bodyParser.json({ extended: true }));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cookieParser());
app.use(session({ secret: 'plentycode' }));

//maps the routes to app modules
modules.init(app);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');       

//starts the server
app.set('port',(process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
