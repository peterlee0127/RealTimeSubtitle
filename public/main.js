
var socket = io();
var nowText = "";
//接收訊息並顯示在前端畫面上
socket.on('new title', function (json) {

    if (nowText != json.title) {
        if (json.status)
            $(".textbox_bg").fadeOut("fast", function () {
                // Animation complete.
            });
        $("#title").animate({ opacity: 0 }, 200, function () {
            $("#title").text(json.title).animate({ opacity: 1 }, 200);
        });
        nowText = json.title;
        if (json.status)
            $(".textbox_bg").fadeIn("fast", function () {
                // Animation complete.
            });
    }

    //接收顯示狀態是否改變
    console.log(json);
    if (json.status == false) {
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
function sendSocket(text, status) {

    socket.emit('title', {
        title: text, status: status
    });
}


//更改顯示狀態
function changeShowStatus() {

    console.log($("#displaySwitch").is(':checked'));
    sendSocket(nowText, $("#displaySwitch").is(':checked'));


}

//輸入新訊息
function addTitle() {
    var data = $("#inputField").val();
    sendSocket(data, $("#displaySwitch").is(':checked'));
    $("#inputField").val('');
}

//點選匯入的名單
function clickTitle(title_text) {

    if (title_text != '') {
        $("#inputField").val(title_text);
        addTitle();
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
            if (element.length > 22) {
                alert(element + ' 超過二十二字元，可能會造成顯示問題');
            }
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
        addTitle();
    }
});
// ctrl+~ = dislpay click
$(document).keydown(function (e) {
    if (e.keyCode == 192 && e.ctrlKey) {
        $('#displaySwitch').click();
    }
});



