import { Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@mui/material';

const YesNoModal = ({open, handleClose, handleAccept, itemToDeleteName = '??'}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
               Видалення
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Ви впевненні, що хочете видалти {itemToDeleteName}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>Ні</Button>
                <Button onClick={handleAccept} >Так</Button>
            </DialogActions>
        </Dialog>
    );
};

export default YesNoModal;
