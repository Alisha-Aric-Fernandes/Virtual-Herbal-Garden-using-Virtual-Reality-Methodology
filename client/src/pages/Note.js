

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaWhatsapp, FaEnvelope, FaInstagram, FaTwitter } from "react-icons/fa";
import "../styles/Note.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [shareMenu, setShareMenu] = useState(null);
  const shareMenuRef = useRef(null);

  useEffect(() => {
    const storedAuthData = localStorage.getItem("auth");
    if (storedAuthData) {
      setAuthData(JSON.parse(storedAuthData));
    }
  }, []);

  useEffect(() => {
    if (authData?.token) {
      fetchNotes();
    }
  }, [authData]);

  useEffect(() => {
    // Close share menu when clicking outside
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShareMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotes = async () => {
    try {
      const token = authData?.token;
      if (!token) {
        console.error("No token found! User needs to log in again.");
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/notes`, {
        headers: { Authorization: token },
      });

      setNotes(response.data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addOrUpdateNote = async () => {
    try {
      const token = authData?.token;
      if (!token) {
        console.error("No token found! Cannot save note.");
        return;
      }

      const noteData = { title, content };
      let response;

      if (editId) {
        response = await axios.put(
          `${process.env.REACT_APP_API}/api/v1/notes/${editId}`,
          noteData,
          { headers: { Authorization: token } }
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/notes`,
          noteData,
          { headers: { Authorization: token } }
        );
      }

      fetchNotes();
      setTitle("");
      setContent("");
      setEditId(null);
    } catch (error) {
      console.error("Error saving note:", error.response?.data || error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = authData?.token;
      if (!token) {
        console.error("No token found! User needs to log in again.");
        return;
      }

      await axios.delete(`${process.env.REACT_APP_API}/api/v1/notes/${id}`, {
        headers: { Authorization: token },
      });

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const toggleShareMenu = (noteId) => {
    setShareMenu(shareMenu === noteId ? null : noteId);
  };

  const getShareLinks = (note) => {
    const text = `📝 *${note.title}*\n${note.content}\n\nShared via Virtual Herbal Garden App`;
    const encodedText = encodeURIComponent(text);

    return {
      whatsapp: `https://web.whatsapp.com/send?text=${encodedText}`,
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${encodeURIComponent(note.title)}&body=${encodedText}`,
      instagram: `https://www.instagram.com/`, 
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    };
  };

  const startEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={addOrUpdateNote} className={editId ? "update-btn" : "add-btn"}>
        {editId ? "Update Note ✏️" : "Add Note ➕"}
      </button>
      <ul>
        {notes.map((note) => (
          <li key={note._id} className="note-item">
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <div className="button-group">
              <button onClick={() => startEdit(note)} className="edit-btn">
                Edit ✏️
              </button>
              <button onClick={() => deleteNote(note._id)} className="delete-btn">
                Delete 
              </button>
              <button onClick={() => toggleShareMenu(note._id)} className="share-btn">
              🔗Share
              </button>
            </div>

            {shareMenu === note._id && (
              <div ref={shareMenuRef} className="share-tab">
                <a href={getShareLinks(note).whatsapp} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp size={24} color="green" />
                </a>
                <a href={getShareLinks(note).gmail} target="_blank" rel="noopener noreferrer">
                  <FaEnvelope size={24} color="red" />
                </a>
                <a href={getShareLinks(note).instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} color="#E4405F" />
                </a>
                <a href={getShareLinks(note).twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={24} color="#1DA1F2" />
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
