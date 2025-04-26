// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// //import "../styles/PlantDetailsStyle.css";
// import { Link } from "react-router-dom";
// import { useBookmark } from "../context/bookmark";
// import toast from "react-hot-toast";

// import { useAuth } from '../context/auth';

// const PlantDetails = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [plant, setPlant] = useState({});
//   const [relatedPlants, setRelatedPlants] = useState([]);
//   const [bookmark,setBookmark]=useBookmark();
//    const [auth]=useAuth()

//   //initalp details
//   useEffect(() => {
//     if (params?.slug) getPlant();
//   }, [params?.slug]);
//   //getProduct
//   const getPlant = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/plant/get-plant/${params.slug}`
//       );
//       setPlant(data?.plant);
//       console.log("Plant ID:", data?.plant?._id);
//       console.log("Category ID:", data?.plant?.category?._id);
//       getSimilarPlant(data?.plant._id, data?.plant.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  
  
//   const getSimilarPlant = async (pid, cid) => {
//     try {
//       console.log(`Fetching similar plants for PID: ${pid}, CID: ${cid}`);
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/plant/related-plant/${pid}/${cid}`
//       );
//       console.log("API Response for Similar Plants:", data);
//       setRelatedPlants(data?.plants || []);
//     } catch (error) {
//       console.log("Error fetching similar plants:", error);
//     }
//   };
  
//   return (
//     <Layout>
//       <div className="row container product-details">
//         <div className="col-md-6">
//         {plant.threeDModel?.url ? (
//                         <model-viewer
//                           src={plant.threeDModel.url}
//                           alt={`3D model of ${plant.name}`}
//                           auto-rotate
//                           camera-controls
//                           style={{ width: "100%", height: "300px",marginTop: "100px",
//                             border: "2px solid #ddd", // Border around the model
//     borderRadius: "8px",      // Optional: rounded corners
//     padding: "10px",          // Optional: padding inside the border
//     backgroundColor: "#f9f9f9", // Optional: background color inside the border
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                           }}
//                           onError={(e) => console.error("Model failed to load:", e)}
//                         ></model-viewer>
//                       ) : (
//                         <div className="text-center p-3">
//                           <p className="text-muted">No 3D model available</p>
//                         </div>
//                       )}
//         </div>
//           <div className="plant-images mt-4">
//            {plant.rootImage?.url && (
//               <div className="image-container">
//                 <h6 className="text-center">Root</h6>
//                 <img
//                   src={plant.rootImage.url}
//                   alt="Root"
//                   className="plant-image"
//                 />
//               </div>
//             )}

//             {plant.leafImage?.url && (
//               <div className="image-container">
//                 <h6 className="text-center">Leaf</h6>
//                 <img
//                   src={plant.leafImage.url}
//                   alt="Leaf"
//                   className="plant-image"
//                 />
//               </div>
//             )}

//             {plant.stemImage?.url && (
//               <div className="image-container">
//                 <h6 className="text-center">Stem</h6>
//                 <img
//                   src={plant.stemImage.url}
//                   alt="Stem"
//                   className="plant-image"
//                 />
//               </div>
//             )}

//             {plant.fruitImage?.url && (
//               <div className="image-container">
//                 <h6 className="text-center">Fruit</h6>
//                 <img
//                   src={plant.fruitImage.url}
//                   alt="Fruit"
//                   className="plant-image"
//                 />
//               </div>
//             )}
//           </div>
        
        
//         <div className="col-md-6 product-details-info">
//           <h1 className="text-center">Plant Details</h1>
//           <hr />
         
//           <div>
//   <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Name:</span> {plant.name}</h6>
//   <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Botanical Name:</span> {plant.botanicalName}</h6>
//   <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Description:</span> {plant.physicalDescription}</h6>
//   <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Habitat:</span> {plant.habitat}</h6>
//   <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Medicinal Uses:</span> {plant.medicinalUses}</h6>
//   <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Cultivation Methods:</span> {plant.cultivationMethods}</h6>
//   <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Chemical Composition:</span> {plant.chemicalComposition}</h6>
//   <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Pharmacological Effects:</span> {plant.pharmacologicalEffects}</h6>
//   <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Clinical Studies:</span> {plant.clinicalStudies}</h6>
//   <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Safety Precautions:</span> {plant.safetyPrecautions}</h6>
//   <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Sources:</span> {plant.sources}</h6>
//   <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Category:</span> {plant?.category?.name}</h6>
// </div>

//           {/* <button className="btn btn-dark ms-1"
//           onClick={(e) => {
//             e.stopPropagation(); // Stops the click event from bubbling to the Link
//             e.preventDefault(); 
//             setBookmark([...bookmark, plant]);
//             localStorage.setItem(
//               "bookmark",
//               JSON.stringify([...bookmark, plant])
//             );
//             toast.success("Plant is Bookmarked");
//           }}>BOOKMARK</button> */}
//           <button
//                             className="btn btn-dark ms-1"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               e.preventDefault();
                          
//                               if (!auth?.user) {
//                                 toast.error("Please login to add bookmarks.");
//                                 navigate("/login");
//                                 return;
//                               }
                          
//                               setBookmark((prevBookmarks) => {
//                                 // Check if the plant is already bookmarked
//                                 const isBookmarked = prevBookmarks.some((item) => item._id === plant._id);
//                                 if (isBookmarked) {
//                                   toast.error("This plant is already bookmarked."); // Changed from toast.info() to toast.warning()
//                                   return prevBookmarks; // Prevents duplicate addition
//                                 }
                          
//                                 const updatedBookmarks = [...prevBookmarks, plant];
//                                 localStorage.setItem(`bookmark_${auth.user._id}`, JSON.stringify(updatedBookmarks));
//                                 toast.success("Plant is Bookmarked");
//                                 return updatedBookmarks;
//                               });
//                             }}
//                           >
//                             BOOKMARK
//                           </button>
//         </div>
//       </div>
//       <hr />
//       <div className="row container similar-plants">
//         <h4>Similar Plants ➡️</h4>
//         {relatedPlants.length < 1 && (
//           <p className="text-center">No Similar Plants found</p>
//         )}
//         <div className="row row-cols-1 row-cols-md-3 g-4">
//                         {relatedPlants.map((plant) => (
//                           <div key={plant._id} className="col d-flex justify-content-center mb-4">
//                             <Link
//                               to={`/plant/${plant.slug}`}
//                               className="plant-link"
//                             >
//                               <div className="card" style={{  width: "100%", maxWidth: "18rem", margin: "auto"}}>
//                                 {plant.threeDModel?.url ? (
//                                   <model-viewer
//                                     src={plant.threeDModel.url}
//                                     alt={`3D model of ${plant.name}`}
//                                     auto-rotate
//                                     camera-controls
//                                     style={{ width: "100%", height: "200px" }}
//                                     onError={(e) =>
//                                       console.error("Model failed to load:", e)
//                                     }
//                                   ></model-viewer>
//                                 ) : (
//                                   <div className="text-center p-3">
//                                     <p className="text-muted">No 3D model available</p>
//                                   </div>
//                                 )}
        
//                                 <div className="card-body text-center">
//                                   <h5 className="card-title">{plant.name}</h5>
//                                   <p className="card-text">
//                                     {plant.physicalDescription || "No description available"}
//                                   </p>
//                                   <button className="btn btn-primary ms-1" onClick={()=>navigate(`/plant/${plant.slug}`)}>
//                             More Details
//                           </button>
                       
//                           {/* <button className="btn btn-dark ms-1"
//                             onClick={(e) => {
//                                                   e.stopPropagation(); // Stops the click event from bubbling to the Link
//                                                   e.preventDefault(); 
//                                                   setBookmark([...bookmark, plant]);
//                                                   localStorage.setItem(
//                                                     "bookmark",
//                                                     JSON.stringify([...bookmark, plant])
//                                                   );
//                                                   toast.success("Plant is Bookmarked");
                                                  
//                                                 }}>
//                             Bookmark
//                           </button> */}

//                           <button
//                             className="btn btn-dark ms-1"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               e.preventDefault();
                          
//                               if (!auth?.user) {
//                                 toast.error("Please login to add bookmarks.");
//                                 navigate("/login");
//                                 return;
//                               }
                          
//                               setBookmark((prevBookmarks) => {
//                                 // Check if the plant is already bookmarked
//                                 const isBookmarked = prevBookmarks.some((item) => item._id === plant._id);
//                                 if (isBookmarked) {
//                                   toast.error("This plant is already bookmarked."); // Changed from toast.info() to toast.warning()
//                                   return prevBookmarks; // Prevents duplicate addition
//                                 }
                          
//                                 const updatedBookmarks = [...prevBookmarks, plant];
//                                 localStorage.setItem(`bookmark_${auth.user._id}`, JSON.stringify(updatedBookmarks));
//                                 toast.success("Plant is Bookmarked");
//                                 return updatedBookmarks;
//                               });
//                             }}
//                           >
//                             BOOKMARK
//                           </button>
                               
//                                 </div>
//                               </div>
//                             </Link>
//                           </div>
//                         ))}
//                       </div>
//       </div>
//             <style>
//          {`
//            .plant-images {
//             display: flex;
//             flex-wrap: wrap;
//              justify-content: center;
//             gap: 10px;
//           }
//           .image-container {
//             text-align: center;
//             max-width: 150px;
//           }
//           .plant-image {
//             width: 100%;
//              height: auto;
//            border-radius: 8px;
//              border: 2px solid #ddd;
//             padding: 5px;
//              background-color: #f9f9f9;
//              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//            }
//        `}
//       </style>
//     </Layout>
//   );
// };

// export default PlantDetails;




// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useBookmark } from "../context/bookmark";
// import toast from "react-hot-toast";
// import { useAuth } from '../context/auth';

// const PlantDetails = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [plant, setPlant] = useState({});
//   const [relatedPlants, setRelatedPlants] = useState([]);
//   const [bookmark, setBookmark] = useBookmark();
//   const [auth] = useAuth();
//   const [selectedImage, setSelectedImage] = useState(null);


//   useEffect(() => {
//     if (params?.slug) getPlant();
//   }, [params?.slug]);

//   const getPlant = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/plant/get-plant/${params.slug}`
//       );
//       setPlant(data?.plant);
//       getSimilarPlant(data?.plant._id, data?.plant.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getSimilarPlant = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/plant/related-plant/${pid}/${cid}`
//       );
//       setRelatedPlants(data?.plants || []);
//     } catch (error) {
//       console.log("Error fetching similar plants:", error);
//     }
//   };
//  // Function to open the modal with the clicked image
//  const openImageModal = (imageUrl) => {
//   setSelectedImage(imageUrl);
// };

// // Function to close the modal
// const closeModal = () => {
//   setSelectedImage(null);
// };
  

//   return (
//     <Layout>
//       <div className="container plant-details-page">
//         {/* Top Section */}
//         <div className="row">
//           {/* Left Column - 3D Model */}
//           <div className="col-md-6 text-center">
//             {plant.threeDModel?.url ? (
//               <model-viewer
//                 src={plant.threeDModel.url}
//                 alt={`3D model of ${plant.name}`}
//                 auto-rotate
//                 camera-controls
//                 style={{
//                   width: "100%",
//                   height: "350px",
//                   borderRadius: "8px",
//                   border: "2px solid #ddd",
//                   padding: "10px",
//                   backgroundColor: "#f9f9f9",
//                   marginBottom: "20px",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
//                 }}
//                 onError={(e) => console.error("Model failed to load:", e)}
//               ></model-viewer>
//             ) : (
//               <div className="text-center p-3">
//                 <p className="text-muted">No 3D model available</p>
//               </div>
//             )}
//              <button className="btn btn-dark mt-3"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 e.preventDefault();
//                 if (!auth?.user) {
//                   toast.error("Please login to add bookmarks.");
//                   navigate("/login");
//                   return;
//                 }
//                 setBookmark((prevBookmarks) => {
//                   const isBookmarked = prevBookmarks.some((item) => item._id === plant._id);
//                   if (isBookmarked) {
//                     toast.error("This plant is already bookmarked.");
//                     return prevBookmarks;
//                   }
//                   const updatedBookmarks = [...prevBookmarks, plant];
//                   localStorage.setItem(`bookmark_${auth.user._id}`, JSON.stringify(updatedBookmarks));
//                   toast.success("Plant is Bookmarked");
//                   return updatedBookmarks;
//                 });
//               }}>
//               BOOKMARK
//             </button>
//           </div>

//           {/* Right Column - Plant Details */}
//           <div className="col-md-6">
//             <h1 className="text-center">Plant Details</h1>
//             <hr />
//             <div className="plant-info">
//               <h6><strong>Name:</strong> {plant.name}</h6>
//               <h6><strong>Botanical Name:</strong> {plant.botanicalName}</h6>
//               <h6><strong>Description:</strong> {plant.physicalDescription}</h6>
//               <h6><strong>Habitat:</strong> {plant.habitat}</h6>
//               <h6><strong>Medicinal Uses:</strong> {plant.medicinalUses}</h6>
//               <h6><strong>Cultivation Methods:</strong> {plant.cultivationMethods}</h6>
//               <h6><strong>Chemical Composition:</strong> {plant.chemicalComposition}</h6>
//               <h6><strong>Pharmacological Effects:</strong> {plant.pharmacologicalEffects}</h6>
//               <h6><strong>Clinical Studies:</strong> {plant.clinicalStudies}</h6>
//               <h6><strong>Safety Precautions:</strong> {plant.safetyPrecautions}</h6>
//               <h6><strong>Sources:</strong> {plant.sources}</h6>
//               <h6><strong>Category:</strong> {plant?.category?.name}</h6>
//             </div>

           
//           </div>
//         </div>


//       {/* Modal Popup */}
//       {selectedImage && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <span className="close-btn" onClick={closeModal}>&times;</span>
//             <img src={selectedImage} alt="Large Plant" className="modal-image" />
//           </div>
//         </div>
//       )}
// <div className="plant-images mt-4">
//         {plant.rootImage?.url && (
//           <div className="plant-image-container">
//             <p className="plant-image-label">Root</p>
//             <img
//               src={plant.rootImage.url}
//               alt="Root"
//               className="plant-image"
//               onClick={() => openImageModal(plant.rootImage.url)}
//               style={{ cursor: "pointer" }}
//             />
//           </div>
//         )}
//         {plant.leafImage?.url && (
//           <div className="plant-image-container">
//             <p className="plant-image-label">Leaf</p>
//             <img
//               src={plant.leafImage.url}
//               alt="Leaf"
//               className="plant-image"
//               onClick={() => openImageModal(plant.leafImage.url)}
//               style={{ cursor: "pointer" }}
//             />
//           </div>
//         )}
//         {plant.stemImage?.url && (
//           <div className="plant-image-container">
//             <p className="plant-image-label">Stem</p>
//             <img
//               src={plant.stemImage.url}
//               alt="Stem"
//               className="plant-image"
//               onClick={() => openImageModal(plant.stemImage.url)}
//               style={{ cursor: "pointer" }}
//             />
//           </div>
//         )}
//         {plant.fruitImage?.url && (
//           <div className="plant-image-container">
//             <p className="plant-image-label">Fruit</p>
//             <img
//               src={plant.fruitImage.url}
//               alt="Fruit"
//               className="plant-image"
//               onClick={() => openImageModal(plant.fruitImage.url)}
//               style={{ cursor: "pointer" }}
//             />
//           </div>
//         )}
//       </div>

     
//         {/* Similar Plants */}
//         <hr />
//         <div className="similar-plants">
//           <h4>Similar Plants ➡️</h4>
//           {relatedPlants.length < 1 && <p className="text-center">No Similar Plants found</p>}
//           <div className="row row-cols-1 row-cols-md-3 g-4">
//             {relatedPlants.map((plant) => (
//               <div key={plant._id} className="col">
//                 <Link to={`/plant/${plant.slug}`} className="plant-link">
//                   <div className="card">
//                     {plant.threeDModel?.url ? (
//                       <model-viewer
//                         src={plant.threeDModel.url}
//                         alt={`3D model of ${plant.name}`}
//                         auto-rotate
//                         camera-controls
//                         style={{ width: "100%", height: "200px" }}
//                       ></model-viewer>
//                     ) : (
//                       <div className="text-center p-3">
//                         <p className="text-muted">No 3D model available</p>
//                       </div>
//                     )}
//                     <div className="card-body text-center">
//                       <h5 className="card-title">{plant.name}</h5>
//                       <p className="card-text">{plant.physicalDescription || "No description available"}</p>
//                       <button className="btn btn-primary" onClick={() => navigate(`/plant/${plant.slug}`)}>More Details</button>
//                       <button
//                         className="btn btn-dark ms-1"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           e.preventDefault();
                      
//                           if (!auth?.user) {
//                             toast.error("Please login to add bookmarks.");
//                             navigate("/login");
//                             return;
//                           }
                      
//                           setBookmark((prevBookmarks) => {
//                             // Check if the plant is already bookmarked
//                             const isBookmarked = prevBookmarks.some((item) => item._id === plant._id);
//                             if (isBookmarked) {
//                               toast.error("This plant is already bookmarked."); // Changed from toast.info() to toast.warning()
//                               return prevBookmarks; // Prevents duplicate addition
//                             }
                      
//                             const updatedBookmarks = [...prevBookmarks, plant];
//                             localStorage.setItem(`bookmark_${auth.user._id}`, JSON.stringify(updatedBookmarks));
//                             toast.success("Plant is Bookmarked");
//                             return updatedBookmarks;
//                           });
//                         }}
//                       >
//                         BOOKMARK
//                       </button>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>
//   {`
//     .plant-details-page { max-width: 1000px; margin: auto; }
    
//     .plant-images { 
//       display: flex; 
//       justify-content: center; 
//       gap: 20px; 
//       flex-wrap: wrap; 
//     }
    
//     .plant-image-container { 
//       position: relative; 
//       display: flex; 
//       flex-direction: column; 
//       align-items: center;
//     }
    
//     .plant-image-label { 
//       position: absolute;
//       top: 8px; /* Adjust position slightly from top */
//       left: 50%;
//       transform: translateX(-50%);
//       font-weight: bold; 
//       font-size: 16px; 
//       text-align: center; 
//       color: white; /* Text color */
//       background-color: rgba(0, 0, 0, 0.6); /* Dark background for visibility */
//       padding: 5px 10px;
//       border-radius: 5px;
//       width: max-content;
//     }
    
 
    
//     .plant-info h6 strong { color: green; } /* Makes details titles green */
//     .col-md-6.text-center{
//     margin-top:70px;}

//     .similar-plants{
//     margin-bottom:30px;}
//     .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0, 0, 0, 0.7);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }
        
//         .modal-content {
//           position: relative;
//           background: white;
//           padding: 15px;
//           border-radius: 10px;
//           box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
      
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           max-width: 60vw;  /* Ensures it doesn’t exceed the viewport width */
//   max-height: 60vh;overflow: hidden;
//         }

//         .modal-image {
//           max-width: 60%;
//           max-height: 60%;
//           border-radius: 8px;
//           object-fit: contain; 
//         }

//         .close-btn {
//           position: absolute;
//           top: 10px;
//           right: 15px;
//           font-size: 24px;
//           font-weight: bold;
//           cursor: pointer;
//           color: black;
//         }
        
//         .plant-image {
//           width: 180px;
//           height: 180px;
//           object-fit: cover;
//           border-radius: 8px;
//           border: 2px solid #ddd;
//           padding: 5px;
//           background-color: #f9f9f9;
//           transition: transform 0.2s;
//         }
        
//         .plant-image:hover {
//           transform: scale(1.1);
//         }

//   `}
// </style>

//     </Layout>
//   );
// };

// export default PlantDetails;



import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useBookmark } from "../context/bookmark";
import toast from "react-hot-toast";
import { useAuth } from '../context/auth';

const PlantDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState({});
  const [relatedPlants, setRelatedPlants] = useState([]);
  const [bookmark, setBookmark] = useBookmark();
  const [auth] = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    if (params?.slug) getPlant();
  }, [params?.slug]);

  const getPlant = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/plant/get-plant/${params.slug}`
      );
      setPlant(data?.plant);
      getSimilarPlant(data?.plant._id, data?.plant.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarPlant = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/plant/related-plant/${pid}/${cid}`
      );
      setRelatedPlants(data?.plants || []);
    } catch (error) {
      console.log("Error fetching similar plants:", error);
    }
  };
 // Function to open the modal with the clicked image
 const openImageModal = (imageUrl) => {
  setSelectedImage(imageUrl);
};

// Function to close the modal
const closeModal = () => {
  setSelectedImage(null);
};
  

  return (
    <Layout>
      <div className="container plant-details-page">
      <h2 className="text-center mb-4 mt-4">🌿 Plant Details</h2>
        {/* Top Section */}
        <div className="d-flex flex-wrap justify-content-center align-items-start plant-top-section">
  {/* Left Side Details */}
  <div className="detail-column">
    <div className="detail-box"><strong>Name:</strong> {plant.name}</div>
    <div className="detail-box"><strong>Botanical Name:</strong> {plant.botanicalName}</div>
    <div className="detail-box"><strong>Description:</strong> {plant.physicalDescription}</div>
    <div className="detail-box"><strong>Habitat:</strong> {plant.habitat}</div>
    <div className="detail-box"><strong>Medicinal Uses:</strong> {plant.medicinalUses}</div>
    <div className="detail-box"><strong>Sources:</strong> {plant.sources}</div>
  </div>

  {/* Center 3D Model */}

  <div className="model-column text-center">
    
  <div className="detail-box"  style={{ marginBottom: '15px' }}><strong>Category:</strong> {plant?.category?.name}</div>

    {plant.threeDModel?.url ? (
      <model-viewer
        src={plant.threeDModel.url}
        alt={`3D model of ${plant.name}`}
        auto-rotate
        camera-controls
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "8px",
          border: "2px solid #ddd",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          marginBottom: "20px",
        }}
        onError={(e) => console.error("Model failed to load:", e)}
      ></model-viewer>
    ) : (
      <div className="text-center p-3">
        <p className="text-muted">No 3D model available</p>
      </div>
    )}
     <button className="btn btn-dark mt-3"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!auth?.user) {
                  toast.error("Please login to add bookmarks.");
                  navigate("/login");
                  return;
                }
                setBookmark((prevBookmarks) => {
                  const isBookmarked = prevBookmarks.some((item) => item._id === plant._id);
                  if (isBookmarked) {
                    toast.error("This plant is already bookmarked.");
                    return prevBookmarks;
                  }
                  const updatedBookmarks = [...prevBookmarks, plant];
                  localStorage.setItem(`bookmark_${auth.user._id}`, JSON.stringify(updatedBookmarks));
                  toast.success("Plant is Bookmarked");
                  return updatedBookmarks;
                });
              }}>
              BOOKMARK
            </button>
  </div>

  {/* Right Side Details */}
  <div className="detail-column">
    <div className="detail-box"><strong>Cultivation Methods:</strong> {plant.cultivationMethods}</div>
    <div className="detail-box"><strong>Chemical Composition:</strong> {plant.chemicalComposition}</div>
    <div className="detail-box"><strong>Pharmacological Effects:</strong> {plant.pharmacologicalEffects}</div>
    <div className="detail-box"><strong>Clinical Studies:</strong> {plant.clinicalStudies}</div>
    <div className="detail-box"><strong>Safety Precautions:</strong> {plant.safetyPrecautions}</div>
 
  </div>
</div>



      {/* Modal Popup */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Large Plant" className="modal-image" />
          </div>
        </div>
      )}
<div className="plant-images mt-4">
        {plant.rootImage?.url && (
          <div className="plant-image-container">
            <p className="plant-image-label">Root</p>
            <img
              src={plant.rootImage.url}
              alt="Root"
              className="plant-image"
              onClick={() => openImageModal(plant.rootImage.url)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        {plant.leafImage?.url && (
          <div className="plant-image-container">
            <p className="plant-image-label">Leaf</p>
            <img
              src={plant.leafImage.url}
              alt="Leaf"
              className="plant-image"
              onClick={() => openImageModal(plant.leafImage.url)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        {plant.stemImage?.url && (
          <div className="plant-image-container">
            <p className="plant-image-label">Stem</p>
            <img
              src={plant.stemImage.url}
              alt="Stem"
              className="plant-image"
              onClick={() => openImageModal(plant.stemImage.url)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        {plant.fruitImage?.url && (
          <div className="plant-image-container">
            <p className="plant-image-label">Fruit</p>
            <img
              src={plant.fruitImage.url}
              alt="Fruit"
              className="plant-image"
              onClick={() => openImageModal(plant.fruitImage.url)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>

     
        {/* Similar Plants */}
        <hr />
        <div className="similar-plants">
          <h4>Similar Plants ➡️</h4>
          {relatedPlants.length < 1 && <p className="text-center">No Similar Plants found</p>}
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {relatedPlants.map((plant) => (
              <div key={plant._id} className="col">
                <Link to={`/plant/${plant.slug}`} className="plant-link">
                  <div className="card">
                    {plant.threeDModel?.url ? (
                      <model-viewer
                        src={plant.threeDModel.url}
                        alt={`3D model of ${plant.name}`}
                        auto-rotate
                        camera-controls
                        style={{ width: "100%", height: "200px" }}
                      ></model-viewer>
                    ) : (
                      <div className="text-center p-3">
                        <p className="text-muted">No 3D model available</p>
                      </div>
                    )}
                    <div className="card-body text-center">
                      <h5 className="card-title">{plant.name}</h5>
                      <p className="card-text">{plant.physicalDescription || "No description available"}</p>
                      <button className="btn btn-primary" onClick={() => navigate(`/plant/${plant.slug}`)}>More Details</button>
                      <button
                        className="btn btn-dark ms-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                      
                          if (!auth?.user) {
                            toast.error("Please login to add bookmarks.");
                            navigate("/login");
                            return;
                          }
                      
                          setBookmark((prevBookmarks) => {
                            // Check if the plant is already bookmarked
                            const isBookmarked = prevBookmarks.some((item) => item._id === plant._id);
                            if (isBookmarked) {
                              toast.error("This plant is already bookmarked."); // Changed from toast.info() to toast.warning()
                              return prevBookmarks; // Prevents duplicate addition
                            }
                      
                            const updatedBookmarks = [...prevBookmarks, plant];
                            localStorage.setItem(`bookmark_${auth.user._id}`, JSON.stringify(updatedBookmarks));
                            toast.success("Plant is Bookmarked");
                            return updatedBookmarks;
                          });
                        }}
                      >
                        BOOKMARK
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
  {`
    .plant-details-page { max-width: 1000px; margin: auto; }
    
    .plant-images { 
      display: flex; 
      justify-content: center; 
      gap: 20px; 
      flex-wrap: wrap; 
    }
    
    .plant-image-container { 
      position: relative; 
      display: flex; 
      flex-direction: column; 
      align-items: center;
    }
    
    .plant-image-label { 
      position: absolute;
      top: 8px; /* Adjust position slightly from top */
      left: 50%;
      transform: translateX(-50%);
      font-weight: bold; 
      font-size: 16px; 
      text-align: center; 
      color: white; /* Text color */
      background-color: rgba(0, 0, 0, 0.6); /* Dark background for visibility */
      padding: 5px 10px;
      border-radius: 5px;
      width: max-content;
    }
    
 
    
    .plant-info h6 strong { color: green; } /* Makes details titles green */
    .col-md-6.text-center{
    margin-top:70px;}

    .similar-plants{
    margin-bottom:30px;}
    .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .modal-content {
          position: relative;
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
      
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 60vw;  /* Ensures it doesn’t exceed the viewport width */
  max-height: 60vh;overflow: hidden;
        }

        .modal-image {
          max-width: 60%;
          max-height: 60%;
          border-radius: 8px;
          object-fit: contain; 
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          color: black;
        }
        
        .plant-image {
          width: 180px;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid #ddd;
          padding: 5px;
          background-color: #f9f9f9;
          transition: transform 0.2s;
        }
        
        .plant-image:hover {
          transform: scale(1.1);
        }
          .plant-top-section {
  margin-top: 50px;
  gap: 20px;
   align-items: stretch;
}

.detail-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 250px;
  flex: 1;
}

.detail-box {
  background-color: #e8f5e9;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid #c8e6c9;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  font-size: 14px;
  line-height: 1.4;
  min-height: 100%;
 
}
.detail-box strong {
  color: #1b5e20;/* a nice herbal green */
  font-weight: 600;
}


  `}
</style>

    </Layout>
  );
};

export default PlantDetails;
