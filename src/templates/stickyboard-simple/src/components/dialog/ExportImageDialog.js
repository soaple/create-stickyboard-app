import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import dom2image from "../image/dom2image";
import ConfigTextField from "../pdf/ConfigTextField";
import ConfigSelect from "../pdf/ConfigSelect";
import { DEFAULT_CONFIG, CONFIG } from "../image/constant";

const useStyles = makeStyles((theme) => ({
  dialogContentRoot: {
    padding: '0px 24px',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ExportImageDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { open, params, callback, onClose } = props;
  const { title, message, cancelButtonText, confirmButtonText } = params;
  const [filename, setFilename] = useState(DEFAULT_CONFIG.filename);
  const [filenameExtension, setFilenameExtension] = useState(DEFAULT_CONFIG.filenameExtension);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      scroll="paper"
      open={open}
      onClose={onClose}
      aria-labelledby="export-image-dialog-title"
      aria-describedby="export-image-dialog-description">
      <DialogTitle id="export-image-dialog-title">
        {'Export to Image'}
      </DialogTitle>

      <Divider />

      <DialogContent className={classes.dialogContentRoot}>
        <ConfigTextField text={filename} setText={setFilename} label="Filename" />
        <ConfigSelect
          config={CONFIG.filenameExtension}
          value={filenameExtension}
          setValue={setFilenameExtension}
          label="Filename extension"
        />
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button onClick={onClose}>
          {cancelButtonText || 'Cancel'}
        </Button>
        <Button
          onClick={() => {
            dom2image({
              target: '.react-grid-layout',
              filenameExtension,
              filename
            });
          }}
          color="primary"
          autoFocus>
          {confirmButtonText || 'Download Image'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExportImageDialog;
