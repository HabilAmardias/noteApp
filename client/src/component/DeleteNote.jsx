import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button } from "@mui/material";
import { API_URL } from "../api/config";

export default function DeleteNote({ onNotesChange, notes, note }) {
    const [openDelete, setOpenDelete] = useState(false)
    const deleteNote = async (id) => {
        const requestOption = {
            method: 'DELETE',
        };
        await fetch(`${API_URL}/${id}`, requestOption);
        onNotesChange(notes.filter(note => note._id !== id));
    };
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    return (
        <>
            <DeleteForeverIcon onClick={handleClickOpenDelete} />
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
                        deleteNote(note._id);
                        handleCloseDelete();
                    }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}