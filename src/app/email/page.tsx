"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Instagram, Github, Twitter, Info } from "lucide-react";
import Link from "next/link";

export default function EmailPage() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-black text-white">
            {/* Main Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-5">

                {/* Title */}
                <h1 className="text-6xl md:text-8xl lg:text-9xl mb-12 tracking-tight font-bold text-white">
                    Leave the Trenches<span className="text-4xl align-top opacity-50 text-zinc-500">®</span>
                </h1>

                {/* Search/Email Input */}
                <div className="w-full max-w-xl mx-auto relative mb-8 group">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="h-14 md:h-16 rounded-2xl bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 pl-8 pr-16 text-lg shadow-xl focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:border-zinc-700 transition-all hover:bg-zinc-900/80"
                    />
                    <Button
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white text-black hover:bg-zinc-200 shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                        <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                    </Button>
                </div>

                {/* Subtitle Text */}
                <p className="max-w-xl text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-10">
                    Stay updated with the latest news and exclusive content!
                    Subscribe to our newsletter today and never miss out on exciting updates.
                </p>

                {/* Manifesto Button */}
                <Button
                    variant="outline"
                    className="rounded-2xl border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white hover:border-zinc-700 px-8 py-6 h-auto text-lg transition-all duration-300"
                >
                    Manifesto
                </Button>
            </div>

            {/* Footer Socials */}
            <div className="absolute bottom-8 z-10 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                <div className="flex items-center gap-4">
                    {[
                        { Icon: Instagram, href: "#" },
                        { Icon: Twitter, href: "#" }, // Using Twitter icon for X
                        { Icon: Github, href: "#" }
                    ].map(({ Icon, href }, i) => (
                        <Link
                            key={i}
                            href={href}
                            className="flex items-center justify-center p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-all duration-300 hover:scale-110"
                        >
                            <Icon className="h-5 w-5" />
                        </Link>
                    ))}
                </div>

                {/* Optional Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 text-zinc-400 text-xs font-semibold border border-zinc-800">
                    <Info className="h-3 w-3 text-orange-500" />
                    <span>Newsletter Setup</span>
                </div>
            </div>
        </div>
    );
}
