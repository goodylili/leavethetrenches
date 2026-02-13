import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Calendar, Globe, Building2, Wallet, CalendarPlus, ChevronDown, ChevronUp, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useCallback, useState } from "react";
import { toPng } from "html-to-image";
import ReactMarkdown from 'react-markdown';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

    // Calendar URL generation
    const calendarUrls = (() => {
        const title = encodeURIComponent(opportunity.title);
        const description = encodeURIComponent(opportunity.description || "");
        const location = encodeURIComponent(opportunity.country);
        
        let startTime = new Date();
        if (opportunity.deadline && opportunity.deadline !== "Rolling") {
            const d = new Date(opportunity.deadline);
            if (!isNaN(d.getTime())) {
                startTime = d;
            }
        }
        startTime.setHours(9, 0, 0, 0);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

        const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

        const google = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${description}&location=${location}&dates=${formatDate(startTime)}/${formatDate(endTime)}`;
        const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${description}&location=${location}&startdt=${startTime.toISOString()}&enddt=${endTime.toISOString()}`;
        
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${opportunity.application_url || ""}
DTSTART:${formatDate(startTime)}
DTEND:${formatDate(endTime)}
SUMMARY:${opportunity.title}
DESCRIPTION:${opportunity.description || ""}
LOCATION:${opportunity.country}
END:VEVENT
END:VCALENDAR`;
        const ics = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;

        return { google, outlook, ics };
    })();

    const contentRef = useRef<HTMLDivElement>(null);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);

    const handleDownload = useCallback(async () => {
        if (contentRef.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(contentRef.current, { cacheBust: true, backgroundColor: '#09090b' }); // zinc-950
            const link = document.createElement('a');
            link.download = `${opportunity.title.replace(/\s+/g, '-').toLowerCase()}-card.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to download image', err);
        }
    }, [opportunity.title]);

    return (
        <Dialog>
            <div className={`group flex ${compact ? 'flex-col h-full' : 'flex-col md:flex-row'} gap-0 rounded-none border-2 border-zinc-800 bg-zinc-950 shadow-[4px_4px_0px_0px_#27272a] hover:border-primary hover:shadow-[4px_4px_0px_0px_var(--primary)] transition-all duration-200 overflow-hidden relative`}>
                {/* Full Card Click Trigger */}
                <DialogTrigger className="absolute inset-0 z-10 w-full h-full cursor-pointer focus:outline-none" />

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
                        <span className="inline-flex items-center px-3 py-1 rounded-none text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 shadow-sm">
                            {opportunity.category}
                        </span>
                        
                        {!compact && opportunity.funding_type && (
                            <span className="inline-flex items-center px-3 py-1 rounded-none text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 shadow-sm">
                                {opportunity.funding_type}
                            </span>
                        )}
                        
                        {/* Visa Badge */}
                        {opportunity.visa_sponsorship && (
                            <div className="inline-flex items-center px-3 py-1 rounded-none border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-100 shadow-sm">
                                {compact ? 'Visa' : visaText}
                            </div>
                        )}
                    </div>

                    <Button asChild className={`relative z-20 font-semibold rounded-none bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ml-auto ${compact ? 'h-8 px-4 text-xs' : 'h-10 px-6 text-sm'}`}>
                        <Link href={opportunity.application_url || "#"} target="_blank" onClick={(e) => e.stopPropagation()}>
                            Apply
                        </Link>
                    </Button>
                </div>
            </div>
        </div>

            <DialogContent className="max-w-3xl bg-zinc-950 border-2 border-zinc-800 shadow-[8px_8px_0px_0px_#27272a] text-zinc-100 p-0 overflow-hidden gap-0 rounded-none">
                <div ref={contentRef} className="flex flex-col w-full bg-zinc-950">
                {/* Header Image */}
                <div className="relative h-64 w-full bg-zinc-900">
                    <Image
                        src={opportunity.image_url || defaultImage}
                        alt={opportunity.title}
                        fill
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-none border-2">
                                {opportunity.category}
                            </Badge>
                            {opportunity.visa_sponsorship && (
                                <Badge variant="outline" className="text-primary border-primary/50 bg-primary/10 rounded-none border-2">
                                    Visa Sponsorship Available
                                </Badge>
                            )}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            {opportunity.title}
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                    {/* Key Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Building2 className="w-5 h-5 text-zinc-500 mt-1" />
                                <div>
                                    <p className="text-sm text-zinc-500 font-medium">Organization</p>
                                    <p className="text-zinc-100 font-medium">{opportunity.organization}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Globe className="w-5 h-5 text-zinc-500 mt-1" />
                                <div>
                                    <p className="text-sm text-zinc-500 font-medium">Location</p>
                                    <p className="text-zinc-100 font-medium">{flag} {opportunity.country}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-zinc-500 mt-1" />
                                <div>
                                    <p className="text-sm text-zinc-500 font-medium">Deadline</p>
                                    <p className="text-zinc-100 font-medium">{dateText}</p>
                                </div>
                            </div>
                            {opportunity.funding_type && (
                                <div className="flex items-start gap-3">
                                    <Wallet className="w-5 h-5 text-zinc-500 mt-1" />
                                    <div>
                                        <p className="text-sm text-zinc-500 font-medium">Funding</p>
                                        <p className="text-zinc-100 font-medium">{opportunity.funding_type}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <div 
                            className="flex items-center justify-between cursor-pointer group/accordion select-none" 
                            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                        >
                            <h3 className="text-xl font-semibold text-zinc-100">About this opportunity</h3>
                            {isDescriptionOpen ? (
                                <ChevronUp className="h-5 w-5 text-zinc-500 group-hover/accordion:text-zinc-300 transition-colors" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-zinc-500 group-hover/accordion:text-zinc-300 transition-colors" />
                            )}
                        </div>
                        {isDescriptionOpen && (
                            <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-200">
                                <ReactMarkdown>{opportunity.description || ""}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t-2 border-zinc-800 bg-zinc-950 flex flex-wrap justify-end gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 border-2 border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white rounded-none shadow-[4px_4px_0px_0px_#27272a] hover:shadow-[2px_2px_0px_0px_#27272a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                <CalendarPlus className="h-4 w-4" />
                                Add to Calendar
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-zinc-800 text-zinc-300 rounded-none">
                            <DropdownMenuItem asChild>
                                <Link href={calendarUrls.google} target="_blank" className="cursor-pointer hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white rounded-none">
                                    Google Calendar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={calendarUrls.outlook} target="_blank" className="cursor-pointer hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white rounded-none">
                                    Outlook Calendar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href={calendarUrls.ics} download="opportunity.ics" className="cursor-pointer hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white rounded-none flex w-full items-center">
                                    Download ICS
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="outline" onClick={handleDownload} className="gap-2 border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white rounded-none">
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                        <Link href={opportunity.application_url || "#"} target="_blank">
                            Apply Now <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
