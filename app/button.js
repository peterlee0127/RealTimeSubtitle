// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button raised className={classes.button}>
        Default
      </Button>
    </div>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export PDButton withStyles(styles)(RaisedButtons);
//export default withStyles(styles)(RaisedButtons);
