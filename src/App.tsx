import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Post from "./pages/Post";
import Search from "./pages/Search";
import Login from "./pages/Join";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";


function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
    </>
  );
}

export default App;
