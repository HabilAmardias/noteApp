import { useEffect, useState } from 'react';
import AddNote from './component/AddNote';
import DeleteNote from './component/DeleteNote';
import EditNote from './component/EditNote'
import './App.css';
import { API_URL } from './api/config';
import { useParams } from 'react-router-dom';

function App() {
  const [notes, setNotes] = useState([]);
  const {userId} = useParams();
  const getNotes = async () => {
    if (!userId) return;
    const response = await fetch(`${API_URL}/users/${userId}`, { method: 'GET' });
    const data = await response.json()
    setNotes(data.notes)
  };
  useEffect(() => {
    getNotes()
  }, [userId])
  return (
    <div className='main-container'>
      <section className='header-container'>
        <h1>Notes</h1>
        <AddNote onNotesChange={setNotes} id={userId} />
      </section>
      <section className='all-notes-container'>
        {notes.map((note, index) => (
          <div className='note-container' key={index}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <section className='action-button'>
              <EditNote note={note} id={userId} number={index} onNotesChange={setNotes} />
              <DeleteNote note={note} id={userId} number={index} onNotesChange={setNotes} />
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
