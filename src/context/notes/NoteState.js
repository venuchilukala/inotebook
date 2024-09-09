import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  //Get all Notes
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZDdkYmQ0Y2ViYWI3ZWFjOTU4NmRmIn0sImlhdCI6MTcyNTc5MTY3N30.W21jWwPncF4lech3X3QnyZtAcDiJcDKTmXQLyYZLRZc",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //TODO : API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZDdkYmQ0Y2ViYWI3ZWFjOTU4NmRmIn0sImlhdCI6MTcyNTc5MTY3N30.W21jWwPncF4lech3X3QnyZtAcDiJcDKTmXQLyYZLRZc",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("New note is added");
    let note = {
      _id: "66dd93f4a7676319f4cd6cf6",
      user: "66dd7dbd4cebab7eac9586df",
      title: title,
      description: description,
      tag: tag,
      date: "2024-09-08T12:09:24.340Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
    console.log(notes);
  };

  //Delete a Node
  const deleteNote = (id) => {
    //TODO : API call
    console.log("Deleting the node with iD: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkZDdkYmQ0Y2ViYWI3ZWFjOTU4NmRmIn0sImlhdCI6MTcyNTc5MTY3N30.W21jWwPncF4lech3X3QnyZtAcDiJcDKTmXQLyYZLRZc",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
