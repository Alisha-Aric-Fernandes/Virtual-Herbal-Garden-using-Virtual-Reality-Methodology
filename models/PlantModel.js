import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
   botanicalName: { 
    type: String, 
    required: true }, 

  physicalDescription: { 
    type: String, 
    required: true }, 

  habitat: { 
    type: String, 
    required: true }, 

  medicinalUses: { 
    type: [String], 
    required: true }, 

  cultivationMethods: { 
    type: String, 
    required: true }, 

  chemicalComposition: { 
    type: [String], 
    required: true }, 

  pharmacologicalEffects: {
     type: [String], 
     required: true },

  clinicalStudies: {
     type: String },

  safetyPrecautions: { 
    type: String }, 

  sources: {
     type: [String] }, 
 
  
  
  threeDModel: { 
    url: { type: String, required: false },  // Store Cloudinary URL
    public_id: { type: String, required: false } // Store Cloudinary public_id for deletion
  },
  
      category: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Category", 
         required: true
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Plants", plantSchema);