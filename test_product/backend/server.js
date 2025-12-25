const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}))


const MONGO_URI = 'mongodb://mongo-db:27017/notes';

mongoose.connect(MONGO_URI) 
.then(async () =>{
  console.log('MongoDB Connected');
  await Note.deleteMany({});
})
.catch(err => console.error('DB Connection Error:', err));

const NoteSchema = new mongoose.Schema({
  text:String,
  createdAt : {type : Date , default: Date.now}
});
const Note = mongoose.model('Note',NoteSchema);

app.get('/notes', async (req, res) => {
  const notes = await Note.find().sort({createdAt : -1});
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  console.log(req.headers['content-type']);
  console.log(req.body);
  if (!req.body || !req.body.text) {
    return res.status(400).json({ error: 'Text is required.' });
  }
  const newNote = new Note({ text: req.body.text });
  await newNote.save();
  res.json(newNote);
});

app.listen(5000, () => console.log('Server running on port 5000'));