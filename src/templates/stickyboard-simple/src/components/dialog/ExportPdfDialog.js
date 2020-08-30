import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialogContentRoot: {
    padding: '0px 24px',
  },
  tabsRoot: {
    position: 'sticky',
    webkitPosition: '-webkit-sticky',
    top: 0,
    zIndex: 1600,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ExportPdfDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { open, params, callback, onClose } = props;
  const { title, message, cancelButtonText, confirmButtonText } = params;

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      scroll="paper"
      open={open}
      onClose={onClose}
      aria-labelledby="export-pdf-dialog-title"
      aria-describedby="export-pdf-dialog-description">
      <DialogTitle id="export-pdf-dialog-title">
        {'Export to PDF'}
      </DialogTitle>

      <Divider />

      <DialogContent className={classes.dialogContentRoot}>
        Export to PDF feature will be added.
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button onClick={onClose}>
          {cancelButtonText || 'Cancel'}
        </Button>
        <Button
          onClick={() => {
            if (callback && typeof callback === 'function') {
              callback();
            }
            onClose();
          }}
          color="primary"
          autoFocus>
          {confirmButtonText || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExportPdfDialog;