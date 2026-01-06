import logo from './logo.svg';
import './App.css';
import React , { useState , useEffect } from 'react';
function App() {
  const [notes , setNotes ] = useState([]);
  const [input , setInput ] = useState('');
  useEffect(()=>{
    fetchNotes();
  },[]);
  const fetchNotes = async () => {
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/notes`);
      const data = await response.json();
      setNotes(data);
    }catch(err){
      console.log(err)
    }
  }
  const addNote = async () => {
    if(!input) return ;
    try{
      await fetch(`${process.env.REACT_APP_API_URL}/notes`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text : input})
      });
      setInput('');
      fetchNotes();
    }catch(err){
      console.log(err)
    }
  };
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>📝 Docker Notes App</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          style={{ padding: '10px', width: '200px' }}
        />
        <button onClick={addNote} style={{ padding: '10px', marginLeft: '5px' }}>
          เพิ่ม Note
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map((note) => (
          <li key={note._id} style={{ background: '#f0f0f0', margin: '5px 0', padding: '10px' }}>
            {note.text}
          </li>
        ))}
      </ul>
    </div>
    );
}

export default App;
