import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
export default function DeleteNote({ onNotesChange, notes, note }) {
    const [openEdit, setOpenEdit] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newText, setNewText] = useState('')
    const editNote = async (id) => {
        const requestOption = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, text: newText })
        };
        await fetch(`http://localhost:8888/${id}`, requestOption);
        const editedNotes = notes.map(note => {
            if (note._id === `${id}`) {
                return { ...note, title: newTitle, text: newText }
            }
            return note
        });
        onNotesChange(editedNotes)
    };
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    return (
        <>
            <EditIcon onClick={handleClickOpenEdit} />
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit note</DialogTitle>
                <DialogContent>
                    <TextField autoFocus type='text' id='standard-required' label='Note Title' defaultValue={note.title} fullWidth variant='standard' required onChange={(evt) => {
                        if (evt.target.value === null) {
                            setNewTitle(note.title)
                        } else {
                            setNewTitle(evt.target.value)
                        }
                    }} />
                    <TextField type='text' name='text' id='standard-required' label='Note Text' defaultValue={note.text} fullWidth variant='standard' multiline required onChange={(evt) => {
                        if (evt.target.value === null) {
                            setNewText(note.text)
                        } else {
                            setNewText(evt.target.value)
                        }
                    }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={() => {
                        editNote(note._id);
                        handleCloseEdit();
                    }}>Edit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}