import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import dom2pdf from "../pdf/dom2pdf";
import ConfigSelect from "../pdf/ConfigSelect";
import ConfigTextField from "../pdf/ConfigTextField";
import { DEFAULT_CONFIG, CONFIG } from "../pdf/constant";

const useStyles = makeStyles((theme) => ({
  dialogContentRoot: {
    padding: '0px 24px',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ExportPdfDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { open, params, callback, onClose } = props;
  const { title, message, cancelButtonText, confirmButtonText } = params;
  const [filename, setFilename] = useState(DEFAULT_CONFIG.filename);
  const [orientation, setOrientation] = useState(DEFAULT_CONFIG.orientation);
  const [pageFormat, setPageFormat] = useState(DEFAULT_CONFIG.pageFormat);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
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
        <ConfigTextField text={filename} setText={setFilename} label="Filename" />
        <ConfigSelect
          config={CONFIG.orientation}
          value={orientation}
          setValue={setOrientation}
          label="Orientation"
        />
        <ConfigSelect
          config={CONFIG.pageFormat}
          value={pageFormat}
          setValue={setPageFormat}
          label="Page format"
        />
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button onClick={onClose}>
          {cancelButtonText || 'Cancel'}
        </Button>
        <Button
          onClick={() => {
            dom2pdf({
              target: '.react-grid-layout',
              pdfOption: {
                orientation,
                unit: "mm",
                format: pageFormat,
                compress: true,
                title: filename
              },
              imageOption: {
                format: "PNG",
                compress: "FAST"
              }
            });
          }}
          color="primary"
          autoFocus>
          {confirmButtonText || 'Download PDF'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExportPdfDialog;
