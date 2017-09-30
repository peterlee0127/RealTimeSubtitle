module.exports = function (io) {

  let express = require('express');
  let router = express.Router();
  let fs = require('fs');
  let fileUpload = require('express-fileupload');

  let message = '';
  let showStatus = false;
  let DepartdisplaySwitch = false;
  let NamedisplaySwitch = true;
  let JobdisplaySwitch = false;

  router.get('/', (req, res) => {
    res.render('index', { title: message, status: showStatus });
  });

  router.get('/admin', (req, res) => {
    res.render('admin', {
      title: message, status: showStatus,
      DepartStatus: DepartdisplaySwitch,
      NameStatus: NamedisplaySwitch,
      JobStatus: JobdisplaySwitch
    });
  });


  router.get('/api/list', (req, res) => {
    fs.readFile('./public/upload/list.json', 'utf8', (error,json) => {
        if (!error) {
            res.json(json);
        } else {
            res.json({});
        } 
    });
  });


  router.get('/api/position', (req, res) => {
    fs.readFile('./public/upload/position.json', 'utf8', (error,json)=> {
        if (!error) {
            res.json(json);
        } else {
            res.json({});
        }    
    });

  });


  router.use(fileUpload());

  router.post('/upload/image', function (req, res) {
    if (!req.files.pic) {
      return res.status(400).send('No files were uploaded.');
    } else {
      let file = req.files.pic;
      handlefile(file, res, './public/upload/back.png');
    }
  });

  router.post('/upload/json', function (req, res) {
    if (!req.files.json) {
      return res.status(400).send('No files were uploaded.');
    } else {
      fs.writeFile('./public/upload/position.json', JSON.stringify({}),'utf-8',function(){});
      let file = req.files.json;
      handlefile(file, res, './public/upload/list.json');
    }
  });

  router.post('/api/upload/position', function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    console.log(req.body.json);
    var stream = fs.createWriteStream("./public/upload/position.json");
    stream.once('open', function (fd) {
      stream.write(req.body.json);
      stream.end();
    });
    res.redirect('/admin');
  });


  function handlefile(file, res, save_path) {
    file.mv(save_path, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });
    setTimeout(function () {

      res.redirect('/admin');
    }, 500);
  }

  io.on('connection', function (socket) {
    socket.on('title', function (data) {
      message = data.title;
      io.emit('new title', { title: message });
    });
    socket.on('status', function (data) {
      showStatus = data.status;
      io.emit('new status', { status: showStatus });
    });
  });
  return router;
}
