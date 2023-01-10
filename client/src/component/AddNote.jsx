import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField, IconButton } from '@mui/material';
import { API_URL } from '../api/config';

export default function AddNote({ onNotesChange, id, onLoadingChange, jwt }) {
    const [openAdd, setOpenAdd] = useState(false)
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const newNote = async () => {
        onLoadingChange(true);
        const requestOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, text: text }),
            headers:{'Authorization': `Bearer ${jwt}`},
            credentials:'include'
        };
        const response = await fetch(`${API_URL}/users/${id}/notes`, requestOption);
        const data = await response.json();
        onNotesChange(data.notes);
        onLoadingChange(false);
    };
    const handleOpen = () => {
        setOpenAdd(true);
    };
    const handleClose = () => {
        setOpenAdd(false);
    };
    return (
        <>
            <IconButton sx={{color: 'white'}} onClick={handleOpen}>
                <AddIcon  />
            </IconButton>
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