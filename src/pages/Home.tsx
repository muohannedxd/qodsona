import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
 
export default function Home() {
  return (
    <div className='text-center flex flex-col gap-20 items-center px-10 pt-20'>
      <div>
        <h1 className="font-bold 
          text-3xl
          md:text-5xl">
                Lorem ipsum Big Title</h1>
        <h2 className="font-semibold md:text-3xl">Lorem ipsum subtitle</h2>
      </div>
      
      <p className="
      text-[1.15rem]
      md:max-w-[80%] xl:max-w-[50%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
      <div>
        <Button className="mx-3 md:text-5xl font-extrabold h-auto border-black border-4" asChild>
          <Link to="/search">Search</Link>
        </Button>
        <Button className="mx-3 md:text-5xl font-extrabold h-auto bg-transparent border-black border-4" variant="outline">
          <Link to="/post">Post</Link>
        </Button>
      </div>
    </div>
  )
}
