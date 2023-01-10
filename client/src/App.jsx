import { useEffect, useState } from 'react';
import AddNote from './component/AddNote';
import DeleteNote from './component/DeleteNote';
import EditNote from './component/EditNote'
import './App.css';
import { API_URL } from './api/config';
import { useNavigate, useParams } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import Cookies from 'js-cookie';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false)
  const {userId} = useParams();
  const jwt = Cookies.get('jwt');
  const getNotes = async () => {
    if (!userId) return;
    setLoading(true)
    const response = await fetch(`${API_URL}/users/${userId}`, { method: 'GET'});
    const data = await response.json();
    setNotes(data.notes);
    setLoading(false)
  };
  const navigate = useNavigate();
  useEffect(() => {
    getNotes()
  }, [userId])

  if (jwt) {
    return(
      <div className='main-container'>
      {loading ? (
        <div>
          <p>Loading.....</p>
        </div>
      ):(
        <>
          <section className='header-container'>
            <h1>Notes</h1>
            <AddNote onNotesChange={setNotes} id={userId} onLoadingChange={setLoading} />
            <IconButton sx={{color:'white'}} onClick={(e)=>{
              navigate('/');
              Cookies.remove('jwt');
              }}>
              <LogoutIcon />
            </IconButton>
          </section>
          <section className='all-notes-container'>
            {notes.map((note, index) => (
              <div className='note-container' key={index}>
                <h3 className='note-title'>{note.title}</h3>
                <p className='note-text'>{note.text}</p>
                <section className='action-button'>
                  <EditNote note={note} id={userId} number={index} onNotesChange={setNotes}/>
                  <DeleteNote note={note} id={userId} number={index} onNotesChange={setNotes}/>
                </section>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
    )
  } else {
    return(
      <div className='not-loggedin-page-container'>
        <div className='not-loggedin-container'>
          <h2 className='not-logged-in-title'>Oops you're not logged in</h2>
          <p className='not-logged-in-text'>You need to login to access your notes</p>
          <button className='login-redirect-handler' onClick={(e)=>{navigate('/')}}>Login</button>
        </div>
      </div>
    )
  }
}

export default App;
