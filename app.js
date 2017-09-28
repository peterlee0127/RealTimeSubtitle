var express = require('express');
const fileUpload = require('express-fileupload');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var fs = require('fs');
var message = "";
var showStatus = false;
var DepartdisplaySwitch = false;
var NamedisplaySwitch = true;
var JobdisplaySwitch = false;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', { title: message,status:showStatus });

})
app.get('/admin', (req, res) => {

  res.render('admin', { title: message,status:showStatus,JobdisplaySwitch:JobdisplaySwitch,NamedisplaySwitch:NamedisplaySwitch,DepartdisplaySwitch:DepartdisplaySwitch});

});



app.get('/api/list', (req, res) => {
  var json = fs.readFileSync("./public/list.json", "utf8");
  if (json) {
    res.json(json);
  } else {
    res.json({});
  }
});


app.use(fileUpload());

app.post('/upload/image', function (req, res) {
  if (!req.files.pic) {
    return res.status(400).send('No files were uploaded.');
  } else {
    let file = req.files.pic;
    handlefile(file, res,'./public/back.png');
  }
});

app.post('/upload/json', function (req, res) {
  if (!req.files.json) {
    return res.status(400).send('No files were uploaded.');
  } else {
    let file = req.files.json;
    handlefile(file, res,'./public/list.json');
  }
});

function handlefile(file, res,save_path) {
  file.mv(save_path, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
  });
  setTimeout(function () {

    res.redirect("/admin")
  }, 500);
}

io.on('connection', function (socket) {
  socket.on('title', function (data) {
    message = data.title;
    io.emit('new title', { title: message });
  });
  socket.on('status',function(data){
    showStatus = data.status;
    io.emit('new status',{ status: showStatus }) 
  })
});


