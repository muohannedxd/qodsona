import React, { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import PostCard from "./PostCard.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Search() {
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (value.length > 0) {
      const fetchPosts = async () => {
        const postsRef = collection(db, "posts");
        // const q = query(postsRef, where("tags", "array-contains", value.trim()));
        const q = query(
          postsRef,
          where("description", ">=", value),
          where("description", "<=", value + '\uf8ff')
        );
        var querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          // The query returned no documents
          const q2 = query(postsRef, where("tags", "array-contains", value.trim()));
          querySnapshot = await getDocs(q2);
          if (querySnapshot.empty) {
            // The query returned no documents
            const q3 = query(
              postsRef,
              where("postType", ">=", value),
              where("postType", "<=", value + '\uf8ff')
            );
            querySnapshot = await getDocs(q3);
            
          }
        }
        try {
          setSearchResults(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      };

      fetchPosts();
    } else {
      setSearchResults([]);
    }
  }, [value]);

  return (
    <div className="row">
      <div className="form-outline">
        <input
          type="search"
          id="form1"
          className="form-control"
          placeholder="Search for post by tag or type(missing or found) or starting of descrption"
          aria-label="Search"
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
      </div>
      {searchResults.length > 0 ? (
        searchResults.map((post) => (
          <div className="col-sm-6" key={post.id}>
            <PostCard {...post} />
          </div>
        ))
      ) : (
        value.length > 0 && <p>No posts found.</p>
      )}
    </div>
  );
}
