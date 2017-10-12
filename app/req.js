'use strict';
//
import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Switch from 'material-ui/Switch';

var $ = require("jquery");
require('bootstrap');
require('jquery');
require('webpack-jquery-ui/draggable');
require('webpack-jquery-ui/resizable');


class SwitchButton extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;

  
  }
  handleClick() {
    this.checked =! this.checked ;
    console.log(this.name);
    console.log(this.checked);
    //這裡要render 按鈕的字樣

  }
  render() {
    return (
      <div className="col-lg-4">
        <div>{this.name}   </div>
        <div className="material-switch pull-right">
          <input id={this.name} onClick={this.handleClick.bind(this)} name={this.name}  type="checkbox"></input>
          <label htmlFor={this.name} className="label-primary"></label>
        </div>
      </div>
    );
  }
}




function DisplayTopSwitch() {
  return (
    <div className="row">
      <SwitchButton name='Depart Display'  />
      <SwitchButton name='Name Display' />
      <SwitchButton name='Job Display'  />
    </div >
  )
}


ReactDOM.render(
  DisplayTopSwitch(),
  document.getElementById('setting-switch')
);

function clickSwitch() {
  // $('#displaySwitch').click();
  // changeShowStatus()
}

function DisplayControlSwitch() {
  return (
    <div className="row">
      <div className="col-lg-12 ">
        <div> Display</div>
        <button type="button" className="btn btn-sm btn-danger" onClick={clickSwitch()}> Ctrl + ``</button>
      </div>
      <div className="col-lg-12 ">
        <div className="material-switch pull-right">
          <input id="displaySwitch" onClick={clickSwitch()} name="displaySwitch" type="checkbox" />
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
