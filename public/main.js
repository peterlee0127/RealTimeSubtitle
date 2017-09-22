
  var socket = io();

    socket.on('new title', function (json) {
        $("#title").animate({opacity:0},300,function() {
        
            $("#title").text(json.title).animate({opacity:1},200);
        });
    });

    function addTitle() {
        var data = $("#inputField").val();
        socket.emit('title', {
            title: data
        });
        $("#inputField").val('');
    }

        function clickTitle(title_text){
          
            if(title_text!='')
            {
                $("#inputField").val(title_text);
                addTitle();
            }
        };




    $.getJSON("api/list", function(json) {
            var list = JSON.parse(json).list;
            var html = ""
            var col_num=12/list.length;
            for(var i=0;i<list.length;i++){

                var buttonSrc ="<div class='col-lg-"+ col_num+"'><ul>";

                list[i].forEach(function(element) {
                    buttonSrc +=  "<div class='listbutton' ><button type='button' onClick=\"";
                    buttonSrc+="clickTitle('" + element + "')\"" + " class='btn btn-primary'>"+element+"</button></div> "
                    if(element.length>22)
                    {
                        alert(element+' 超過二十二字元，可能會造成顯示問題');
                    }
                }, this);
                buttonSrc+="</ul></div>";
                html+=buttonSrc;
            }
            html+="";
        $("#button-array" ).html(html);

        });


    $(document).keypress(function(e) {
        if(e.which == 13) {
            // enter pressed
            addTitle();
        }
    });
       
