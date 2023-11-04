import { NavLink, Link } from "react-router-dom"
import logo from "../assets/images/icon.png"

export default function Navbar() {
  return (
    <div className='flex items-center justify-between py-4 md:py-8 lg:py-16'>
      <Link to='/'>
        <img src={logo} alt="logo" />
      </Link>
      <div className="flex items-center gap-4 md:gap-8 lg:gap-12 xl:gap-16">
        <NavLink to='/post'> Post </NavLink>
        <NavLink to='/search'> Search </NavLink>
        <NavLink to='/about'> About Us </NavLink>
        <NavLink to='/login'> Login </NavLink>
      </div>
    </div>
  )
}
