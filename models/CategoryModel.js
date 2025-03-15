import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  plants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Plants"  // ✅ Reference to the Plants model
  }]
});

export default mongoose.model("Category", categorySchema);