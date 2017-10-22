'use strict';
//
import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import Switch from 'material-ui/Switch';
import Grid from 'material-ui/Grid';

/*
var $ = require("jquery");
require('bootstrap');
require('jquery');
require('webpack-jquery-ui/draggable');
require('webpack-jquery-ui/resizable');
*/

class SwitchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: props.checked ,name: props.name};
  }
  handleClick() {
    var check = !this.state.checked;
    this.setState({checked: check});
    //這裡要render 按鈕的字樣
  }
  render() {
    return (
        <Grid item xs={12}>
            <div>{this.state.name}</div>
            <Switch onChange={this.handleClick.bind(this)} defaultChecked={this.state.checked} aria-label="Switch"/>
        </Grid>
    );
  }
}


function DisplayTopSwitch() {
  return (
    <div>
    <Grid container spacing={24}>
        <SwitchButton name='Depart Display' checked={DepartStatus}/>
        <SwitchButton name='Name Display'  checked={NameStatus}/>
        <SwitchButton name='Job Display'  checked={JobStatus}/>
    </Grid>
    </div>
   
  )
}


ReactDOM.render(
  DisplayTopSwitch(),
  document.getElementById('setting-switch')
);

//export default SwitchButton;

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
