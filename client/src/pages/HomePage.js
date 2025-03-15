import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
import { AiOutlineReload } from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import { useBookmark } from "../context/bookmark";
import toast from "react-hot-toast";
// import "../styles/HomePage.css";
import { useAuth } from '../context/auth';
const HomePage = () => {
  const navigate =useNavigate();
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bookmark,setBookmark]=useBookmark();
    const [auth]=useAuth()
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    getAllCategory();
    getAllPlants();
    getTotal();
  }, []);

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
    }
  };

  const getAllPlants = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/plant/plant-list/${page}`
      );
      setPlants(data.plants);
    } catch (error) {
      console.log(error);
      setError("Failed to load plants");
    } finally {
      setLoading(false);
    }
  };

  const filterPlant = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/plant/plant-filters`,
        { checked }
      );
      setPlants(data?.plants);
    } catch (error) {
      console.log(error);
    }
  };

  
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/plant/plant-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/plant/plant-list/${page}`);
      setLoading(false);
      setPlants([...plants, ...data?.plants]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };


  useEffect(() => {
    if (checked.length === 0) {
      getAllPlants();
    } else {
      filterPlant();
    }
  }, [checked]);

  const resetFilters = () => {
    setChecked([]); // Reset checked categories
    getAllPlants(); // Fetch all plants again
  };

  return (
    <Layout title={"All plants"}>
      {/* banner image */}
      <img
        src="/images/banner1.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
       
      />
      {/* banner image */}
      <div className="container mt-3">
        <div className="row">
          {/* Left Sidebar - Filter By Category */}
          <div className="col-md-3">
            <h4 className="text-start ms-2">Filter By Category</h4>
            <div className="d-flex flex-column ps-3">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  checked={checked.includes(c._id)}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            {/* Small Reset Button */}
            <div className="mt-3 text-start ms-2">
              <button
                className="btn btn-danger btn-sm"
                onClick={resetFilters}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          {/* Right Section - Plants List */}
          <div className="col-md-9">
            <h1 className="text-center">All Plants</h1>

            {/* Loading State */}
            {loading && <p className="text-center">Loading plants...</p>}

            {/* Error State */}
            {error && !loading && (
              <p className="text-center text-danger">{error}</p>
            )}

            {/* No Plants Found */}
            {!loading && !error && plants.length === 0 && (
              <p className="text-center">No plants available.</p>
            )}

            {/* Plants List */}
            {!loading && !error && plants.length > 0 && (
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
            )}

<div className="m-2 p-3">
                      
            {plants && plants.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
