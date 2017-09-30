'use strict';
//
import React from 'react';
import ReactDOM from 'react-dom';


require('bootstrap');
require('jquery');
require('webpack-jquery-ui/draggable');
require('webpack-jquery-ui/resizable');

function BindListData() {
  alert('dd');
}


function TopSwitch(props) {
  return (

    <div className="col-lg-4">
      <div>{props.name}   </div>
      <div className="material-switch pull-right">
        <input id={props.name} onClick={BindListData} name={props.name} type="checkbox"></input>
        <label htmlFor={props.name} className="label-primary"></label>
      </div>
    </div>

 
  );
}
function TopSwitchUI() {
  return (
    <div className="row">
      <TopSwitch name='Depart Display' />
      <TopSwitch name='Name Display' />
      <TopSwitch name='Job Display' />
    </div >
  )
}


ReactDOM.render(
  TopSwitchUI(),
  document.getElementById('setting-switch')
);


function DisplaySwitch() {
  return (

    <div className="row">
      <div className="col-lg-12 ">
        <div> Display</div>
        <button type="button" className="btn btn-sm btn-danger" onclick="$('#displaySwitch').click();changeShowStatus()"> Ctrl + `</button>

      </div>
      <div className="col-lg-12 ">

        <div className="material-switch pull-right">
          <input id="displaySwitch" onclick="changeShowStatus()" name="displaySwitch" type="checkbox" />
          <label htmlFor="displaySwitch" className="label-primary"></label>
        </div>
      </div>

    </div>
  );
}



ReactDOM.render(
  DisplaySwitch(),
  document.getElementById('display_Switch')
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
