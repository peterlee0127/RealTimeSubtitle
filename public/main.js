let socket = io();
let nowText = $('#title').text;
let showStatus = $('#displaySwitch').is(':checked');
let list = '';
let editPosition = false;

// 接收訊息並顯示在前端畫面上
socket.on('new title', function (json) {

    if (nowText != json.title) {



        var depart = json.title.split('/')[0];
        var name = json.title.split('/')[1];
        var title = json.title.split('/')[2];
        var buttonText = '';
        if (depart != null && depart != '') {
            buttonText += depart;
        }
        if (name != null && name != '') {
            buttonText += ' ' + name;
        }
        if (title != null && title != '') {
            buttonText += '/' + title;
        }
        console.log(title)

        buttonText = $.trim(buttonText);



        if (!showStatus) {
            nowText = buttonText;
            $('#title').text(nowText);
            return;
        }
        $('.textbox_bg').fadeOut('fast', function () {
            // Animation complete.
        });
        $('#title').animate({ opacity: 0 }, 200, function () {
            $('#title').text(buttonText).animate({ opacity: 1 }, 200);
        });
        nowText = buttonText;
        $('.textbox_bg').fadeIn('fast', function () {
            // Animation complete.
        });
    }
});

socket.on('new status', function (json) {
    // 接收顯示狀態是否改變
    showStatus = json.status;
    $('#displaySwitch').attr('checked', showStatus);

    if (showStatus == false) {
        $('.textbox_bg').fadeOut('slow', function () {
            // Animation complete.
        });
    } else {
        $('.textbox_bg').fadeIn('slow', function () {
            // Animation complete.
        });
    }
});

// 送出訊息(訊息,顯示狀態)
function sendNewTitle(text) {

    $('#button-array :button').attr('class', 'btn btn-primary btn-sm');
    socket.emit('title', { title: text });
}

// 更改顯示狀態
function changeShowStatus() {
    if (nowText == '') {
        $('#displaySwitch').attr('checked', false);
        return;
    }
    socket.emit('status', {
        status: $('#displaySwitch').is(':checked')
    });
}

// 輸入新訊息
function newTitle() {
    var data = $('#inputField').val();
    if (data == '') {
        return
    }
    sendNewTitle(data);
    $('#inputField').val('');
}

// 點選匯入的名單
function clickTitle(title_text, btn_Id) {

    if (title_text != '') {
        $('#inputField').val(title_text);
        newTitle();
    }
    $('#button-array :button').attr('class', 'btn btn-primary btn-sm');
    $('#' + btn_Id).attr('class', 'btn btn-danger btn-sm');

};

//將匯入名單轉成按鈕，供直接點選
$.getJSON('api/list', function (json) {
    list = JSON.parse(json).list;

    BindListData();

    $('.draggable').draggable('disable');
});

//劃出List
function BindListData() {

    var list_array = '';

    var departStatus = $("#DepartdisplaySwitch").is(':checked');
    var nameStatus = $("#NamedisplaySwitch").is(':checked');
    var titleStatus = $("#JobdisplaySwitch").is(':checked');

    var col_num = 12 / list.length;
    for (var i = 0; i < list.length; i++) {

        var buttonSrc = "<div class='col-lg-" + col_num + "' style='text-align: left;'>";


        list[i].forEach(function (element, index) {


            var depart = element.split('/')[0];
            var name = element.split('/')[1];
            var title = element.split('/')[2];
            var buttonText = '';
            if (departStatus && depart != null && depart != '') {
                buttonText += depart;
            }
            if (nameStatus && name != null && name != '') {
                buttonText += ' ' + name;
            }
            if (titleStatus && title != null && title != '') {
                buttonText += '/' + title;
            }




            buttonSrc += "<div class='listbutton draggable' id='drag_" + (i + 1) + '-' + (index + 1) + "' ondrag='ondragging(this.id)' ><button type='button' id='dragBtn_" + (i + 1) + '-' + (index + 1) + "' style='float:left;' onClick=\"";
            buttonSrc += "clickTitle('" + element + "','dragBtn_" + (i + 1) + '-' + (index + 1) + "')\"" + " class='btn btn-primary btn-sm'>" + (i + 1) + '-' + (index + 1) + "</button><div>" + buttonText + "</div></div> "


        }, this);
        buttonSrc += "</div>";


        list_array += buttonSrc;

    }
    $("#button-array").html(list_array);

    init_draggble();
    SetPosition();

};

var sPositions = '';
var positions = '';

$.getJSON("api/position", function (json) {
    sPositions = json || "{}",
        positions = JSON.parse(sPositions);
    SetPosition();
});


//設定各位置
function SetPosition() {

    $.each(positions, function (id, pos) {

        $("#" + id).css(pos)
        $("#" + id).css('position', 'absolute')

    })

}

//建立draggble事件連結
function init_draggble() {
    $(".draggable").draggable({
        containment: "#container-draw",
        scroll: true,
        stop: function (event, ui) {

            positions[this.id] = ui.position;
            localStorage.positions = JSON.stringify(positions);
            BindListData();

        }
    });


    $("#display_Switch").draggable({
    });



    $("#container-draw").resizable({

        stop: function (event, ui) {

        }
    })




}



//切換編輯按鈕 儲存
function draggableDisplay() {
    if (!editPosition) {

        $('.draggable').draggable('enable');
        $("#button_EditPosition").attr('class', 'btn btn-danger ');
        $("#button_EditPosition").html('編輯完成');
    }
    else {
        $('.draggable').draggable('disable');
        $("#button_EditPosition").attr('class', 'btn btn-primary');
        $("#button_EditPosition").html('編輯位置');

        $.ajax
            ({
                type: "post",
                dataType: 'json',
                async: true,
                url: '/api/upload/position',
                data: { json: JSON.stringify(positions) },
                success: function () {
                    console.log('OK');
                },
                failure: function () {
                    console.log('err');
                }
            });


    }
    editPosition = !editPosition;

    $.each(positions, function (id, pos) {
        $("#" + id).css(pos)

    })
};

function ondragging(element_id) {
    $('#' + element_id).css('border', '3px solid #d9534f');
}

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



