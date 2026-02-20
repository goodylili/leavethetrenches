import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { GraduationCap, Briefcase, Plane, Globe, BookOpen, Award, Building2, MapPin } from "lucide-react";

import { GetAlertsButton } from "@/components/GetAlertsButton";

export function Header() {
    return (
        <div className="container max-w-7xl mx-auto px-4 pt-6 z-50 relative">
            <header className="rounded-none border border-white/18 bg-white/7 backdrop-blur-xl bg-clip-padding text-white pl-6 pr-2 py-2 shadow-[0_22px_55px_rgba(15,23,42,0.9)] transition-all">
                <div className="flex h-12 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-none flex items-center justify-center border border-white/25 bg-white/15 backdrop-blur-sm">
                                <img src="/logo.svg" alt="LTT" className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-lg tracking-tight hidden sm:block text-primary">Leave the Trenches</span>
                            <span className="font-bold text-lg tracking-tight sm:hidden text-primary">LTT</span>
                        </Link>

                        {/* Desktop Mega Menu */}
                        <div className="hidden lg:block">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="text-zinc-300 hover:text-primary bg-transparent font-medium">Opportunities</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-[400px] md:w-[700px] lg:w-[900px]">
                                                {/* Column 1: Scholarships */}
                                                <div className="space-y-4">
                                                    <h4 className="font-medium text-xs text-zinc-500 px-3 uppercase tracking-wider flex items-center gap-2">
                                                        <GraduationCap className="w-4 h-4" /> Scholarships
                                                    </h4>
                                                    <ul className="grid gap-1">
                                                        <ListItem href="/scholarships?type=masters" title="Masters Programs">
                                                            Fully funded degrees for postgraduate studies.
                                                        </ListItem>
                                                        <ListItem href="/scholarships?type=phd" title="PhD & Research">
                                                            Research grants and doctoral positions.
                                                        </ListItem>
                                                        <ListItem href="/scholarships?type=undergrad" title="Undergraduate">
                                                            Merit-based waivers and financial aid.
                                                        </ListItem>
                                                        <ListItem href="/scholarships?type=government" title="Government Schemes">
                                                            Chevening, Fulbright, and DAAD.
                                                        </ListItem>
                                                    </ul>
                                                </div>

                                                {/* Column 2: Jobs & Careers */}
                                                <div className="space-y-4">
                                                    <h4 className="font-medium text-xs text-zinc-500 px-3 uppercase tracking-wider flex items-center gap-2">
                                                        <Briefcase className="w-4 h-4" /> Jobs & Careers
                                                    </h4>
                                                    <ul className="grid gap-1">
                                                        <ListItem href="/jobs" title="Visa Sponsored Jobs">
                                                            Direct hire roles with relocation support.
                                                        </ListItem>
                                                        <ListItem href="/jobs?type=tech" title="Tech Relocation">
                                                            Software engineering and product roles.
                                                        </ListItem>
                                                        <ListItem href="/jobs?type=healthcare" title="Healthcare">
                                                            Nursing and medical professional pathways.
                                                        </ListItem>
                                                        <ListItem href="/jobs?type=remote" title="Remote Work">
                                                            Global remote roles available to Africans.
                                                        </ListItem>
                                                    </ul>
                                                </div>

                                                {/* Column 3: Immigration & Fellowships */}
                                                <div className="space-y-4">
                                                    <h4 className="font-medium text-xs text-zinc-500 px-3 uppercase tracking-wider flex items-center gap-2">
                                                        <Globe className="w-4 h-4" /> Global Pathways
                                                    </h4>
                                                    <ul className="grid gap-1">
                                                        <ListItem href="/immigration" title="Skilled Worker Visas">
                                                            Points-based systems for UK, Canada, & EU.
                                                        </ListItem>
                                                        <ListItem href="/immigration?type=talent" title="Global Talent">
                                                            For exceptional leaders in tech and arts.
                                                        </ListItem>
                                                        <ListItem href="/startups" title="Startup Visas">
                                                            Founder pathways for innovative businesses.
                                                        </ListItem>
                                                        <ListItem href="/fellowships" title="Fellowships">
                                                            Leadership programs and social impact grants.
                                                        </ListItem>
                                                    </ul>
                                                </div>
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/community"
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    "bg-transparent text-zinc-300 hover:text-primary font-medium"
                                                )}
                                            >
                                                Community
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/post" className="hidden sm:block">
                            <span className="text-sm font-medium text-zinc-400 hover:text-primary transition-colors">Add Opportunity</span>
                        </Link>
                        <GetAlertsButton />
                    </div>
                </div>
            </header>
        </div>
    );
}

const ListItem = ({ className, title, children, href, ...props }: any) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={cn(
                        "block select-none space-y-1 rounded-none p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800/50 hover:text-accent-foreground focus:bg-zinc-800/50 focus:text-accent-foreground group",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none text-zinc-200 group-hover:text-primary transition-colors mb-1.5">{title}</div>
                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-zinc-400 transition-colors">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
