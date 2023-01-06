import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button, IconButton } from "@mui/material";
import { API_URL } from "../api/config";

export default function DeleteNote({ onNotesChange, note, id, number, onLoadingChange }) {
    const [openDelete, setOpenDelete] = useState(false)
    const deleteNote = async (index) => {
        const requestOption = {
            method: 'DELETE',
        };
        const response = await fetch(`${API_URL}/users/${id}/notes/${index}`, requestOption);
        const data = await response.json();
        onNotesChange(data.notes)
    };
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    return (
        <>
            <IconButton sx={{color: 'white'}} size='small' onClick={handleClickOpenDelete}>
                <DeleteForeverIcon  />
            </IconButton>
            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id='alert-dialog-title'>{`Are you sure you want to delete note with title ${note.title}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Once you delete this note, you can't get it back
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={(event) => {
                        deleteNote(number);
                        handleCloseDelete();
                    }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}