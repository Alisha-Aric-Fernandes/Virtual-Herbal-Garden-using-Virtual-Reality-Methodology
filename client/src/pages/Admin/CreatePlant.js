import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreatePlant = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    botanicalName: "",
    physicalDescription: "",
    habitat: "",
    medicinalUses: "",
    cultivationMethods: "",
    chemicalComposition: "",
    pharmacologicalEffects: "",
    clinicalStudies: "",
    safetyPrecautions: "",
    sources: "",
    category: "",
  });

  const [threeDModel, setThreeDModel] = useState(null);
  const [rootImage, setRootImage] = useState(null);
  const [leafImage, setLeafImage] = useState(null);
  const [stemImage, setStemImage] = useState(null);
  const [fruitImage, setFruitImage] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle text input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    if (type === "model") {
      const allowedExtensions = [".glb", ".gltf"];
      const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("Invalid file type. Please upload a .glb or .gltf file.");
        return;
      }
      setModelUrl(URL.createObjectURL(file));
      setThreeDModel(file);
    } else if (type === "root") {
      setRootImage(file);
    } else if (type === "leaf") {
      setLeafImage(file);
    } else if (type === "stem") {
      setStemImage(file);
    }else if (type === "fruit") {
      setFruitImage(file);
    }
  };

  // Handle form submission
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const plantData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        plantData.append(key, value);
      });

      plantData.append("threeDModel", threeDModel);
      plantData.append("rootImage", rootImage);
      plantData.append("leafImage", leafImage);
      plantData.append("stemImage", stemImage);
      plantData.append("fruitImage", fruitImage);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/plant/create-plant`,
        plantData
      );

      if (data?.success) {
        toast.success("Plant Created Successfully");
        navigate("/dashboard/admin/plants");
      } else {
        toast.error(data?.message || "Failed to create plant");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Plant"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Plant</h1>
            <div className="m-1 w-75">
              {/* Select Category */}
              <Select
                placeholder="Select a category"
                size="large"
                className="form-select mb-3"
                onChange={(value) => setFormData({ ...formData, category: value })}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* File Upload Inputs */}
              {[
                { type: "model", label: " upload 3D Model" },
                { type: "root", label: "upload Root Image" },
                { type: "leaf", label: "upload Leaf Image" },
                { type: "stem", label: "upload Stem Image" },
                { type: "fruit", label: "upload Fruit Image" },
              ].map(({ type, label }) => (
                <div key={type} className="mb-3">
                  
                  <label className="btn btn-outline-secondary col-md-12 d-flex align-items-center justify-content-between">
  {type === "model" && threeDModel
    ? threeDModel.name
    : type === "root" && rootImage
    ? rootImage.name
    : type === "leaf" && leafImage
    ? leafImage.name
    : type === "stem" && stemImage
    ? stemImage.name
    : type === "fruit" && fruitImage
    ? fruitImage.name
    : label}
  <input
    type="file"
    accept={type === "model" ? ".glb,.gltf" : "image/*"}
    onChange={(e) => handleFileChange(e, type)}
    hidden
  />
</label>


                  {/* Show Image Preview for images */}
                  {type !== "model" && eval(type + "Image") && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(eval(type + "Image"))}
                        alt={type}
                        className="img-thumbnail"
                        style={{ maxWidth: "150px", height: "auto" }}
                      />
                    </div>
                  )}

                  {/* Show 3D Model Preview IMMEDIATELY after selecting the file */}
                  {type === "model" && modelUrl && (
                    <div className="mt-2 d-flex justify-content-center">
                      <Canvas camera={{ position: [0, 0, 5] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[2, 2, 2]} />
                        <Model modelUrl={modelUrl} />
                        <OrbitControls />
                      </Canvas>
                    </div>
                  )}
                </div>
              ))}

              {/* Form Fields */}
              {Object.keys(formData)
                .filter((key) => key !== "category") // Remove category from input fields
                .map((key) => (
                  <div key={key} className="mb-3">
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      placeholder={`Write the ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                ))}

              {/* Submit Button */}
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PLANT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Component for Rendering 3D Models
const Model = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
};

export default CreatePlant;
