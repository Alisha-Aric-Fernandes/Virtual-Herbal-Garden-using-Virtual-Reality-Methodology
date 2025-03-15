import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
//import "../styles/PlantDetailsStyle.css";
import { Link } from "react-router-dom";
import { useBookmark } from "../context/bookmark";
import toast from "react-hot-toast";

import { useAuth } from '../context/auth';

const PlantDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState({});
  const [relatedPlants, setRelatedPlants] = useState([]);
  const [bookmark,setBookmark]=useBookmark();
   const [auth]=useAuth()

  //initalp details
  useEffect(() => {
    if (params?.slug) getPlant();
  }, [params?.slug]);
  //getProduct
  const getPlant = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/plant/get-plant/${params.slug}`
      );
      setPlant(data?.plant);
      console.log("Plant ID:", data?.plant?._id);
      console.log("Category ID:", data?.plant?.category?._id);
      getSimilarPlant(data?.plant._id, data?.plant.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  
  
  const getSimilarPlant = async (pid, cid) => {
    try {
      console.log(`Fetching similar plants for PID: ${pid}, CID: ${cid}`);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/plant/related-plant/${pid}/${cid}`
      );
      console.log("API Response for Similar Plants:", data);
      setRelatedPlants(data?.plants || []);
    } catch (error) {
      console.log("Error fetching similar plants:", error);
    }
  };
  
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
        {plant.threeDModel?.url ? (
                        <model-viewer
                          src={plant.threeDModel.url}
                          alt={`3D model of ${plant.name}`}
                          auto-rotate
                          camera-controls
                          style={{ width: "100%", height: "300px",marginTop: "100px",
                            border: "2px solid #ddd", // Border around the model
    borderRadius: "8px",      // Optional: rounded corners
    padding: "10px",          // Optional: padding inside the border
    backgroundColor: "#f9f9f9", // Optional: background color inside the border
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                          onError={(e) => console.error("Model failed to load:", e)}
                        ></model-viewer>
                      ) : (
                        <div className="text-center p-3">
                          <p className="text-muted">No 3D model available</p>
                        </div>
                      )}
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Plant Details</h1>
          <hr />
         
          <div>
  <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Name:</span> {plant.name}</h6>
  <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Botanical Name:</span> {plant.botanicalName}</h6>
  <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Description:</span> {plant.physicalDescription}</h6>
  <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Habitat:</span> {plant.habitat}</h6>
  <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Medicinal Uses:</span> {plant.medicinalUses}</h6>
  <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Cultivation Methods:</span> {plant.cultivationMethods}</h6>
  <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Chemical Composition:</span> {plant.chemicalComposition}</h6>
  <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Pharmacological Effects:</span> {plant.pharmacologicalEffects}</h6>
  <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Clinical Studies:</span> {plant.clinicalStudies}</h6>
  <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Safety Precautions:</span> {plant.safetyPrecautions}</h6>
  <h6><span style={{ fontWeight: "bold", color: "	#228B22" }}>Sources:</span> {plant.sources}</h6>
  <h6><span style={{ fontWeight: "bold", color:  "	#228B22"}}>Category:</span> {plant?.category?.name}</h6>
</div>

          {/* <button className="btn btn-dark ms-1"
          onClick={(e) => {
            e.stopPropagation(); // Stops the click event from bubbling to the Link
            e.preventDefault(); 
            setBookmark([...bookmark, plant]);
            localStorage.setItem(
              "bookmark",
              JSON.stringify([...bookmark, plant])
            );
            toast.success("Plant is Bookmarked");
          }}>BOOKMARK</button> */}
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
      <hr />
      <div className="row container similar-plants">
        <h4>Similar Plants ➡️</h4>
        {relatedPlants.length < 1 && (
          <p className="text-center">No Similar Plants found</p>
        )}
        <div className="row row-cols-1 row-cols-md-3 g-4">
                        {relatedPlants.map((plant) => (
                          <div key={plant._id} className="col d-flex justify-content-center mb-4">
                            <Link
                              to={`/plant/${plant.slug}`}
                              className="plant-link"
                            >
                              <div className="card" style={{  width: "100%", maxWidth: "18rem", margin: "auto"}}>
                                {plant.threeDModel?.url ? (
                                  <model-viewer
                                    src={plant.threeDModel.url}
                                    alt={`3D model of ${plant.name}`}
                                    auto-rotate
                                    camera-controls
                                    style={{ width: "100%", height: "200px" }}
                                    onError={(e) =>
                                      console.error("Model failed to load:", e)
                                    }
                                  ></model-viewer>
                                ) : (
                                  <div className="text-center p-3">
                                    <p className="text-muted">No 3D model available</p>
                                  </div>
                                )}
        
                                <div className="card-body text-center">
                                  <h5 className="card-title">{plant.name}</h5>
                                  <p className="card-text">
                                    {plant.physicalDescription || "No description available"}
                                  </p>
                                  <button className="btn btn-primary ms-1" onClick={()=>navigate(`/plant/${plant.slug}`)}>
                            More Details
                          </button>
                       
                          {/* <button className="btn btn-dark ms-1"
                            onClick={(e) => {
                                                  e.stopPropagation(); // Stops the click event from bubbling to the Link
                                                  e.preventDefault(); 
                                                  setBookmark([...bookmark, plant]);
                                                  localStorage.setItem(
                                                    "bookmark",
                                                    JSON.stringify([...bookmark, plant])
                                                  );
                                                  toast.success("Plant is Bookmarked");
                                                  
                                                }}>
                            Bookmark
                          </button> */}

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
    </Layout>
  );
};

export default PlantDetails;