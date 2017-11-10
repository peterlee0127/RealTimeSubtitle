let express = require('express');
let app = express();
let helmet = require('helmet');
let path = require('path');
let bodyParser = require('body-parser');
let port = process.env.PORT || 8080;
let server = require('http').createServer(app);
let io = require('socket.io')(server);



app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

let api = require('./routes/api')(io);
app.use('/', api);

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});
