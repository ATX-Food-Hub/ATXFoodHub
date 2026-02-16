export default function ApplyNow() {
    return (
        <>
            <div className="header flex flex-col gap-2">
                <h1 className="text-text-primary text-4xl sm:text-5xl font-bold">Apply Now</h1>
                <p className="description text-text-secondary text-lg sm:text-xl max-w-3xl">
                    Join our team and help us build a more food-secure Austin.
                </p>
            </div>

            <section className="form-section bg-[#797979]/85 p-8 rounded-2xl shadow-xl flex flex-col gap-4">
                <h2 className="text-primary text-3xl font-bold">Application Form</h2>
                <p className="text-text-secondary text-lg">
                    All applications due January 31st.
                </p>
                <div className="form-wrapper rounded-xl overflow-hidden">
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSd3O6dxGWFJ6uSArKq5-3dT1Kj1lgUxn3Bhiqz8OQFFcBIr-w/viewform?embedded=true"
                        width="100%"
                        height="900"
                        className="w-full border-0"
                        loading="lazy"
                    >
                        Loading…
                    </iframe>
                </div>
            </section>

            <hr className="border-white/10" />
        </>
    );
}
