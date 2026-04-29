import MapComponent from "@/components/MapComponent";
import { MapPin, Pencil, Calendar } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="header flex flex-col gap-2">
        <h1 className="text-text-primary text-4xl sm:text-5xl font-bold">The Food Map Every UT Student Needs</h1>
        <p className="description text-text-secondary text-lg sm:text-xl max-w-3xl">
          This is your guide to meals, pantries, and community support. To submit any potential additions to the map, use our{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSch2VEfYH0HOo6nLVtVA80ANG8w2hmjc_D5TfPsYolnSSijPA/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary-hover"
          >
            form
          </a>{" "}
          to share food access updates, garden resources, and more. You can also view the new interactive map below.
        </p>
      </div>

      <div className="map-wrapper h-[400px] sm:h-[600px] w-full bg-black/10 rounded-2xl overflow-hidden shadow-2xl">
        <MapComponent />
      </div>

      <div className="cards flex flex-wrap gap-4 justify-between w-full">
        <Link href="/projects" className="card-btn group">
          <div className="icon mb-4 transform transition-transform group-hover:scale-110">
            <MapPin size={32} />
          </div>
          <h3 className="text-lg font-medium text-center">OUR CURRENT PROJECTS</h3>
        </Link>
        <Link href="#" className="card-btn group">
          <div className="icon mb-4 transform transition-transform group-hover:scale-110">
            <Pencil size={32} />
          </div>
          <h3 className="text-lg font-medium text-center">HOW TO USE MAP & CONTRIBUTING</h3>
        </Link>
        <Link href="/calendar" className="card-btn group">
          <div className="icon mb-4 transform transition-transform group-hover:scale-110">
            <Calendar size={32} />
          </div>
          <h3 className="text-lg font-medium text-center">UPCOMING EVENTS & MEETUPS</h3>
        </Link>
      </div>

      <hr className="border-white/10" />

      <section className="form-section bg-[#797979]/85 p-8 rounded-2xl shadow-xl flex flex-col gap-4">
        {/* <h2 className="text-primary text-3xl font-bold">Apply Now</h2> */}
        <p className="text-text-secondary text-lg">
          All applications due January 31st.
        </p>

        <div className="form-wrapper rounded-xl overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd3O6dxGWFJ6uSArKq5-3dT1Kj1lgUxn3Bhiqz8OQFFcBIr-w/viewform?embedded=true"
            width="100%"
            height="900"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            loading="lazy"
            className="w-full"
          >
            Loading…
          </iframe>
        </div>
      </section>

      <div className="form-link text-center pt-4">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfF3VnNlKkAHtNay9NuaVKkFLbscXLRtpF4HQy6E-hZfbS2WA/usp=header"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-bold text-xl hover:text-primary-hover underline"
        >
          Click Here To RSVP For Our Info-Sessions →
        </a>
      </div>
    </>
  );
}
