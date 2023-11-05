import { Button } from "@/components/ui/button";
import github from "../assets/images/github.png";

export default function About() {
  return (
    <div
      className="flex flex-col items-center text-center gap-6 md:gap-10 lg:gap-14
                  sm:px-20 lg:px-42 py-6 sm:py-10 h-[90vh] md:h-[85vh] lg:h-[80vh]"
    >
      <p className="text-xl sm:text-3xl lg:text-5xl font-bold">About Us</p>
      <p className="sm:text-[1.1rem] font-semibold max-w-[700px]">
        A website aimed to help those affected by the recent events in Gaza. Qodsona provides a platform for people to connect with each other and find their missing loved ones. By creating a post about a missing person, others can comment with information or call with any leads. Similarly, if you have information about a missing person, you can create a post to help reunite them with their family. Together, we can make a difference and bring hope to those in need.
      </p>
      <a href="https://github.com/muohannedxd/qodsona" target="_blank">
        <Button size={"lg"} className="bg-slate-900">
          <p className="flex items-center gap-3 font-bold text-xl">
            Contribute on
            <img className="w-6" src={github} alt="github_icon" />
          </p>
        </Button>
      </a>
    </div>
  );
}
