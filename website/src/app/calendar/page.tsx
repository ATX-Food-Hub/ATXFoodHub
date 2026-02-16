export default function Calendar() {
    return (
        <>
            <div className="header flex flex-col gap-2">
                <h1 className="text-text-primary text-4xl sm:text-5xl font-bold">Calendar</h1>
                <p className="description text-text-secondary text-lg sm:text-xl max-w-3xl">Stay up to date on all food resource events!</p>
            </div>

            <div className="calendar-wrapper w-full h-[600px] rounded-xl overflow-hidden shadow-2xl bg-white/10">
                <iframe
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&showTz=0&title&src=ZjgzYTQ5NDM1NDA4ZDM0NWI3MDcwNGNiODk4M2ExNDM2YWY3YzllNzVmZWE0ZDM2YzFiNWY0ZjAxNzY3OGJlN0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23c0ca33"
                    className="w-full h-full border-0"
                    scrolling="no"
                ></iframe>
            </div>

            <hr className="border-white/10" />
        </>
    );
}
