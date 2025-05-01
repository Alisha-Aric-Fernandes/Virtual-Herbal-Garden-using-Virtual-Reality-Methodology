
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Layout from "./../components/Layout/Layout";
import { useBookmark } from "../context/bookmark";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast"; // Import toast properly

const BookmarkPage = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [auth] = useAuth();
  const [bookmark, setBookmark] = useBookmark();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (!auth?.user) {
      setBookmark([]); // Clear bookmarks on logout
      navigate("/login"); // Redirect to login page
    } else {
      // Load user-specific bookmarks from localStorage
      const storedBookmarks =
        JSON.parse(localStorage.getItem(`bookmark_${auth.user._id}`)) || [];
      setBookmark(storedBookmarks);
    }
    setLoading(false); // Mark loading as complete
  }, [auth?.user, navigate, setBookmark]);

  

  // Remove a bookmark item
  const removeBookmarkItem = (pid) => {
    if (!auth?.user) return; // Prevent updates if user is not logged in
    try {
      setBookmark((prevBookmarks) => {
        const updatedBookmarks = prevBookmarks.filter((item) => item._id !== pid);
        localStorage.setItem(`bookmark_${auth.user._id}`, JSON.stringify(updatedBookmarks));
        toast.success("Bookmark removed successfully!");
        return updatedBookmarks;
      });
    } catch (error) {
      console.error("Error removing bookmark:", error);
      toast.error("Failed to remove bookmark.");
    }
  };

  return (
    <Layout title={"Bookmark"}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 text-center">
            <h1 className="bg-light p-3 mb-3">
              {!auth?.user ? "Hello Guest" : `Hello, ${auth?.user?.name}`}
            </h1>

            {/* Show loading state before bookmarks are loaded */}
            {loading ? (
              <p>Loading bookmarks...</p>
            ) : auth?.user ? (
              <p>
                {bookmark?.length
                  ? `You have ${bookmark.length} plants in your bookmarks.`
                  : "Your bookmark is empty!"}
              </p>
            ) : null}
          </div>

          {/* Bookmark List */}
          {auth?.user && (
            <div className="col-md-10">
              {Array.isArray(bookmark) &&
                bookmark.map((p) => (
                  <div
                    key={p._id}
                    className="card d-flex flex-row align-items-center p-3 mb-3 shadow-sm"
                  >
                    <div style={{ width: "220px", height: "220px", marginRight: "30px" }}>
                      <model-viewer
                        src={p.threeDModel?.url}
                        alt={`3D model of ${p.name}`}
                        auto-rotate
                        camera-controls
                        style={{ width: "100%", height: "100%" }}
                        onError={(e) => console.error("Model failed to load:", e)}
                      ></model-viewer>
                    </div>

                    <div className="flex-grow-1 px-4">
                      <h4 className="card-title">{p.name}</h4>
                      <p className="card-text">
                        {p.physicalDescription
                          ? p.physicalDescription.substring(0, 50) + "..."
                          : "No description available"}
                      </p>
                      <p className="text-muted">
                        <strong>Botanical Name:</strong> {p.botanicalName}
                      </p>

                      <button
                        className="btn btn-danger mt-3"
                        onClick={() => removeBookmarkItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookmarkPage;

