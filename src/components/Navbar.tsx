<<<<<<< HEAD
import { NavLink, Link } from "react-router-dom"
import logo from "../assets/images/icon.png"
=======
import { NavLink, Link } from "react-router-dom";
import logo from "@/assets/images/9ods_logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/auth/useAuth";
>>>>>>> 87c988a30b21dd44ce6d2c2431b18bf6a5569a1f

export default function Navbar() {
  const { isLoggedIn, user } = useAuth();

  if (isLoggedIn && user) {
    var currentEmail = user.email;
  }

  return (
    <div className="flex items-center justify-between py-4 md:py-8 lg:py-16">
      <Link to="/">
        <Avatar>
          <AvatarImage src={logo} alt="logo" />
        </Avatar>
      </Link>
      <div className="flex items-center gap-4 md:gap-8 lg:gap-12 xl:gap-16">
        <NavLink to="/post"> Post </NavLink>
        <NavLink to="/search"> Search </NavLink>
        <NavLink to="/about"> About Us </NavLink>
        {!isLoggedIn ? (
          <NavLink to="/login"> Join </NavLink>
        ) : (
          <Link to="/profile">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn" alt="@shadcn" />
              <AvatarFallback> {currentEmail.substring(0, 2)} </AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
    </div>
  );
}
