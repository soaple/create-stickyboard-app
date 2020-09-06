import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const ConfigCheckBox = (props) => {
  const { value, setValue, label } = props;
  const classes = useStyles();

  const handleChange = (evt) => {
    setValue(evt.target.checked);
  };

  return (
    <FormControlLabel className={classes.formControl}
      control={
        <Checkbox
          checked={value}
          onChange={handleChange}
        />
      }
      label={label}
      labelPlacement="start"
    />
  );
}

ConfigCheckBox.propTypes = {
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default ConfigCheckBox;