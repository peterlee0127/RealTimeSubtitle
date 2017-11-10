var micStatus = false;
//開關麥克風
function micswitch() {
    if (micStatus) {//關
        $('#micswitchbuttom').attr("class", "btn btn-secondary micswitch")
        $('#micicon').attr("class", "fa-microphone-slash");
        console.log("mic close");
        context.close();
    }
    else {
        initAudio();
        $('#micswitchbuttom').attr("class", "btn btn-lg btn-danger micswitch")
        $('#micicon').attr("class", "fa-microphone");

    }
    micStatus = !micStatus;
}

var context;

function initAudio() {
    let websocket = new WebSocket("wss://developer.ailabs.tw/asr/api/");
    websocket.onopen = function (event) {
        var initStr = { action: "open_processor", session_id: "asr", meta_out: "reflect" }
        websocket.send(JSON.stringify(initStr));
    };

    websocket.onmessage = function (e) {

        var data = JSON.parse(e.data);
        var message = "";
        console.log(data);
        if (data.asr_sentence != undefined) {
            message = data.asr_sentence;
            socket.emit('subtitle', { subtitle: message });
        } else {
            socket.emit('subtitle', { subtitle: "" });
        }

        // console.log(e.data);
    }

    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
    }
    catch (e) {
        alert('Web Audio API is not supported in this browser');
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    navigator.getUserMedia({ audio: true }, function (stream) {
        var microphone = context.createMediaStreamSource(stream);
        var jsNode = context.createScriptProcessor(4096, 1, 1);

        // microphone -> filter -> destination.
        microphone.connect(jsNode);
        jsNode.connect(context.destination);

        jsNode.onaudioprocess = function (event) {
            var audio_data = event.inputBuffer.getChannelData(0) || new Float16Array(2048);
            audio_data = convertoFloat32ToInt16(audio_data);
            websocket.send(audio_data);
            // send audio_data to server
        }
    }, function (error) {
        console.log(error);
    });
}

function convertoFloat32ToInt16(buffer) {
    var l = buffer.length;
    var buf = new Int16Array(l / 3); //<-----Only change here

    while (l--) {
        if (l % 3 == 0) {
            buf[l / 3] = buffer[l] * 0xFFFF;
        }
    }
    return buf.buffer
}


socket.on('new subtitle', function (json) {

    var buttonText = json.subtitle;

    console.log(buttonText);


    $('#subtitle').text(buttonText);


});