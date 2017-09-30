'use strict';
//
import React from 'react';
import ReactDOM from 'react-dom';

var $ = require("jquery");
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
function DisplayTopSwitch() {
  return (
    <div className="row">
      <TopSwitch name='Depart Display' />
      <TopSwitch name='Name Display' />
      <TopSwitch name='Job Display' />
    </div >
  )
}


ReactDOM.render(
  DisplayTopSwitch(),
  document.getElementById('setting-switch')
);

function clickSwitch() {
  alert("23232");
  // $('#displaySwitch').click();
  // changeShowStatus()
}

function DisplayControlSwitch() {
  return (
    <div className="row">
      <div className="col-lg-12 ">
        <div> Display</div>
        <button type="button" className="btn btn-sm btn-danger" onClick={ clickSwitch() }> Ctrl + ``</button>
      </div>
      <div className="col-lg-12 ">
        <div className="material-switch pull-right">
          <input id="displaySwitch" onClick={ clickSwitch() } name="displaySwitch" type="checkbox" />
          <label htmlFor="displaySwitch" className="label-primary"></label>
        </div>
      </div>

    </div>
  );
}


ReactDOM.render(
  DisplayControlSwitch(),
  document.getElementById('display_Switch')
);
