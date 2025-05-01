
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); // New state to handle errors

  // Fetch all plants
  useEffect(() => {
    getAllPlants();
  }, []);
  

  const getAllPlants = async () => {
    try {
      const { data } = await axios.get("/api/v1/plant/get-plant");
      
      console.log("API Response:", data);

      if (data.success && Array.isArray(data.plants)) {
        setPlants(data.plants);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching plants:", error);
      toast.error("Failed to load plants. Please try again.");
      setError("Failed to fetch plants. Check your API response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Plants List</h1>

          {/* Loading State */}
          {loading && <p className="text-center">Loading plants...</p>}

          {/* Error State */}
          {error && !loading && <p className="text-center text-danger">{error}</p>}

          {/* No Plants Found */}
          {!loading && !error && plants.length === 0 && (
            <p className="text-center">No plants available.</p>
          )}

          {/* Plants List */}
          {!loading && !error && plants.length > 0 && (
            <div className="d-flex flex-wrap">
              {plants.map((p) => {
                console.log("Plant Data:", p);
                console.log("3D Model URL for", p.name, ":", p?.threeDModel?.url);

                return (
                  <Link key={p._id} to={`/dashboard/admin/plant/${p.slug}`} className="plant-link">
                    <div className="card m-2" style={{ width: "18rem" }}>
                      {p.threeDModel?.url ? (
                        <model-viewer
                          src={p.threeDModel.url}
                          alt={`3D model of ${p.name}`}
                          auto-rotate
                          camera-controls
                          style={{ width: "100%", height: "200px" }}
                          onError={(e) => console.error("Model failed to load:", e)}
                        ></model-viewer>
                      ) : (
                        <div className="text-center p-3">
                          <p className="text-muted">No 3D model available</p>
                        </div>
                      )}

                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.physicalDescription || "No description available"}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Plants;
