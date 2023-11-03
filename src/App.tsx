// import { useEffect, useState } from 'react';
// import { DocumentData, collection, getDocs, onSnapshot } from 'firebase/firestore';
// import db from "./config/firebase"
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Post from "./pages/Post";
import Search from "./pages/Search";
import Login from "./pages/Login";

function App() {
  //const [users, setUsers] = useState<DocumentData[]>([])
  //
  //useEffect(() => {
  //  const getUsers = async () => {
  //    const querySnapshot = await getDocs(collection(db, 'users'))
  //    const users = querySnapshot.docs.map(doc => doc.data())
  //    setUsers(users)
  //  }
  //
  //  getUsers()
  //
  //}, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
