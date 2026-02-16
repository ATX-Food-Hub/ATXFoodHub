export default function Footer() {
    return (
        <footer className="mt-8 pt-4 pb-4 border-t border-white/20 text-text-secondary text-sm">
            <div className="flex flex-col gap-2">
                <p>Est. 2024 | All rights reserved.</p>
                <address className="not-italic">
                    Contact us at: <a href="mailto:atxfoodhub@gmail.com" className="text-primary hover:underline">atxfoodhub@gmail.com</a>
                    {" | "}
                    Follow our instagram at: <a href="https://www.instagram.com/atx_foodhub/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">atx_foodhub</a>
                    {" | "}
                    Built with support from the UT Austin Impact Lab: <a href="https://exl.cns.utexas.edu/impact-lab" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">UT Impact Lab</a>
                </address>
            </div>
        </footer>
    );
}
