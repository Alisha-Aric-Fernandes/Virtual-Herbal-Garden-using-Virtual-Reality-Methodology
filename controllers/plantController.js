import slugify from "slugify";
import PlantModel from "../models/PlantModel.js";
import CategoryModel from "../models/CategoryModel.js"; // ✅ Import Category Model
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import fs from "fs";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables

// ✅ Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




export const createPlantController = async (req, res) => {
  try {
    const {
      name,
      botanicalName,
      physicalDescription,
      habitat,
      medicinalUses,
      cultivationMethods,
      chemicalComposition,
      pharmacologicalEffects,
      clinicalStudies,
      safetyPrecautions,
      sources,
      category,
    } = req.fields;
    const { threeDModel } = req.files;

    // ✅ Required field validation
    if (
      !name ||
      !botanicalName ||
      !physicalDescription ||
      !habitat ||
      !medicinalUses ||
      !cultivationMethods ||
      !chemicalComposition ||
      !pharmacologicalEffects ||
      !clinicalStudies ||
      !safetyPrecautions ||
      !sources ||
      !category
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // ✅ Check if Category Exists
    const categoryExists = await CategoryModel.findById(category);
    if (!categoryExists) {
      return res.status(400).send({ error: "Invalid Category ID" });
    }

    // ✅ Create New Plant
    const plant = new PlantModel({
      ...req.fields,
      slug: slugify(name),
    });

    // ✅ Upload 3D Model to Cloudinary
    if (threeDModel) {
      const result = await cloudinary.v2.uploader.upload(threeDModel.path, {
        
        resource_type: "raw",
        folder: "herbal-garden",
        timeout: 60000, // 60 seconds timeout
      });

      console.log("Cloudinary Upload Result:", result);
      // ✅ Store Cloudinary URL
      plant.threeDModel = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      fs.unlinkSync(threeDModel.path);
    }

    // ✅ Save Plant
    const savedPlant = await plant.save();

      // ✅ Remove temp file after upload
 

    // ✅ Add Plant to Category
    await CategoryModel.findByIdAndUpdate(
      category,
      { $push: { plants: savedPlant._id } }, // ✅ Add plant reference
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Plant Created Successfully and added to Category",
      plant: savedPlant,
    });
  } catch (error) {
    console.error("Error in creating Plant:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in creating Plant",
    });
  }
};

// ✅ Fetch All Plants with Category
// export const getPlantController = async (req, res) => {
//   try {
//     const plants = await PlantModel
//       .find({})
//       .populate("category") // ✅ Populate category details
//       .select("+threeDModel")
//       .limit(12)
//       .sort({ createdAt: -1 });

//     res.status(200).send({
//       success: true,
//       countTotal: plants.length,
//       message: "All Plants Fetched",
//       plants,
//     });
//   } catch (error) {
//     console.error("Error in fetching plants:", error);
//     res.status(500).send({
//       success: false,
//       message: "Error in getting plants",
//       error: error.message,
//     });
//   }
// };
export const getPlantController = async (req, res) => {
  try {
    const plants = await PlantModel
      .find({})
      .populate("category","_id name")
      .select("+threeDModel") // ✅ Allow fetching threeDModel
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: plants.length,
      message: "All Plants Fetched",
      plants,
    });
  } catch (error) {
    console.error("Error in fetching plants:", error);
    res.status(500).send({
      success: false,
      message: "Error in getting plants",
      error: error.message,
    });
  }
};


// // ✅ Fetch Single Plant with Category
// export const getSinglePlantController = async (req, res) => {
//   try {
//     const plant = await PlantModel
//       .findOne({ slug: req.params.slug })
//       .select("+threeDModel")
//       .populate("category"); // ✅ Populate category

//     if (!plant) {
//       return res.status(404).send({
//         success: false,
//         message: "Plant not found",
//       });
//     }

//     res.status(200).send({
//       success: true,
//       message: "Single Plant Fetched",
//       plant,
//     });
//   } catch (error) {
//     console.error("Error fetching single plant:", error);
//     res.status(500).send({
//       success: false,
//       message: "Error while getting single plant",
//       error: error.message,
//     });
//   }
// };
export const getSinglePlantController = async (req, res) => {
  try {
    const plant = await PlantModel
      .findOne({ slug: req.params.slug })
      .populate("category")
      .select("+threeDModel"); // ✅ Fetch threeDModel only for a single plant

    if (!plant) {
      return res.status(404).send({
        success: false,
        message: "Plant not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single Plant Fetched",
      plant,
    });
  } catch (error) {
    console.error("Error fetching single plant:", error);
    res.status(500).send({
      success: false,
      message: "Error while getting single plant",
      error: error.message,
    });
  }
};


// export const plantModelController = async (req, res) => {
//   try {
//     const plant = await PlantModel.findById(req.params.pid).select("threeDModel");
//     if (plant.threeDModel && plant.threeDModel.url) { 
//       return res.status(200).send({ url: plant.threeDModel.url });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr while getting threeDModel",
//       error,
//     });
//   }
// };

// export const plantModelController = async (req, res) => {
//   try {
//       const plant = await PlantModel.findById(req.params.pid);
//       if (!plant || !plant.model) {
//           return res.status(404).send({ message: "3D Model Not Found" });
//       }
//       res.sendFile(plant.model); // Ensure correct file path
//   } catch (error) {
//       res.status(500).send({ message: "Error fetching model" });
//   }
// };

// export const plantModelController = async (req, res) => {
//   try {
//     const plant = await PlantModel.findById(req.params.pid).select("threeDModel");

//     if (!plant) {
//       return res.status(404).json({
//         success: false,
//         message: "Plant not found",
//       });
//     }

//     if (!plant.threeDModel || !plant.threeDModel.url) {
//       return res.status(404).json({
//         success: false,
//         message: "3D model not available for this plant",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       url: plant.threeDModel.url,
//     });

//   } catch (error) {
//     console.error("Error while fetching 3D model:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error while getting threeDModel",
//       error: error.message,
//     });
//   }
// };


export const plantModelController = async (req, res) => {
  try {
    console.log("Fetching model for Plant ID:", req.params.pid);

    const plant = await PlantModel.findById(req.params.pid).select("threeDModel");
    
    if (!plant) {
      console.log("❌ Plant not found in DB");
      return res.status(404).send({ message: "Plant not found" });
    }

    console.log("✅ Plant Found:", plant);

    if (!plant.threeDModel || !plant.threeDModel.url) {
      console.log("❌ threeDModel is missing in plant data");
      return res.status(404).send({ message: "threeDModel not found" });
    }

    console.log("✅ Sending threeDModel URL:", plant.threeDModel.url);
    
    return res.status(200).send({ url: plant.threeDModel.url });

  } catch (error) {
    console.error("❌ Error fetching model:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching model",
      error: error.message,
    });
  }
};


//delete controller
// export const deletePlantController = async (req, res) => {
//   try {
//     await PlantModel.findByIdAndDelete(req.params.pid).select("-threeDModel");
//     res.status(200).send({
//       success: true,
//       message: "Plant Deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while deleting plant",
//       error,
//     });
//   }
// };
export const deletePlantController = async (req, res) => {
  try {
    // 1. Find the plant in MongoDB
    const plant = await PlantModel.findById(req.params.pid);
    if (!plant) {
      return res.status(404).json({ success: false, message: "Plant not found" });
    }

    // 2. Extract Cloudinary public ID
    if (plant.threeDModel?.url) {
      const urlParts = plant.threeDModel.url.split('/');
      const filenameWithExtension = urlParts.pop(); // Get last part of the URL
      const filename = filenameWithExtension.split('.')[0]; // Remove file extension
      const folderPath = urlParts.slice(7).join('/'); // Get Cloudinary folder structure
      const publicId = `${folderPath}/${filename}`; // Full path

      console.log("Deleting Cloudinary model:", publicId);

      // 3. Delete model from Cloudinary
      const result = await cloudinary.v2.uploader.destroy(publicId, { resource_type: "raw" });

      console.log("Cloudinary Deletion Result:", result);

      if (result.result !== "ok") {
        return res.status(500).json({ success: false, message: "Failed to delete model from Cloudinary" });
      }
    }

    // 4. Delete the plant from MongoDB
    await PlantModel.findByIdAndDelete(req.params.pid);

    res.status(200).json({ success: true, message: "Plant and associated 3D model deleted successfully" });

  } catch (error) {
    console.error("Error while deleting plant:", error);
    res.status(500).json({ success: false, message: "Error while deleting plant", error });
  }
};



// export const deletePlantController = async (req, res) => {
//   try {
//     // 1. Find the plant in the database
//     const plant = await PlantModel.findById(req.params.pid);
//     if (!plant) {
//       return res.status(404).send({
//         success: false,
//         message: "Plant not found",
//       });
//     }

//     // 2. Extract Cloudinary public ID from the stored URL
//     if (plant.threeDModel?.url) {
//       const publicId = plant.threeDModel.url.split('/').pop().split('.')[0]; // Extract public ID

//       // 3. Delete the model from Cloudinary
//       await cloudinary.v2.uploader.destroy(publicId, { resource_type: "raw" });
//     }

//     // 4. Delete the plant from MongoDB
//     await PlantModel.findByIdAndDelete(req.params.pid);

//     res.status(200).send({
//       success: true,
//       message: "Plant and associated 3D model deleted successfully",
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while deleting plant",
//       error,
//     });
//   }
// };



//update

// export const updatePlantController = async (req, res) => {
//   try {
//     const {
//       name,
//       botanicalName,
//       physicalDescription,
//       habitat,
//       medicinalUses,
//       cultivationMethods,
//       chemicalComposition,
//       pharmacologicalEffects,
//       clinicalStudies,
//       safetyPrecautions,
//       sources,
//       category,
//     } = req.fields;
//     const { threeDModel } = req.files;

//     // ✅ Required field validation
//     if (
//       !name ||
//       !botanicalName ||
//       !physicalDescription ||
//       !habitat ||
//       !medicinalUses ||
//       !cultivationMethods ||
//       !chemicalComposition ||
//       !pharmacologicalEffects ||
//       !clinicalStudies ||
//       !safetyPrecautions ||
//       !sources ||
//       !category
//     ) {
//       return res.status(400).send({ error: "All fields are required" });
//     }

//     // ✅ Check if Category Exists
//     const categoryExists = await CategoryModel.findById(category);
//     if (!categoryExists) {
//       return res.status(400).send({ error: "Invalid Category ID" });
//     }

//     // ✅ Create New Plant
//     const plant = await PlantModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})

//     // ✅ Upload 3D Model to Cloudinary
//     if (threeDModel) {
//       const result = await cloudinary.v2.uploader.upload(threeDModel.path, {
//         resource_type: "raw",
//         folder: "herbal-garden",
//         timeout: 60000, // 60 seconds timeout
//       });

//       // ✅ Store Cloudinary URL
//       plant.threeDModel = {
//         url: result.secure_url,
//         public_id: result.public_id,
//       };

//       // ✅ Remove temp file after upload
//       fs.unlinkSync(threeDModel.path);
//     }

//     // ✅ Save Plant
//     const savedPlant = await plant.save();

//     // ✅ Add Plant to Category
//     await CategoryModel.findByIdAndUpdate(
//       category,
//       { $addToSet: { plants: savedPlant._id } }, // ✅ Add plant reference
//       { new: true }
//     );

//     res.status(201).send({
//       success: true,
//       message: "Plant Updated Successfully and added to Category",
//       plant: savedPlant,
//     });
//   } catch (error) {
//     console.error("Error in updating Plant:", error);
//     res.status(500).send({
//       success: false,
//       error: error.message,
//       message: "Error in updating Plant",
//     });
//   }
// };

export const updatePlantController = async (req, res) => {
  try {
    const {
      name,
      botanicalName,
      physicalDescription,
      habitat,
      medicinalUses,
      cultivationMethods,
      chemicalComposition,
      pharmacologicalEffects,
      clinicalStudies,
      safetyPrecautions,
      sources,
      category,
    } = req.fields;
    const { threeDModel } = req.files;

    // ✅ Required field validation
    if (
      !name ||
      !botanicalName ||
      !physicalDescription ||
      !habitat ||
      !medicinalUses ||
      !cultivationMethods ||
      !chemicalComposition ||
      !pharmacologicalEffects ||
      !clinicalStudies ||
      !safetyPrecautions ||
      !sources ||
      !category
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // ✅ Check if Category Exists
    const categoryExists = await CategoryModel.findById(category);
    if (!categoryExists) {
      return res.status(400).send({ error: "Invalid Category ID" });
    }

    // ✅ Fetch Existing Plant Data
    const existingPlant = await PlantModel.findById(req.params.pid);
    if (!existingPlant) {
      return res.status(404).send({ error: "Plant not found" });
    }

    // ✅ Update Plant Fields (Without Touching 3D Model Yet)
    const updatedPlantData = { ...req.fields, slug: slugify(name) };

    // ✅ Upload New 3D Model to Cloudinary (If Provided)
    if (threeDModel) {
      const result = await cloudinary.v2.uploader.upload(threeDModel.path, {
        resource_type: "raw",
        folder: "herbal-garden",
        timeout: 60000, // 60 seconds timeout
      });

      // ✅ Remove Old Model from Cloudinary (If Exists)
      if (existingPlant.threeDModel?.public_id) {
        await cloudinary.v2.uploader.destroy(existingPlant.threeDModel.public_id, {
          resource_type: "raw",
        });
      }

      // ✅ Store New Model URL
      updatedPlantData.threeDModel = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      // ✅ Remove Temp File
      fs.unlinkSync(threeDModel.path);
    } else {
      // ✅ Preserve Existing Model If No New File is Uploaded
      updatedPlantData.threeDModel = existingPlant.threeDModel;
    }

    // ✅ Update Plant in Database
    const updatedPlant = await PlantModel.findByIdAndUpdate(req.params.pid, updatedPlantData, {
      new: true,
    });

    // ✅ Add Updated Plant to Category
    await CategoryModel.findByIdAndUpdate(
      category,
      { $addToSet: { plants: updatedPlant._id } },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Plant Updated Successfully",
      plant: updatedPlant,
    });
  } catch (error) {
    console.error("Error in updating Plant:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in updating Plant",
    });
  }
};



// filters
export const plantFiltersController = async (req, res) => {
  try {
    const { checked } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    
    const plants = await PlantModel.find(args);
    res.status(200).send({
      success: true,
      plants,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Plants",
      error,
    });
  }
};

export const plantCountController = async (req, res) => {
  try {
    const total = await PlantModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};


export const plantListController = async (req, res) => {
  try {
    const perPage =6 ;
    const page = req.params.page ? req.params.page : 1;
    const plants = await PlantModel
      .find({})
      
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      plants,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};


// search product
export const searchPlantController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await PlantModel
      .find({
        $or: [
          {name: { $regex: keyword, $options: "i" }},
          {botanicalName: { $regex: keyword, $options: "i" } },

          { physicalDescription: { $regex: keyword, $options: "i" } },
          { medicinalUses: { $regex: keyword, $options: "i" } },
          { cultivationMethods: { $regex: keyword, $options: "i" } },
          { chemicalComposition: { $regex: keyword, $options: "i" } },
          {pharmacologicalEffects: { $regex: keyword, $options: "i" } },
        ],
      })
      
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};


// export const relatedPlantController = async (req, res) => {
//   try {
//     const { pid, cid } = req.params;
//     const plants = await PlantModel
//       .find({
//         category: new mongoose.Types.ObjectId(cid), 
//         _id: { $ne: new mongoose.Types.ObjectId(pid)},
//       })
//       .select("-threeDModel")
//       .limit(3)
//       .populate("category");
//     res.status(200).send({
//       success: true,
//       plants,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "error while geting related product",
//       error,
//     });
//   }
// };


// export const relatedPlantController = async (req, res) => {
//   try {
//     const { pid, cid } = req.params;

//     console.log("🔍 Fetching related plants for:");
//     console.log("  🆔 Plant ID:", pid);
//     console.log("  📂 Category ID:", cid);

//     const plants = await PlantModel.find({
//       category: new mongoose.Types.ObjectId(cid), // Ensure it's ObjectId
//       _id: { $ne: new mongoose.Types.ObjectId(pid) }, // Exclude the current plant
//     })
//       .select("-threeDModel")
//       .limit(3)
//       .populate("category");

//     console.log("✅ Related Plants Found:", plants.length, "plants");

//     res.status(200).send({
//       success: true,
//       plants,
//     });
//   } catch (error) {
//     console.log("❌ Error fetching related plants:", error);
//     res.status(400).send({
//       success: false,
//       message: "Error while getting related plants",
//       error,
//     });
//   }
// };


export const relatedPlantController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    console.log(`🔍 Fetching related plants for category: ${cid}, excluding plant ID: ${pid}`);

    const plants = await PlantModel.find({
      category: cid,
      _id: { $ne: pid }, // Exclude the current plant
    })
      // .select("-threeDModel")
      .limit(3)
      .populate("category");

    console.log(`✅ Related Plants Found: ${plants.length}`);
    console.log("🪴 Related Plants:", plants);

    res.status(200).send({
      success: true,
      plants,
    });
  } catch (error) {
    console.log("❌ Error fetching related plants:", error);
    res.status(400).send({
      success: false,
      message: "Error while getting related plants",
      error,
    });
  }
};


export const plantCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const plants = await PlantModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      plants,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting plants",
    });
  }
};