import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { API_URL } from "../api/config";

export default function EditNote({ onNotesChange, note, id, number}) {
    const [openEdit, setOpenEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(`${note.title}`);
    const [newText, setNewText] = useState(`${note.text}`);
    const editNote = async (index) => {
        const requestOption = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, text: newText }),
        };
        const response = await fetch(`${API_URL}/users/${id}/notes/${index}`, requestOption);
        const data = await response.json();
        onNotesChange(data.notes);
    };
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    return (
        <>
            <IconButton sx={{color:'white'}} size='small' onClick={handleClickOpenEdit}>
                <EditIcon  />
            </IconButton>
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit note</DialogTitle>
                <DialogContent>
                    <TextField autoFocus type='text' value={newTitle} id='standard-required' label='Note Title' fullWidth variant='standard' required onChange={(evt) => {
                        setNewTitle(evt.target.value)
                    }} />
                    <TextField type='text' value={newText} name='text' id='standard-required' label='Note Text' fullWidth variant='standard' multiline required onChange={(evt) => {
                        setNewText(evt.target.value)
                    }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={() => {
                        editNote(number);
                        handleCloseEdit();
                    }}>Edit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}