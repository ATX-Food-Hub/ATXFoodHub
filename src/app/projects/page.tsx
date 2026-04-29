"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS = [
    {
        title: "Outreach & Engagement",
        items: [
            "SNAP Peer Support with UT Outpost",
            "Social media & events to destigmatize food insecurity",
        ],
    },
    {
        title: "Research",
        items: [
            "Partnering with UT faculty to design studies related to food resources",
            "Analyzing map use and user behavior",
            "Presenting findings at conferences",
        ],
    },
    {
        title: "Map Improvement",
        items: [
            "Continuously adding transportation routes & detailed info",
            "Embedding chatbot and tutorials into our website",
            "Improving layout & usability",
            "Sending update newsletters",
        ],
    },
];

export default function Projects() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % PROJECTS.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

    return (
        <>
            <div className="header text-center flex flex-col gap-2">
                <h1 className="text-text-primary text-4xl sm:text-5xl font-bold">ATX Food Hub Projects</h1>
                <p className="description text-text-secondary text-lg sm:text-xl">Use the arrows to browse through our committee projects!</p>
            </div>

            <div className="slide-wrapper flex flex-col items-center justify-center gap-8 py-8">
                <div className="slide-section w-full max-w-2xl bg-white/90 p-8 sm:p-12 rounded-3xl shadow-2xl text-panel min-h-[400px] transition-all duration-300 transform"
                    style={{
                        backgroundImage: "url('/mapbackground.jpeg')",
                        backgroundSize: "cover",
                        backgroundBlendMode: "lighten",
                        backgroundColor: "rgba(255, 255, 255, 0.85)"
                    }}>
                    <h2 className="text-3xl font-bold text-panel mb-6 border-b border-black/10 pb-2">{PROJECTS[currentSlide].title}</h2>
                    <ul className="list-disc list-inside flex flex-col gap-4 text-xl">
                        {PROJECTS[currentSlide].items.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="arrow-nav flex items-center justify-center gap-8">
                    <button onClick={prevSlide} className="text-primary hover:text-primary-hover hover:scale-120 transition-all">
                        <ChevronLeft size={48} />
                    </button>
                    <div className="slide-indicator text-text-secondary text-xl font-medium">
                        {currentSlide + 1} / {PROJECTS.length}
                    </div>
                    <button onClick={nextSlide} className="text-primary hover:text-primary-hover hover:scale-120 transition-all">
                        <ChevronRight size={48} />
                    </button>
                </div>
            </div>

            <hr className="border-white/10" />
        </>
    );
}
