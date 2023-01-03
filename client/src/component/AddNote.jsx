import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { API_URL } from '../api/config';

export default function AddNote({ notes, onNotesChange }) {
    const [openAdd, setOpenAdd] = useState(false)
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const newNote = async () => {
        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, text: text })
        };
        const response = await fetch(`${API_URL}`, requestOption);
        const data = await response.json()
        onNotesChange([...notes, data]);
    };
    const handleOpen = () => {
        setOpenAdd(true);
    };
    const handleClose = () => {
        setOpenAdd(false);
    };
    return (
        <>
            <AddIcon onClick={handleOpen} />
            <Dialog open={openAdd} onClose={handleClose}>
                <DialogTitle>Create new note</DialogTitle>
                <DialogContent>
                    <TextField autoFocus type='text' value={title} id='standard-required' label='Note Title' fullWidth variant='standard' required onChange={(evt) => {
                        setTitle(evt.target.value)
                    }} />
                    <TextField type='text' name='text' value={text} id='standard-required' label='Note Text' fullWidth variant='standard' multiline required onChange={(evt) => {
                        setText(evt.target.value)
                    }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        newNote();
                        handleClose();
                    }}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}