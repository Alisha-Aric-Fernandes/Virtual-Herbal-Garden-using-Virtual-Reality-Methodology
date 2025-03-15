import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from 'axios';
import { Select } from 'antd';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreatePlant = () => {
  const navigate=useNavigate()
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [botanicalName, setBotanicalName] = useState("");
  const [physicalDescription, setPhysicalDescription] = useState("");
  const [habitat, setHabitat] = useState("");
  const [medicinalUses, setMedicinalUses] = useState("");
  const [cultivationMethods, setCultivationMethods] = useState("");
  const [chemicalComposition, setChemicalComposition] = useState("");
  const [pharmacologicalEffects, setPharmacologicalEffects] = useState("");
  const [clinicalStudies, setClinicalStudies] = useState("");
  const [safetyPrecautions, setSafetyPrecautions] = useState("");
  const [sources, setSources] = useState("");
  const [threeDModel, setThreeDModel] = useState(null);
  const [modelUrl, setModelUrl] = useState(null);
  const [category, setCategory] = useState("");

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  //CREATE PRODUCT
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("botanicalName", botanicalName);
      productData.append("physicalDescription",physicalDescription);
      productData.append("habitat", habitat);
      productData.append("medicinalUses", medicinalUses);
      productData.append("cultivationMethods", cultivationMethods);
      productData.append("chemicalComposition",chemicalComposition);
      productData.append("pharmacologicalEffects", pharmacologicalEffects);
      productData.append("clinicalStudies",clinicalStudies);
      productData.append("safetyPrecautions", safetyPrecautions);
      productData.append("sources", sources);
      productData.append("threeDModel", threeDModel);
      productData.append("category", category);
      // console.log("Sending request to:", `${process.env.REACT_APP_API}/api/v1/plant/create-plant`);
      const { data } =  await axios.post(
        `${process.env.REACT_APP_API}/api/v1/plant/create-plant`,
        productData
      );
  
  // if (data?.success) {
  //   toast.success(data?.message);
  //   navigate("/dashboard/admin/plants");
  // } else {
  //   toast.success("Plant Created Successfully");

  if (data?.success) {
    toast.success("Plant Created Successfully");
    navigate("/dashboard/admin/plants"); // Ensure navigation happens
  } else {
    toast.error(data?.message || "Failed to create plant");
  }
   
  
} catch (error) {
  console.log(error);
  toast.error("something went wrong");
}
};

  // Handle file upload and create a preview URL
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if the file is a supported 3D model format
    const allowedExtensions = [".glb", ".gltf"];
    const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Invalid file type. Please upload a .glb or .gltf file.");
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setThreeDModel(file);
    setModelUrl(fileUrl);  // Store Blob URL for preview
  };

  return (
    <Layout title={"Dashboard - Create Model"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Model</h1>
            <div className="m-1 w-75">
              
              {/* Category Selection */}
              <Select 
                bordered={false} 
                placeholder="Select a category" 
                size="large"
                showSearch 
                className="form-select mb-3" 
                onChange={(value) => setCategory(value)}
              >
                {categories?.map(c => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>

              {/* File Upload */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {threeDModel ? threeDModel.name : "Upload Model"}
                  <input 
                    type="file" 
                    name="model" 
                    accept=".glb,.gltf"  
                    onChange={handleFileChange} 
                    hidden
                  />
                </label>
              </div>

              {/* 3D Model Preview with Colored Box */}
              <div className="mb-3 d-flex justify-content-center">
                {modelUrl && (
                  <div 
                    style={{ 
                      width: "400px", 
                      height: "400px", 
                      backgroundColor: " light gray", // Light Gray Box
                      borderRadius: "10px", // Rounded corners
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px"
                    }}
                  >
                    <Canvas camera={{ position: [0, 0, 5] }}>
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[2, 2, 2]} />
                      <Model modelUrl={modelUrl} />
                      <OrbitControls />
                    </Canvas>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write the name of the model"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={botanicalName}
                  placeholder="write its Botanical name"
                  className="form-control"
                  onChange={(e) => setBotanicalName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={physicalDescription}
                  placeholder="write its physical description"
                  className="form-control"
                  onChange={(e) => setPhysicalDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={habitat}
                  placeholder="write its habitat "
                  className="form-control"
                  onChange={(e) => setHabitat(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={medicinalUses}
                  placeholder="write its medicinal uses "
                  className="form-control"
                  onChange={(e) => setMedicinalUses(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={cultivationMethods}
                  placeholder="write its cultivation methods"
                  className="form-control"
                  onChange={(e) => setCultivationMethods(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={chemicalComposition}
                  placeholder="write its chemical composition"
                  className="form-control"
                  onChange={(e) => setChemicalComposition(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={pharmacologicalEffects}
                  placeholder="write its pharmacological effects"
                  className="form-control"
                  onChange={(e) => setPharmacologicalEffects(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={clinicalStudies}
                  placeholder="write the clinical Studies done on the plant"
                  className="form-control"
                  onChange={(e) => setClinicalStudies(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={safetyPrecautions}
                  placeholder="write its safety Precautions while consuming"
                  className="form-control"
                  onChange={(e) => setSafetyPrecautions(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={sources}
                  placeholder="write the sources of the plant"
                  className="form-control"
                  onChange={(e) => setSources(e.target.value)}
                />
              </div>
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

// Component to Load and Display 3D Model
const Model = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
};

export default CreatePlant;


