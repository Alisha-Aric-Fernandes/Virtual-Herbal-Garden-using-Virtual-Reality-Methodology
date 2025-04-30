
import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";

import {useNavigate} from "react-router-dom";
import { useBookmark } from "../context/bookmark";
import toast from "react-hot-toast";
const Search = () => {
  const navigate =useNavigate();
  const [values] = useSearch();
  const [bookmark,setBookmark]=useBookmark();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="row row-cols-1 row-cols-md-3 g-4">
                          {values?.results.map((p) => (
                            <div key={p._id} className="col d-flex justify-content-center mb-4">
                              
                              
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
                                                            e.stopPropagation(); // Stops the click event from bubbling to the Link
                                                            e.preventDefault(); 
                                                            setBookmark([...bookmark, p]);
                                                            localStorage.setItem(
                                                              "bookmark",
                                                              JSON.stringify([...bookmark, p])
                                                            );
                                                            toast.success("Plant is Bookmarked");
                                                          }}
                                                        >BOOKMARK
                                                        </button>
                                  </div>
                                </div>
                             
                            </div>
))}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
