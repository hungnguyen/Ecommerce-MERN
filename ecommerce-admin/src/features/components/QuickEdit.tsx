import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface QuickEditProps{
    children: React.ReactNode;
    detail?: string;
    title: string;
    open: boolean;
    onClose: () => void;
    onSave: () => void;
}

export default function QuickEdit(props: QuickEditProps) {
  const {children, title, open, detail, onClose, onSave} = props;

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={onClose}
      >
        <DialogTitle sx={{m:1}}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {detail}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} variant="text">Cancel</Button>
            <Button onClick={onSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}