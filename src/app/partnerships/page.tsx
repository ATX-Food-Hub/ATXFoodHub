export default function Partnerships() {
    const currentPartnerships = [
        { name: "Daily Texan", href: "https://thedailytexan.com/2025/04/17/ut-student-creates-map-with-nearby-affordable-resources-to-address-food-insecurity/" },
        { name: "UT Outpost SNAP Peer Support Navigator", href: "https://deanofstudents.utexas.edu/sos/ut-outpost-snap-benefits.php" },
        // { name: "Patterson Park Community Garden - Food Pantry Coordination", href: null },
        { name: "ATX Roots & Wings Festival", href: "https://rootsandwingsfest.com/" },
        // { name: "Austin Bicycle Meals - Resource Card + Meal Distribution", href: null },
    ];

    return (
        <>
            <div className="header flex flex-col gap-2">
                <h1 className="text-text-primary text-4xl sm:text-5xl font-bold">Become a Partner With Us</h1>
            </div>

            <div className="form-wrapper w-full h-[600px] rounded-xl overflow-hidden shadow-2xl bg-white/10 mb-8">
                <iframe
                    src="https://docs.google.com/forms/d/1_zwkaBUlSTDxUbws8g3xiCRXVkmnhzK148GVcGiqPHU/viewform?embedded=true"
                    className="w-full h-full border-0"
                >
                    Loading…
                </iframe>
            </div>

            <section className="bg-primary p-8 rounded-2xl shadow-xl text-black">
                <h3 className="text-2xl font-bold mb-4 border-b border-black/10 pb-2">Current Partnerships</h3>
                <ul className="flex flex-col gap-3 text-lg">
                    {currentPartnerships.map((partner, idx) => (
                        <li key={idx} className="list-disc list-inside">
                            {partner.href ? (
                                <a href={partner.href} target="_blank" rel="noopener noreferrer" className="underline hover:text-black/70">
                                    {partner.name}
                                </a>
                            ) : (
                                partner.name
                            )}
                        </li>
                    ))}
                </ul>
            </section>

            <hr className="border-white/10" />
        </>
    );
}
