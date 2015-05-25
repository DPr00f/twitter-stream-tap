import express from "express";
import './helpers/console';
import Setup from './Setup';
import Routes from './Routes';
// import Twitter from 'node-twitter';
// import config from './helpers/config';

var app = express();
var setup = new Setup(app);
var routes = new Routes(app);

setup.start();
routes.start();

// var twitter = new Twitter.StreamClient(
//   config.twitter.consumer_key,
//   config.twitter.consumer_secret,
//   config.twitter.access_token_key,
//   config.twitter.access_token_secret
// );

// twitter.on('close', function() {
//   console.log('Connection closed.');
// });
// twitter.on('end', function() {
//   console.log('End of Line.');
// });
// twitter.on('error', function(error) {
//   console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
// });
// twitter.on('tweet', function(tweet) {
//   console.log(tweet);
// });

// twitter.start(['baseball', 'basketball', 'football', 'hockey', 'nodejs']);
