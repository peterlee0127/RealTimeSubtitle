module.exports = function(io){

const express = require('express');
const router = express.Router();
const fs = require('fs');
const fileUpload = require('express-fileupload');

let message = "";
let showStatus = false;
var DepartdisplaySwitch = false;
var NamedisplaySwitch = true;
var JobdisplaySwitch = false;

router.get('/', (req, res) => {
  res.render('index', { title: message,status:showStatus });
})

router.get('/admin', (req, res) => {
  res.render('admin', { title: message,status:showStatus,DepartStatus:DepartdisplaySwitch,NameStatus:NamedisplaySwitch,JobStatus:JobdisplaySwitch});
});



router.get('/api/list', (req, res) => {
  var json = fs.readFileSync("./public/list.json", "utf8");
  if (json) {
    res.json(json);
  } else {
    res.json({});
  }
});


router.use(fileUpload());

router.post('/upload/image', function (req, res) {
  if (!req.files.pic) {
    return res.status(400).send('No files were uploaded.');
  } else {
    let file = req.files.pic;
    handlefile(file, res,'./public/back.png');
  }
});

router.post('/upload/json', function (req, res) {
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
    return router;
}
