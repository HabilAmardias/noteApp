import { useEffect, useState } from 'react';
import AddNote from './component/AddNote';
import DeleteNote from './component/DeleteNote';
import EditNote from './component/EditNote'
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const response = await fetch('http://localhost:8888/', { method: 'GET' });
    const data = await response.json()
    setNotes(data)
  };
  useEffect(() => {
    getNotes()
  }, [])
  return (
    <div>
      <section>
        <h1>Notes</h1>
        <AddNote notes={notes} onNotesChange={setNotes} />
      </section>
      <section>
        {notes.map((note) => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <section>
              <DeleteNote note={note} notes={notes} onNotesChange={setNotes} />
              <EditNote note={note} notes={notes} onNotesChange={setNotes} />
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
