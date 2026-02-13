import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Opportunity {
    id: string;
    title: string;
    category: string;
    sub_category?: string;
    country: string;
    funding_type?: string;
    visa_sponsorship?: boolean;
    deadline?: string;
    application_url?: string;
    organization?: string;
    description?: string;
    image_url?: string;
}

const getCountryFlag = (country: string) => {
    const map: Record<string, string> = {
        "South Korea": "🇰🇷",
        "United Kingdom": "🇬🇧",
        "Sweden": "🇸🇪",
        "Canada": "🇨🇦",
        "USA": "🇺🇸",
        "Korean Government": "🇰🇷",
        "UK Government": "🇬🇧",
        "Nigeria": "🇳🇬",
        "Ghana": "🇬🇭",
        "Kenya": "🇰🇪",
        "South Africa": "🇿🇦",
        "Egypt": "🇪🇬",
        "Uganda": "🇺🇬",
        "Rwanda": "🇷🇼",
        "Ethiopia": "🇪🇹",
        "India": "🇮🇳",
        "Pakistan": "🇵🇰",
        "Philippines": "🇵🇭",
        "Indonesia": "🇮🇩",
        "Brazil": "🇧🇷",
        "Germany": "🇩🇪",
        "France": "🇫🇷",
    };
    return map[country] || "";
};

export function OpportunityCard({ opportunity, userCountry, compact = false }: { opportunity: Opportunity; userCountry?: string; compact?: boolean }) {
    const flag = getCountryFlag(opportunity.country);

    // Personalize Visa Badge
    let visaText = "Visa Sponsorship";
    if (userCountry && opportunity.visa_sponsorship) {
        const userFlag = getCountryFlag(userCountry);
        visaText = `Visa for ${userFlag} ${userCountry}`;
    }

    // Format date relative or short
    const dateText = opportunity.deadline === "Rolling"
        ? "Rolling"
        : new Date(opportunity.deadline!).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

    // Default placeholder images based on category if none provided
    const defaultImage = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60"; // Generic tech/office

    return (
        <div className={`group flex ${compact ? 'flex-col h-full' : 'flex-col md:flex-row'} gap-0 rounded-2xl border border-zinc-900 bg-black hover:border-zinc-800 shadow-xl transition-all duration-200 overflow-hidden`}>
            {/* Left/Top: Image Section */}
            <div className={`relative w-full ${compact ? 'h-40' : 'md:w-64 h-48 md:h-auto'} flex-shrink-0 bg-zinc-950`}>
                <Image
                    src={opportunity.image_url || defaultImage}
                    alt={opportunity.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Right/Bottom: Content Section */}
            <div className={`flex-1 flex flex-col justify-between ${compact ? 'p-4' : 'p-6'}`}>
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <h3 className={`font-bold text-zinc-100 tracking-tight ${compact ? 'text-lg' : 'text-2xl'}`}>
                            {opportunity.title}
                        </h3>
                    </div>
                    
                    <div className="flex items-center text-sm text-zinc-400 mt-2 gap-2 flex-wrap">
                        <span className="font-medium text-zinc-300">{opportunity.organization}</span>
                        {!compact && (
                            <>
                                <span className="text-zinc-700">•</span>
                                <span>{flag} {opportunity.country}</span>
                                <span className="text-zinc-700">•</span>
                                <span>{dateText}</span>
                            </>
                        )}
                        {compact && (
                             <div className="flex items-center gap-2 w-full mt-1 text-xs">
                                <span>{flag} {opportunity.country}</span>
                                <span className="text-zinc-700">•</span>
                                <span>{dateText}</span>
                             </div>
                        )}
                    </div>

                    <p className={`text-zinc-500 mt-4 leading-relaxed line-clamp-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                        {opportunity.description || `An exciting opportunity at ${opportunity.organization} in ${opportunity.country}.`}
                    </p>
                </div>

                {/* Footer: Tags & Action */}
                <div className={`flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-zinc-900 ${compact ? 'text-xs' : ''}`}>
                    <div className="flex items-center gap-2 flex-1 flex-wrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 shadow-sm">
                            {opportunity.category}
                        </span>
                        
                        {!compact && opportunity.funding_type && (
                            <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 shadow-sm">
                                {opportunity.funding_type}
                            </span>
                        )}
                        
                        {/* Visa Badge */}
                        {opportunity.visa_sponsorship && (
                            <div className="inline-flex items-center px-3 py-1 rounded-md border border-zinc-800 bg-zinc-900 text-[11px] font-medium text-zinc-100 shadow-sm">
                                {compact ? 'Visa' : visaText}
                            </div>
                        )}
                    </div>

                    <Button asChild className={`font-semibold rounded-md bg-white text-black hover:bg-zinc-200 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ml-auto ${compact ? 'h-8 px-4 text-[10px]' : 'h-10 px-6 text-sm'}`}>
                        <Link href={opportunity.application_url || "#"} target="_blank">
                            Apply
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
