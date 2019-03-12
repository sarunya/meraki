const express = require('express')
const app = express();
var session = require('express-session');
var cors = require('cors')
var path = require('path');
var guid = require('uuid');
var nconf = require('nconf');
const db = require('./backend/lib/data-access/pgp').db;
const ProductRouteHandler = require('./backend/lib/route-handler/product-route-handler');
const defaultConfig = require('./backend/config/local-config.json');

function start() {
  let cwd = process.cwd();
  let dependencies = {};

  //nconf.env().argv();
  dependencies.config = defaultConfig;
  if (process.env.DATABASE_URL) {
    //console.log(path.join(cwd, nconf.get('config')));
    defaultConfig.postgres.connection_string_meraki = process.env.DATABASE_URL;
  }
  dependencies.pgpmeraki = db(dependencies.config.postgres.connection_string_meraki, dependencies.config.postgres.poolSize);

  let productRouteHandler = new ProductRouteHandler(dependencies)

  app.use(express.json())
  app.use(session({
    secret: 'ssshhhhh'
  }));
  app.use(cors())
  app.options('*', cors())
  app.set('views', __dirname + '/web');
  app.engine('html', require('ejs').renderFile);
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, application/json, *")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  app.use(express.static('./dist/meraki'));

  app.get('/products', (req, res) => {
    return productRouteHandler.getProducts(req, res);
  })

  app.get('/products/:id', (req, res) => {
    return productRouteHandler.getProductById(req, res);
  })

  app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/meraki/index.html'));
  });

  app.use(express.static(path.join(__dirname, 'web')));
  var port = process.env.PORT || 8080;
  app.listen(port);
}
start();