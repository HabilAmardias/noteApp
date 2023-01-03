import { useEffect, useState } from 'react';
import AddNote from './component/AddNote';
import DeleteNote from './component/DeleteNote';
import EditNote from './component/EditNote'
import './App.css';
import { API_URL } from './api/config';

function App() {
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const response = await fetch(`${API_URL}`, { method: 'GET' });
    const data = await response.json()
    setNotes(data)
  };
  useEffect(() => {
    getNotes()
  }, [])
  return (
    <div className='main-container'>
      <section className='header-container'>
        <h1>Notes</h1>
        <AddNote notes={notes} onNotesChange={setNotes} />
      </section>
      <section className='all-notes-container'>
        {notes.map((note) => (
          <div className='note-container' key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <section className='action-button'>
              <EditNote note={note} notes={notes} onNotesChange={setNotes} />
              <DeleteNote note={note} notes={notes} onNotesChange={setNotes} />
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
