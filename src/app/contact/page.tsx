import React from "react";
import Image from "next/image";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black pt-12 pb-24 px-6 md:px-12 flex flex-col items-center">
            <div className="w-full h-[400px] relative mb-16 overflow-hidden max-w-7xl rounded-sm">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <Image
                    src="/images/boutique_interior.png"
                    alt="Zaman & Nazar Boutique Interior"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="container mx-auto max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-widest uppercase mb-6">Contact Us</h1>
                <p className="text-gray-400 max-w-2xl mx-auto tracking-wide font-light mb-16">
                    Whether you seek a rare timepiece or wish to discuss our warranty policies, our concierges are at your disposal.
                </p>

                <form className="bg-[#050505] p-8 md:p-16 border border-white/10 flex flex-col gap-8 text-left mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 flex flex-col gap-3">
                            <label className="text-xs tracking-widest uppercase text-gray-500" htmlFor="name">Full Name</label>
                            <input id="name" type="text" className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-gold-500 transition-colors" placeholder="Your Name" />
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                            <label className="text-xs tracking-widest uppercase text-gray-500" htmlFor="email">Email Address</label>
                            <input id="email" type="email" className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-gold-500 transition-colors" placeholder="you@example.com" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-xs tracking-widest uppercase text-gray-500" htmlFor="subject">Subject</label>
                        <input id="subject" type="text" className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-gold-500 transition-colors" placeholder="How can we assist you?" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-xs tracking-widest uppercase text-gray-500" htmlFor="message">Message</label>
                        <textarea id="message" rows={5} className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-gold-500 transition-colors resize-none" placeholder="Your message..."></textarea>
                    </div>

                    <button type="button" className="bg-gold-500 text-black uppercase tracking-[0.2em] px-8 py-4 font-semibold text-sm hover:bg-white transition-colors mt-4 self-start">
                        Send Message
                    </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 text-center">
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">Location</h4>
                        <p className="text-gray-500 text-sm">MM Alam Road, Gulberg III<br />Lahore, Pakistan</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">Phone</h4>
                        <p className="text-gray-500 text-sm">+92 300 123 4567<br />Mon-Sat, 11am-8pm</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-white mb-4">Email</h4>
                        <p className="text-gray-500 text-sm">concierge@zamannazar.com<br />info@zamannazar.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
