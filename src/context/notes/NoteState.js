import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
const notesInitial = [
    {
      "_id": "66dd838a92e37b5f23a8da23",
      "user": "66dd7dbd4cebab7eac9586df",
      "title": "My Title",
      "description": "Good evening to everyone!",
      "tag": "Personal",
      "date": "2024-09-08T10:59:22.418Z",
      "__v": 0
    },
    {
      "_id": "66dd93f0a7676319f4cd6cf4",
      "user": "66dd7dbd4cebab7eac9586df",
      "title": "My Title2",
      "description": "Good Morning to everyone!",
      "tag": "Public",
      "date": "2024-09-08T12:09:20.399Z",
      "__v": 0
    },
    {
      "_id": "66dd93f4a7676319f4cd6cf6",
      "user": "66dd7dbd4cebab7eac9586df",
      "title": "My Title2",
      "description": "Good Morning to everyone!",
      "tag": "Public",
      "date": "2024-09-08T12:09:24.340Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(notesInitial);

  //Add a Note
  const addNote = (title, description, tag)=>{
    //TODO : API call 
    console.log("New note is added")
    let note = {
      "_id": "66dd93f4a7676319f4cd6cf6",
      "user": "66dd7dbd4cebab7eac9586df",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-09-08T12:09:24.340Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
    console.log(notes);
  }

  //Delete a Node
  const deleteNote = (id)=>{
    //TODO : API call 
    console.log("Deleting the node with iD: " + id);
    const newNotes = notes.filter((note)=>{return note._id !== id});
    setNotes(newNotes);
  }

  //Edit a Note
  const editNote = (id)=>{
    
  }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;