var micStatus = false;
var context;

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

window.micswitch = micswitch;

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
            if (data.final == true)//句尾才傳
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
            var audio_data = event.inputBuffer.getChannelData(0);// || new Float32Array(2048);
            var sampleRate = event.inputBuffer.sampleRate;
            audio_data = downSampling(audio_data, sampleRate);
            websocket.send(audio_data);
            // send audio_data to server
        }
    }, function (error) {
        console.log(error);
    });
}

function downSampling(buffer, sampleRate) {
    var e = buffer;
    var n = sampleRate;
    for (var t = n / 16e3, o = Math.round(e.length / t), r = new Int16Array(o), i = 0, a = 0; i < r.length;) {
        for (var c = Math.round((i + 1) * t), u = 0, s = 0, l = a; l < c && l < e.length; l++) u += e[l], s++;
        var f = u / s,
            d = Math.max(-1, Math.min(1, f));
        r[i] = d < 0 ? 32768 * d : 32767 * d, i++ , a = c
    }
    return r;
}


socket.on('new subtitle', function (json) {

    const subtitle = json.subtitle;
    $('#subtitle').text(subtitle);
    console.log("++" + subtitle);
    if (subtitle != "")
        $('#history').append( subtitle + "<br/>");

});
