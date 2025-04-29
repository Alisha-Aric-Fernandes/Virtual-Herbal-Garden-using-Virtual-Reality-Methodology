import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true }, // ✅ Ensure title is required & trimmed
    content: { type: String, required: true, trim: true }, // ✅ Ensure content is required & trimmed
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // ✅ Reference to User model
}, { timestamps: true }); // ✅ Adds createdAt & updatedAt fields automatically

const Note = mongoose.model("Note", noteSchema);
export default Note;
