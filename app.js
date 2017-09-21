var express = require('express');
const fileUpload = require('express-fileupload');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var fs = require('fs');
var message = "";

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.get('/', (req,res) => {
    res.render('index',{title:message});
})
app.get('/admin', (req,res) => {
    res.render('admin',{title:message});
});
app.get('/api/list', (req,res) => {
    var json = fs.readFileSync("./public/list.json","utf8");
    if(json){
        res.json(json);
    }else {
        res.json({});
    }
});


app.use(fileUpload());

app.post('/upload/image', function(req, res) {
  if (!req.files.pic){
    return res.status(400).send('No files were uploaded.');
  }else{
    let file = req.files.pic;
    handlefile(file,res);
   }
});

app.post('/upload/json', function(req, res) {
  if (!req.files.json){
    return res.status(400).send('No files were uploaded.');
  }else{
    let file = req.files.json;
    handlefile(file,res);
    }
});

function handlefile(file,res) {
  file.mv('./public/list.json', function(err) {
    if (err){
      return res.status(500).send(err);
    }
  });
  setTimeout(function() {
  
    res.redirect("/admin")
  },500);
}

io.on('connection', function (socket) {
  socket.on('title', function (data) {
    message = data.title;
    io.emit('new title',{title:message});
  });
});
      
