require('dotenv').load();

var PlexAPI = require('plex-api');

var hostname = process.env.HOSTNAME;
var port = process.env.PORT;
var rootUrl = 'http://' + hostname + ':' + port;

var client = new PlexAPI({
    hostname: hostname,
    port: port,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    options: {
      identifier: '11111-22222-33333-44444-55555',
      product: 'tvOS',
    }
});

var express = require('express');
var app = express();
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/sections', function (req, res) {
  client.find('/library/sections', {type: 'movie|show'}).then(function (sections) {
    console.log(sections);
    res.render('sections', {
      sections: sections,
      rootUrl: rootUrl,
      token: client.authToken
    });
  }, function (err) {
      throw new Error('Could not connect to server');
  });
});

app.get('/sections/:id', function (req, res) {
  client.find('/library/sections/' + req.params.id + '/all').then(function (items) {
    console.log(items);
    res.render('items', {
      items: items,
      rootUrl: rootUrl,
      token: client.authToken
    });
  }, function (err) {
      throw new Error('Could not connect to server');
  });
});

app.get('/videos/:id', function (req, res) {
  client.find('/library/metadata/' + req.params.id).then(function (videos) {
    var video = videos[0];
    console.log(video);
    res.render('video', {
      video: video,
      rootUrl: rootUrl,
      token: client.authToken
    });
  }, function (err) {
      throw new Error('Could not connect to server');
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
