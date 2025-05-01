// src/components/NoteList.js
import React from "react";

const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
    return (
        <Layout title={"Notes"}>
        <ul>
            {notes.map((note) => (
                <li key={note._id}>
                    <strong>{note.title}</strong>
                    <p>{note.content}</p>
                    <button onClick={() => onEditNote(note._id, prompt("Title:", note.title), prompt("Content:", note.content))}>Edit</button>
                    <button onClick={() => onDeleteNote(note._id)}>Delete</button>
                </li>
            ))}
        </ul></Layout>
    );
};

export default NoteList;
