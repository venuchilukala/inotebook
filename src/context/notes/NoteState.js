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

  const [notes, setNotes] = useState(notesInitial)
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;