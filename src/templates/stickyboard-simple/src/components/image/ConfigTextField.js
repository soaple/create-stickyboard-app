import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const ConfigTextField = (props) => {
  const { text, setText, label } = props;
  const classes = useStyles();

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  return (
    <form className={classes.inputRoot} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label={label}
        defaultValue={text}
        onChange={handleChange} />
    </form>
  );
}

ConfigTextField.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default ConfigTextField;