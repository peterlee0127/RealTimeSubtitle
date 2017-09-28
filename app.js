var express = require('express');
var app = express();
var helmet = require('helmet')
var path = require('path');
var port = process.env.PORT || 8080;

var server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.use(helmet())

var api = require('./routes/api')(io);
app.use('/',api);


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
