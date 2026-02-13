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

export function Header() {
    return (
        <div className="container max-w-7xl mx-auto px-4 pt-6 z-50 relative">
            {/* Floating Header Card */}
            <header className="rounded-2xl bg-black/90 backdrop-blur-md border border-zinc-900 text-white shadow-2xl pl-6 pr-2 py-2">
                <div className="flex h-12 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                                {/* Simplified Logo for Header */}
                                <img src="/logo.svg" alt="LTT" className="h-5 w-5" />
                            </div>
                            <span className="font-bold text-lg tracking-tight hidden sm:block">Leave the Trenches</span>
                            <span className="font-bold text-lg tracking-tight sm:hidden">LTT</span>
                        </Link>

                        {/* Desktop Mega Menu */}
                        <div className="hidden lg:block">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="text-zinc-300 hover:text-white bg-transparent">Scholarships</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                                                <li className="row-span-3">
                                                    <NavigationMenuLink asChild>
                                                        <a
                                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-zinc-800/50 to-zinc-900 p-6 no-underline outline-none focus:shadow-md"
                                                            href="/scholarships"
                                                        >
                                                            <div className="h-24 w-24 bg-zinc-800 rounded-full mb-4 flex items-center justify-center text-3xl">🎓</div>
                                                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                                                                Fully Funded
                                                            </div>
                                                            <p className="text-sm leading-tight text-zinc-400">
                                                                Explore verified full scholarships.
                                                            </p>
                                                        </a>
                                                    </NavigationMenuLink>
                                                </li>
                                                <ListItem href="/scholarships?type=masters" title="Masters Scholarships">
                                                    Top rated programs for 2026 intake.
                                                </ListItem>
                                                <ListItem href="/scholarships?type=phd" title="PhD & Research">
                                                    Grants and fully funded research positions.
                                                </ListItem>
                                                <ListItem href="/scholarships?type=undergrad" title="Undergraduate">
                                                    Merit-based waivers and aid.
                                                </ListItem>
                                            </ul>
                                            <div className="bg-zinc-900/50 p-4 border-t border-zinc-800">
                                                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-zinc-400">
                                                    <li className="hover:text-white cursor-pointer transition-colors">United Kingdom</li>
                                                    <li className="hover:text-white cursor-pointer transition-colors">Canada</li>
                                                    <li className="hover:text-white cursor-pointer transition-colors">Australia</li>
                                                    <li className="hover:text-white cursor-pointer transition-colors">Show All</li>
                                                </ul>
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="text-zinc-300 hover:text-white bg-transparent">Jobs & Visas</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                                {jobs.map((component) => (
                                                    <ListItem
                                                        key={component.title}
                                                        title={component.title}
                                                        href={component.href}
                                                    >
                                                        {component.description}
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>

                                    <NavigationMenuItem>
                                        <Link href="/fellowships" legacyBehavior passHref>
                                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-zinc-300 hover:text-white")}>
                                                Fellowships
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/post" className="hidden sm:block">
                            <span className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Post Opportunity</span>
                        </Link>
                        <Link href="/email">
                            <Button size="sm" className="rounded-2xl px-5 font-semibold bg-white text-black hover:bg-zinc-200">
                                Get Alerts
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
}

const jobs: { title: string; href: string; description: string }[] = [
    {
        title: "Visa Sponsored Jobs",
        href: "/jobs",
        description:
            "Direct hire roles with relocation packages included.",
    },
    {
        title: "Skilled Worker Visas",
        href: "/immigration",
        description:
            "Pathways for healthcare, tech, and engineering professionals.",
    },
    {
        title: "Startup Visas",
        href: "/startups",
        description:
            "Founders pathways for UK, Canada, and France.",
    },
    {
        title: "Remote Work",
        href: "/jobs?type=remote",
        description: "Global roles available to African talent.",
    },
]

const ListItem = ({ className, title, children, ...props }: any) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus:bg-zinc-800 focus:text-zinc-100",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none text-white">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
}
