
import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth"; // Import authentication context

const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const [bookmark, setBookmark] = useState([]);
  const [auth] = useAuth(); // Get logged-in user

  useEffect(() => {
    if (auth?.user?._id) {
      // Retrieve bookmarks based on user ID
      let existingBookmarks = localStorage.getItem(`bookmark_${auth.user._id}`);
      if (existingBookmarks) setBookmark(JSON.parse(existingBookmarks));
    }
  }, [auth]); // Reload bookmarks when user changes

  // Update localStorage whenever bookmarks change
  useEffect(() => {
    if (auth?.user?._id) {
      localStorage.setItem(`bookmark_${auth.user._id}`, JSON.stringify(bookmark));
    }
  }, [bookmark, auth]);

  return (
    <BookmarkContext.Provider value={[bookmark, setBookmark ]}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook
const useBookmark = () => useContext(BookmarkContext);

export { useBookmark, BookmarkProvider };
