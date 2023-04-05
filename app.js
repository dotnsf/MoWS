//. app.js
var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    ejs = require( 'ejs' ),
    mqtt = require( 'mqtt' ),
    app = express();

require( 'dotenv' ).config();
var mows_url = 'MOWS_URL' in process.env ? process.env.MOWS_URL : ''; 
var mqtt_url = 'MQTT_URL' in process.env ? process.env.MQTT_URL : ''; 
var mqtt_port = 'MQTT_PORT' in process.env ? process.env.MQTT_PORT : 1880; 
var mqtt_topic = 'MQTT_TOPIC' in process.env ? process.env.MQTT_TOPIC : ''; 
var mqtt_pub = null;
if( mqtt_url && mqtt_port && mqtt_topic ){
  mqtt_pub = mqtt.connect( mqtt_url, { port: mqtt_port } );
}

var db = require( './api/db' );
app.use( '/api/db', db );

app.use( bodyParser.urlencoded( { extended: true, limit: '50mb' } ) );
app.use( bodyParser.json( { limit: '50mb' }) );
app.use( express.Router() );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

app.get( '/', async function( req, res ){
  var r = await db.readItems();
  if( r && r.status ){
    res.render( 'index', { items: r.items, mows_url: mows_url, mqtt_topic: mqtt_topic } );
  }else{
    res.render( 'index', { items: [], mows_url: mows_url, mqtt_topic: mqtt_topic } );
  }
});

app.get( '/edit', function( req, res ){
  res.render( 'edit', {} );
});

app.post( '/edit', async function( req, res ){
  var item = req.body;
  var r = await db.createItem( item );

  if( r && r.status && mqtt_pub ){
    var payload = r.item;
    mqtt_pub.publish( mqtt_topic, JSON.stringify( payload ) );
  }

  res.contentType( 'application/json; charset=utf-8' );
  res.status( r.status ? 200 : 400 );
  res.write( JSON.stringify( r, null, 2 ) );
  res.end();
});


var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );

module.exports = app;
