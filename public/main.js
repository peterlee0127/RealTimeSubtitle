
var socket = io();
var nowText = $("#title").text;
var showStatus = $("#displaySwitch").is(':checked');

//接收訊息並顯示在前端畫面上
socket.on('new title', function (json) {

    if (nowText != json.title) {

        if(!showStatus){
            nowText = json.title;
            $("#title").text(nowText);
            return;
        }       
    $(".textbox_bg").fadeOut("fast", function () {
            // Animation complete.
        });
        $("#title").animate({ opacity: 0 }, 200, function () {
            $("#title").text(json.title).animate({ opacity: 1 }, 200);
        });
        nowText = json.title;
        $(".textbox_bg").fadeIn("fast", function () {
            // Animation complete.
        });
    }
    
});

socket.on('new status', function(json){
    //接收顯示狀態是否改變
    showStatus = json.status;
    $("#displaySwitch").attr("checked", showStatus);
    
    if (showStatus == false) {
        $(".textbox_bg").fadeOut("slow", function () {
            // Animation complete.
        });
    }
    else {
        $(".textbox_bg").fadeIn("slow", function () {
            // Animation complete.
        });
    }
});

//送出訊息(訊息,顯示狀態)
function sendNewTitle(text) {
    socket.emit('title', { title: text });
}


//更改顯示狀態
function changeShowStatus() {

    if(nowText==""){
        $("#displaySwitch").attr("checked", false);
        return;
    }
    socket.emit('status', {
        status:$("#displaySwitch").is(':checked') 
    });

}

//輸入新訊息
function newTitle() {
    var data = $("#inputField").val();
    if(data==""){
        return
    }
    sendNewTitle(data);
    $("#inputField").val('');
}

//點選匯入的名單
function clickTitle(title_text) {

    if (title_text != '') {
        $("#inputField").val(title_text);
        newTitle();
    }
};


//將匯入名單轉成按鈕，供直接點選
$.getJSON("api/list", function (json) {
    var list = JSON.parse(json).list;
    var html = ""
    var col_num = 12 / list.length;
    for (var i = 0; i < list.length; i++) {

        var buttonSrc = "<div class='col-lg-" + col_num + "' style='text-align: left;'><ul>";

        list[i].forEach(function (element, index) {
            buttonSrc += "<div class='listbutton' ><button type='button' style='float:left;' onClick=\"";
            buttonSrc += "clickTitle('" + element + "')\"" + " class='btn btn-primary btn-sm'>" + (index + 1) + "</button><div>" + element + "</div></div> "
            // if (element.length > 22) {
            //     alert(element + ' 超過二十二字元，可能會造成顯示問題');
            // }
        }, this);
        buttonSrc += "</ul></div>";
        html += buttonSrc;
    }
    html += "";
    $("#button-array").html(html);

});

//hotkey
$(document).keypress(function (e) {
    if (e.which == 13) {
        // enter pressed
        newTitle();
    }
});
// ctrl+~ = dislpay click
$(document).keydown(function (e) {
    if (e.keyCode == 192 && e.ctrlKey) {
        $('#displaySwitch').click();
        changeShowStatus();
    }
});



