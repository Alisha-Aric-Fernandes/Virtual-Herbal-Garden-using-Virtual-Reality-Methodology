import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from 'axios';
import { Select } from 'antd';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate,useParams } from 'react-router-dom';

const { Option } = Select;

const UpdatePlant = () => {
  const navigate = useNavigate();
  const params=useParams();
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
  const[id,setId]=useState("");
   const [rootImage, setRootImage] = useState(null);
    const [leafImage, setLeafImage] = useState(null);
    const [stemImage, setStemImage] = useState(null);
    const [fruitImage, setFruitImage] = useState(null);

  const getSinglePlant = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/plant/get-plant/${params.slug}`
      );
      setName(data.plant.name);
      setId(data.plant._id);
      setBotanicalName(data.plant.botanicalName);
      setPhysicalDescription(data.plant.physicalDescription);
      
      setHabitat(data.plant.habitat);
      setMedicinalUses(data.plant.medicinalUses);
      setCultivationMethods(data.plant.cultivationMethods);
      setChemicalComposition(data.plant.chemicalComposition);
      setPharmacologicalEffects(data.plant.pharmacologicalEffects);
      setClinicalStudies(data.plant.clinicalStudies);
      setSafetyPrecautions(data.plant.safetyPrecautions);
      setSources(data.plant.sources);
      setCategory(data.plant.category);

       // Set the existing model URL if available
    
      setModelUrl(data.plant.threeDModel?.url || null);
      setRootImage(data.plant.rootImage?.url || null);
      setLeafImage(data.plant.leafImage?.url|| null);
      setStemImage(data.plant.stemImage?.url|| null);
      setFruitImage(data.plant.fruitImage?.url|| null);

      } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePlant();
    //eslint-disable-next-line
  }, []);
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

  // const handleImageChange = (event, setImage) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };
  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      if (file instanceof Blob) {
        setImage(file);
      } else {
        console.error("Invalid file type for image upload");
      }
    }
  };
  
  useEffect(() => {
    console.log("Root Image:", rootImage);
    console.log("Leaf Image:", leafImage);
    console.log("Stem Image:", stemImage);
    console.log("fruit Image:", fruitImage);
  }, [rootImage, leafImage, stemImage,fruitImage]);
  
  

  // CREATE PLANT
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("botanicalName", botanicalName);
      productData.append("physicalDescription", physicalDescription);
      productData.append("habitat", habitat);
      productData.append("medicinalUses", medicinalUses);
      productData.append("cultivationMethods", cultivationMethods);
      productData.append("chemicalComposition", chemicalComposition);
      productData.append("pharmacologicalEffects", pharmacologicalEffects);
      productData.append("clinicalStudies", clinicalStudies);
      productData.append("safetyPrecautions", safetyPrecautions);
      productData.append("sources", sources);
      // productData.append("threeDModel", threeDModel);
      productData.append("category", category?._id ? category._id : category);
      if (threeDModel) {
        productData.append("threeDModel", threeDModel);
      } else {
        productData.append("existingModelUrl", modelUrl); // Send existing model URL
      }


      if (rootImage) productData.append("rootImage", rootImage);
      if (leafImage) productData.append("leafImage", leafImage);
      if (stemImage) productData.append("stemImage", stemImage);
      if (fruitImage) productData.append("fruitImage", fruitImage);
      console.log("Category ID:", category);


      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/plant/update-plant/${id}`,
        productData
      );

      // if (data?.success) {
      //   toast.success(data?.message);
      //   getSinglePlant();
      //   navigate('/dashboard/admin/plants');
        
      // } else {
      //   toast.success("Plant Updated Successfully");
        
      // }

    if (data?.success) {
      toast.success(data?.message || "Plant Updated Successfully");
      setTimeout(() => navigate('/dashboard/admin/plants'), 1000); // Delay for better UX
    } else {
      toast.error("Update failed. Please try again.");
    }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle file upload and create a preview URL
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   // Check if the file is a supported 3D model format
  //   const allowedExtensions = [".glb", ".gltf"];
  //   const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

  //   if (!allowedExtensions.includes(fileExtension)) {
  //     toast.error("Invalid file type. Please upload a .glb or .gltf file.");
  //     return;
  //   }

  //   const fileUrl = URL.createObjectURL(file);
  //   setThreeDModel(file);
  //   setModelUrl(fileUrl); // Store Blob URL for preview
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    // Check if the file is a valid type (gltf or glb)
    const allowedExtensions = [".glb", ".gltf"];
    const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  
    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Invalid file type. Please upload a .glb or .gltf file.");
      return;
    }
  
    try {
      // Ensure that the file is of type Blob before creating an object URL
      if (file instanceof Blob) {
        const fileUrl = URL.createObjectURL(file);
        setThreeDModel(file);
        setModelUrl(fileUrl); // Store Blob URL for preview
      } else {
        console.error("Invalid file type for creating an Object URL");
      }
    } catch (error) {
      console.error("Error creating Object URL:", error);
    }
  };
  
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/plant/delete-plant/${id}`
      );
      toast.success("Plant Deleted Successfully");
      navigate("/dashboard/admin/plants");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Model"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Model</h1>
            <div className="m-1 w-75">
              
              {/* Category Selection */}
              <Select 
                bordered={false} 
                placeholder="Select a category" 
                size="large"
                showSearch 
                className="form-select mb-3" 
                onChange={(value) => setCategory(value)}
                value={category.name}
               

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

              {/* 3D Model Preview */}
              <div className="mb-3 d-flex justify-content-center">
                {modelUrl && (
                  <div 
                    style={{ 
                      width: "400px", 
                      height: "400px", 
                      backgroundColor:"gray", 
                      borderRadius: "10px", 
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
  <label className="btn btn-outline-secondary col-md-12">
    Upload Root Image
    <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, setRootImage)} />
  </label>
  {rootImage && (
  <img 
    src={typeof rootImage === 'string' ? rootImage : URL.createObjectURL(rootImage)} 
    alt="Root" 
    className="img-fluid mt-2" 
    style={{ maxHeight: "200px" }} 
  />
)}
</div>

<div className="mb-3">
  <label className="btn btn-outline-secondary col-md-12">
    Upload Leaf Image
    <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, setLeafImage)} />
  </label>
  {leafImage && (
  <img 
    src={typeof leafImage === 'string' ? leafImage : URL.createObjectURL(leafImage)} 
    alt="Leaf" 
    className="img-fluid mt-2" 
    style={{ maxHeight: "200px" }} 
  />
)}
</div>

<div className="mb-3">
  <label className="btn btn-outline-secondary col-md-12">
    Upload Stem Image
    <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, setStemImage)} />
  </label>
  {stemImage && (
  <img 
    src={typeof stemImage === 'string' ? stemImage : URL.createObjectURL(stemImage)} 
    alt="Stem" 
    className="img-fluid mt-2" 
    style={{ maxHeight: "200px" }} 
  />
)}
</div>
<div className="mb-3">
  <label className="btn btn-outline-secondary col-md-12">
    Upload Fruit Image
    <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, setFruitImage)} />
  </label>
  {fruitImage && (
  <img 
    src={typeof fruitImage === 'string' ? fruitImage : URL.createObjectURL(fruitImage)} 
    alt="Fruit" 
    className="img-fluid mt-2" 
    style={{ maxHeight: "200px" }} 
  />
)}
</div>


              {/* Input Fields */}
              {[
                { value: name, setter: setName, placeholder: "Write the name of the model" },
                { value: botanicalName, setter: setBotanicalName, placeholder: "Write its Botanical name" },
                { value: physicalDescription, setter: setPhysicalDescription, placeholder: "Write its physical description" },
                { value: habitat, setter: setHabitat, placeholder: "Write its habitat" },
                { value: medicinalUses, setter: setMedicinalUses, placeholder: "Write its medicinal uses" },
                { value: cultivationMethods, setter: setCultivationMethods, placeholder: "Write its cultivation methods" },
                { value: chemicalComposition, setter: setChemicalComposition, placeholder: "Write its chemical composition" },
                { value: pharmacologicalEffects, setter: setPharmacologicalEffects, placeholder: "Write its pharmacological effects" },
                { value: clinicalStudies, setter: setClinicalStudies, placeholder: "Write the clinical studies done on the plant" },
                { value: safetyPrecautions, setter: setSafetyPrecautions, placeholder: "Write its safety precautions while consuming" },
                { value: sources, setter: setSources, placeholder: "Write the sources of the plant" }
              ].map(({ value, setter, placeholder }, index) => (
                <div className="mb-3" key={index}>
                  <input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    className="form-control"
                    onChange={(e) => setter(e.target.value)}
                  />
                </div>
              ))}

              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PLANT
                </button>
              </div>

              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PLANT
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


// };

const Model = ({ modelUrl }) => {
  const validUrl = typeof modelUrl === "string" ? modelUrl : "/default-model.glb"; // Ensure a valid URL
  const { scene } = useGLTF(validUrl); // Hook must be called unconditionally

  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
};


export default UpdatePlant;

