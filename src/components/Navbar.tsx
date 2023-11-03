import { NavLink, Link } from "react-router-dom"
import logo from "../assets/images/icon.png"
import { AlignLeft } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface HamburgerMenuProps {
  navLinks: Object,
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ navLinks }) =>
  <Accordion type="single" collapsible>
    <AccordionItem value='hb-menu'>
      <AccordionTrigger>
        <AlignLeft />
      </AccordionTrigger>
      <AccordionContent className="absolute">
        <div className="flex flex-col gap-1">
          {
            Object.entries(navLinks).map(
              ([label, link], index) =>
                <div className="px-5 py-2 bg-white rounded-[8px]">
                  <Link to={link} key={`dd-link-${index}`} className="hover:bg-[#ffffff]">{label}</Link>
                </div>
            )
          }
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>


export default function Navbar() {

  const navLinks = {
    "Post": "/post",
    "Search": "/search",
    "About Us": "/about",
    "Login": "/login"
  }

  return (
    <div className='sticky top-0 flex items-center justify-between py-4 md:py-8 lg:py-16' id="navbar">
      <Link to='/'>
        <img src={logo} alt="logo" />
      </Link>

      <div className="md:hidden px-10">
        <HamburgerMenu navLinks={navLinks} />
      </div>

      <div className="hidden md:flex items-center gap-4 md:gap-8 lg:gap-12 xl:gap-16">
        {
          Object.entries(navLinks).map(
            ([label, link], index) =>
              <NavLink key={`nav-item-${index}`} to={link}> {label} </NavLink>
          )
        }
      </div>
    </div>
  )
}
