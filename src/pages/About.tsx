import { Button } from "@/components/ui/button";
import github from "../assets/images/github.png";

export default function About() {
  return (
    <div
      className="flex flex-col items-center text-center gap-6 md:gap-10 lg:gap-14
                  sm:px-20 lg:px-42 py-6 sm:py-10"
    >
      <p className="text-xl sm:text-3xl lg:text-5xl font-bold">About Us</p>
      <p className="sm:text-[1.1rem] font-semibold max-w-[700px]">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
        corrupti neque veritatis, possimus magnam nostrum ab perferendis
        adipisci reprehenderit accusamus earum sapiente fugiat inventore
        assumenda illo voluptatibus? Labore, eum totam? Ducimus quo delectus
        architecto consectetur, earum neque corporis cupiditate repudiandae
        quibusdam adipisci reprehenderit id possimus veniam eius? Asperiores
        quae velit molestias unde totam possimus error autem, cupiditate quis
        impedit nesciunt!
      </p>
      <a href="https://github.com/muohannedxd/qodsona" target="_blank">
        <Button size={"lg"} className=" bg-slate-900">
          <p className="flex items-center gap-3 font-bold text-xl">
            Contribute on
            <img className="w-6" src={github} alt="github_icon" />
          </p>
        </Button>
      </a>
    </div>
  );
}
