import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className='text-center flex flex-col gap-20 items-center px-10 pt-20'>
      <div>
        <h1 className="font-bold 
          text-3xl
          md:text-5xl">
          Qodsona</h1>
      </div>

      <p className="
      text-[1.15rem]
      md:max-w-[80%] xl:max-w-[50%]">
        A website aimed to help those affected by the recent events in Gaza. Qodsona provides a platform for people to connect with each other and find their missing loved ones. By creating a post about a missing person, others can comment with information or call with any leads. Similarly, if you have information about a missing person, you can create a post to help reunite them with their family. Together, we can make a difference and bring hope to those in need.
      </p>
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
