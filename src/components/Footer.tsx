import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";
import { TwitterIcon, LinkedinIcon, InstagramIcon } from "lucide-react";

export default function Footer() {
    return (
        <section className="bg-zinc-950 py-4 px-4 md:px-6 mt-auto">
            <footer className="relative mx-auto max-w-7xl overflow-hidden rounded-none bg-zinc-950 text-white py-8 px-6 md:px-12 border-2 border-zinc-800 shadow-[8px_8px_0px_0px_#27272a]">
                {/* Background Text Effect - Marquee */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-0 opacity-[0.02]">
                    <div className="animate-marquee whitespace-nowrap">
                        <span className="text-[10vw] font-black leading-none text-center text-white tracking-tighter mx-4">
                            LEAVE THE TRENCHES
                        </span>
                        <span className="text-[10vw] font-black leading-none text-center text-white tracking-tighter mx-4">
                            LEAVE THE TRENCHES
                        </span>
                    </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Branding Column */}
                    <div className="md:col-span-4 space-y-3">
                        <div className="space-y-3">
                            <Link href="/" className="flex items-center gap-3">
                                <span className="font-bold text-xl tracking-tight">Leave the Trenches</span>
                            </Link>
                            <p className="text-zinc-400 leading-relaxed max-w-sm text-sm">
                                The structured opportunities engine for Africans.<br />
                                Built for the bold.
                            </p>
                            <div className="flex gap-4 text-zinc-400">
                                <Link href="#" className="hover:text-primary transition-colors"><TwitterIcon className="h-4 w-4" /></Link>
                                <Link href="#" className="hover:text-primary transition-colors"><LinkedinIcon className="h-4 w-4" /></Link>
                                <Link href="#" className="hover:text-primary transition-colors"><InstagramIcon className="h-4 w-4" /></Link>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation - Grid Layout */}
                    <div className="hidden md:grid md:col-span-8 grid-cols-3 gap-6">
                        <div>
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Explore</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/" className="group flex items-baseline gap-2">
                                        <span className="font-semibold text-zinc-200 group-hover:text-primary">Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/scholarships" className="group flex items-baseline gap-2">
                                        <span className="font-semibold text-zinc-200 group-hover:text-primary">Scholarships</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/jobs" className="group flex items-baseline gap-2">
                                        <span className="font-semibold text-zinc-200 group-hover:text-primary">Jobs</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Resources</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/blog" className="group flex items-baseline gap-2">
                                        <span className="font-semibold text-zinc-200 group-hover:text-primary">Guides</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/verify" className="group flex items-baseline gap-2">
                                        <span className="font-semibold text-zinc-200 group-hover:text-primary">Verify</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="group flex items-baseline gap-2">
                                        <span className="font-semibold text-zinc-200 group-hover:text-primary">FAQ</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Legal</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/privacy" className="group block">
                                        <span className="font-semibold text-zinc-200 group-hover:text-primary">Privacy</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="group block">
                                        <span className="font-semibold text-zinc-200 group-hover:text-primary">Terms</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="group flex items-baseline gap-2">
                                        <span className="font-semibold text-zinc-200 group-hover:text-primary">Contact</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Mobile Navigation - Accordions */}
                    <div className="md:hidden col-span-1 border-t-2 border-zinc-800 pt-4">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="explore" className="border-b-2 border-zinc-800">
                                <AccordionTrigger className="text-sm font-bold text-zinc-500 uppercase tracking-wider hover:text-primary hover:no-underline px-1">
                                    Explore
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-3 pb-4 px-1">
                                        <li><Link href="/" className="block text-zinc-300 hover:text-primary transition-colors">Home</Link></li>
                                        <li><Link href="/scholarships" className="block text-zinc-300 hover:text-primary transition-colors">Scholarships</Link></li>
                                        <li><Link href="/jobs" className="block text-zinc-300 hover:text-primary transition-colors">Jobs</Link></li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="resources" className="border-b-2 border-zinc-800">
                                <AccordionTrigger className="text-sm font-bold text-zinc-500 uppercase tracking-wider hover:text-primary hover:no-underline px-1">
                                    Resources
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-3 pb-4 px-1">
                                        <li><Link href="/blog" className="block text-zinc-300 hover:text-primary transition-colors">Guides</Link></li>
                                        <li><Link href="/verify" className="block text-zinc-300 hover:text-primary transition-colors">Verify</Link></li>
                                        <li><Link href="/faq" className="block text-zinc-300 hover:text-primary transition-colors">FAQ</Link></li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="legal" className="border-zinc-800">
                                <AccordionTrigger className="text-sm font-bold text-zinc-500 uppercase tracking-wider hover:text-primary hover:no-underline px-1">
                                    Legal
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-3 pb-4 px-1">
                                        <li><Link href="/privacy" className="block text-zinc-300 hover:text-primary transition-colors">Privacy</Link></li>
                                        <li><Link href="/terms" className="block text-zinc-300 hover:text-primary transition-colors">Terms</Link></li>
                                        <li><Link href="/contact" className="block text-zinc-300 hover:text-primary transition-colors">Contact</Link></li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 border-t-2 border-zinc-800 pt-6 mt-8">
                    <p>© {new Date().getFullYear()} Leave the Trenches. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Built with 💚 for Africa</p>
                </div>

            </footer>
        </section>
    );
}
