import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";

export interface AlertDialogProps {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  message,
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          autoFocus
        >
          Bestätigen
        </Button>
      </DialogActions>
    </Dialog>
  );
};
