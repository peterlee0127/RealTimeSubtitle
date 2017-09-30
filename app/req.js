import React from 'react';
import ReactDOM from 'react-dom';

require('bootstrap');
require('jquery');
require('webpack-jquery-ui/draggable');
require('webpack-jquery-ui/resizable');


function TopSwitch(props) {
    return <div class="material-switch pull-right"><input id="DepartdisplaySwitch" onclick="BindListData()" name="displaySwitch" type="checkbox" <%=DepartStatus? "checked"  : "" %>/> <label for="DepartdisplaySwitch" class="label-primary"></label>
        </div>
      </div>

}

const deparDiv = <div>Dept. Display</div>
              <div class="col-lg-4">
        <div>Name Display</div>
        <div class="material-switch pull-right">
          <input id="NamedisplaySwitch" onclick="BindListData()" name="displaySwitch" type="checkbox" <%=NameStatus? "checked" : ""
            %>/>
          <label for="NamedisplaySwitch" class="label-primary"></label>
        </div>
      </div>
      <div class="col-lg-4">
        <div>Job Display</div>
        <div class="material-switch pull-right">
          <input id="JobdisplaySwitch" onclick="BindListData()" name="displaySwitch" type="checkbox" <%=JobStatus? "checked" : "" %>/>
          <label for="JobdisplaySwitch" class="label-primary"></label>
        </div>
 

