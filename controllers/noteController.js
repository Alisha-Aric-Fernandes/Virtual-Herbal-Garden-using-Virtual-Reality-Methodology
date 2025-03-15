

import Note from "../models/noteModel.js";

// ✅ Fetch notes for the logged-in user only
export const getNotes = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized: Please log in" });

        const notes = await Note.find({ userId: req.user._id });  // ✅ Fix: use req.user._id
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Create a new note
export const createNote = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized: Please log in" });

        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required!" });
        }

        const newNote = await Note.create({
            title,
            content,
            userId: req.user._id,  // ✅ Fix: use req.user._id
        });

        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error creating note:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// ✅ Update a note (only if it belongs to the logged-in user)
export const updateNote = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized: Please log in" });

        const { title, content } = req.body;
        const { id } = req.params;

        const note = await Note.findOne({ _id: id, userId: req.user._id });  // ✅ Fix: use req.user._id
        if (!note) return res.status(404).json({ message: "Note not found" });

        note.title = title;
        note.content = content;
        await note.save();

        res.json(note);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Delete a note (only if it belongs to the logged-in user)
export const deleteNote = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized: Please log in" });

        const { id } = req.params;
        const note = await Note.findOneAndDelete({ _id: id, userId: req.user._id });  // ✅ Fix: use req.user._id

        if (!note) return res.status(404).json({ message: "Note not found" });

        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
