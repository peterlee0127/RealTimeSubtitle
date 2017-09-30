'use strict';
//
import React from 'react';
import ReactDOM from 'react-dom';

require('bootstrap');
require('jquery');
require('webpack-jquery-ui/draggable');
require('webpack-jquery-ui/resizable');

function BindListData(){
    alert('dd');
}


function TopSwitch(props) {
  return (
    <div className="col-lg-4">
      <div>{props.name}
      <div className="material-switch pull-right">
        <input id="DepartdisplaySwitch" onClick={BindListData} name={props.name} type="checkbox"></input>
        <label htmlFor="DepartdisplaySwitch" className="label-primary"></label>
      </div>
      </div>
    </div>
 );
}
function TopSwitchUI() {
    return (
      <div className="row">
        <TopSwitch name='Depart Display'/>
        <TopSwitch name='Name Display'/>
        <TopSwitch name='Job Display'/>
      </div>
    )
}


ReactDOM.render(
  TopSwitchUI(),
  document.getElementById('setting-switch')
);

// const deparDiv = <div>Dept. Display</div>
//               <div class="col-lg-4">
//         <div>Name Display</div>
//         <div class="material-switch pull-right">
//           <input id="NamedisplaySwitch" onclick="BindListData()" name="displaySwitch" type="checkbox"
//       //    <%=NameStatus? "checked" : "" %>/>
//           <label for="NamedisplaySwitch" class="label-primary"></label>
//         </div>
//       </div>
//       <div class="col-lg-4">
//         <div>Job Display</div>
//         <div class="material-switch pull-right">
//           <input id="JobdisplaySwitch" onclick="BindListData()" name="displaySwitch" type="checkbox" <%=JobStatus? "checked" : "" %>/>
//           <label for="JobdisplaySwitch" class="label-primary"></label>
//         </div>
//         // <TopSwitchUI name='Depart Display' onclick='BindListData()'>
//         // <TopSwitchUI name="Name Display"> onclick='BindListData()'>,
