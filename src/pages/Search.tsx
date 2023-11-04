import React, { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import PostCard from "./PostCard.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Search() {
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let q;
      const postsRef = collection(db, "posts");

      if (value.trim()) {
        // If there is a search value, perform the search logic
        q = query(
          postsRef,
          where("description", ">=", value),
          where("description", "<=", value + '\uf8ff')
        );
        let querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          q = query(postsRef, where("tags", "array-contains", value.trim()));
          querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            q = query(
              postsRef,
              where("postType", ">=", value),
              where("postType", "<=", value + '\uf8ff')
            );
            querySnapshot = await getDocs(q);
          }
        }
        setSearchResults(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        // If there is no search value, fetch all posts
        q = query(postsRef);
        const querySnapshot = await getDocs(q);
        setSearchResults(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };

    fetchPosts();
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
          <div className="col-sm-6"  key={post.id}>
            <PostCard {...post} />
          </div>
        ))
      ) : (
        value.length > 0 && <p>No posts found.</p>
      )}
    </div>
  );
}
