export default function Tutorials() {
    return (
        <>
            <div className="header flex flex-col gap-2">
                <h1 className="text-text-primary text-4xl sm:text-5xl font-bold">Tutorials</h1>
                <p className="description text-text-secondary text-lg sm:text-xl max-w-3xl">Watch our video tutorial below.</p>
            </div>

            <div className="video-wrapper w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                    className="w-full h-full"
                    src="https://drive.google.com/file/d/1xVCE3TjWKQwvBH1QPfRbNCrh1AiP4WqY/preview"
                    allow="autoplay"
                    allowFullScreen
                ></iframe>
            </div>

            <hr className="border-white/10" />
        </>
    );
}
