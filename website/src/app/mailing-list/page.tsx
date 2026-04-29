"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function MailingList() {
    const form = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setIsSubmitting(true);
        setResponse(null);

        emailjs.sendForm(
            'service_pfatk9a',
            'template_uonbrhf',
            form.current,
            'x2p6VxuzNBiHpLrux'
        )
            .then(() => {
                setResponse({ type: "success", message: "✓ Success! You've been added to our mailing list." });
                form.current?.reset();
            })
            .catch((error: any) => {
                console.error('EmailJS Error:', error);
                setResponse({ type: "error", message: "✗ Something went wrong. Please try again or email us directly." });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <>
            <div className="header flex flex-col gap-2">
                <h1 className="text-text-primary text-4xl sm:text-5xl font-bold">Join the Mailing List!</h1>
                <p className="description text-text-secondary text-lg sm:text-xl max-w-3xl">Enter your email below to receive our monthly newsletter for map users.</p>
            </div>

            <div className="form-container w-full max-w-xl mx-auto py-12">
                <form ref={form} onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-2xl shadow-xl border border-white/5 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="user_email" className="text-primary font-bold text-lg">Email Address:</label>
                        <input
                            type="email"
                            id="user_email"
                            name="user_email"
                            required
                            placeholder="your.email@example.com"
                            className="w-full p-4 rounded-lg bg-transparent text-text-primary border-2 border-primary/30 focus:border-primary focus:outline-none transition-all placeholder:text-text-secondary/50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full p-4 bg-primary text-black font-bold text-xl rounded-lg hover:bg-primary-hover hover:-translate-y-1 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                        {isSubmitting ? "Sending..." : "Join Mailing List"}
                    </button>
                </form>

                {response && (
                    <div className={`mt-6 p-4 rounded-xl text-center text-lg font-medium border ${response.type === "success"
                        ? "bg-primary/20 text-primary border-primary/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}>
                        {response.message}
                    </div>
                )}
            </div>

            <hr className="border-white/10" />
        </>
    );
}
