
function initAudio(){
  let websocket = new WebSocket("wss://developer.ailabs.tw/asr/api/");

  websocket.onopen = function(event){
    // console.log(event);
    var initStr = {action:"open_processor",session_id:"asr",meta_out:"reflect"}
    websocket.send(JSON.stringify(initStr));
  };

  websocket.onmessage = function(e) {
    console.log(e.data);
  }
  var context;
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.getUserMedia({audio: true}, function(stream) {
  var microphone = context.createMediaStreamSource(stream);
  var jsNode = context.createScriptProcessor(4096, 1, 1);

  // microphone -> filter -> destination.
  microphone.connect(jsNode);
  jsNode.connect(context.destination);

  jsNode.onaudioprocess = function(event)
  {
      var audio_data = event.inputBuffer.getChannelData(0)|| new Float16Array(2048);
      audio_data = convertoFloat32ToInt16(audio_data);
      websocket.send(audio_data);
      // send audio_data to server
  }
  }, function(error){
    console.log(error);
  });
}

function convertoFloat32ToInt16(buffer) {
  var l = buffer.length;
  var buf = new Int16Array(l/3); //<-----Only change here

  while (l--) {
    if(l%3==0){
    buf[l/3] = buffer[l]*0xFFFF;
  }
  }
  return buf.buffer
}

window.addEventListener('load', initAudio );



let subtitlesocket = io();


// 接收訊息並顯示在前端畫面上
subtitlesocket.on('new subtitle', function (json) {

   
        var  buttonText = json.subtitle;

        $('.subtitle_bg').fadeOut('fast', function () {
            // Animation complete.
        });
        $('#subtitle').animate({ opacity: 0 }, 200, function () {
            $('#subtitle').text(buttonText).animate({ opacity: 1 }, 200);
        });
        nowText = buttonText;
        $('.subtitle_bg').fadeIn('fast', function () {
            // Animation complete.
        });
    
});