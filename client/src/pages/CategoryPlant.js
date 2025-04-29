import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../context/auth';
import { useBookmark } from "../context/bookmark";
import toast from "react-hot-toast";
const CategoryPlant = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [category, setCategory] = useState([]);
  const [bookmark,setBookmark]=useBookmark();
    const [auth]=useAuth()
  useEffect(() => {
    if (params?.slug) getPlantsByCat();
  }, [params?.slug]);
  const getPlantsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/plant/plant-category/${params.slug}`
      );
      setPlants(data?.plants);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
       <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{plants?.length} result found </h6>
        <div className="row row-cols-1 row-cols-md-3 g-4">
                        {plants.map((p) => (
                          <div key={p._id} className="col d-flex justify-content-center mb-4">
                            <Link
                              to={`/plant/${p.slug}`}
                              className="plant-link"
                            >
                              <div className="card" style={{  width: "100%", maxWidth: "18rem", margin: "auto"}}>
                                {p.threeDModel?.url ? (
                                  <model-viewer
                                    src={p.threeDModel.url}
                                    alt={`3D model of ${p.name}`}
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
                                  <h5 className="card-title">{p.name}</h5>
                                  <p className="card-text">
                                    {p.physicalDescription || "No description available"}
                                  </p>
                                <button className="btn btn-primary ms-1" onClick={()=>navigate(`/plant/${p.slug}`)}>
                                                            More Details
                                                          </button>
                                                          
                                                            

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
                                                                                    const isBookmarked = prevBookmarks.some((item) => item._id === p._id);
                                                                                    if (isBookmarked) {
                                                                                      toast.error("This plant is already bookmarked."); // Changed from toast.info() to toast.warning()
                                                                                      return prevBookmarks; // Prevents duplicate addition
                                                                                    }
                                                                              
                                                                                    const updatedBookmarks = [...prevBookmarks, p];
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

export default CategoryPlant;