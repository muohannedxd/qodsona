import { NavLink, Link } from "react-router-dom";
import logo from "../assets/images/icon.png";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/auth/useAuth";

export default function Navbar() {
  const { isLoggedIn } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between py-4 md:py-8 lg:py-16">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="flex items-center gap-4 md:gap-8 lg:gap-12 xl:gap-16">
        <NavLink to="/post"> Post </NavLink>
        <NavLink to="/search"> Search </NavLink>
        <NavLink to="/about"> About Us </NavLink>
        {!isLoggedIn ? (
          <NavLink to="/login"> Join </NavLink>
        ) : (
          <Button variant={"destructive"} onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}
