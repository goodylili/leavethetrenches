import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Calendar, CalendarClock, Globe, Building2, Wallet, CalendarPlus, ChevronDown, ChevronUp, Download, Share2, Twitter, Linkedin, MessageCircle, Copy, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useCallback, useState } from "react";
import { toPng } from "html-to-image";
import ReactMarkdown from "react-markdown";
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

const ChatGPTLogoMark = () => (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full overflow-hidden border border-zinc-700 bg-zinc-950">
        <Image
            src="https://unavatar.io/chatgpt.com"
            alt="ChatGPT logo"
            width={16}
            height={16}
        />
    </span>
);

const ClaudeLogoMark = () => (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full overflow-hidden border border-zinc-700 bg-zinc-950">
        <Image
            src="https://unavatar.io/claude.ai"
            alt="Claude logo"
            width={16}
            height={16}
        />
    </span>
);

export function OpportunityCard({ opportunity, userCountry, compact = false }: { opportunity: Opportunity; userCountry?: string; compact?: boolean }) {
    const flag = getCountryFlag(opportunity.country);

    const tag1 = opportunity.category;
    const tag2 = opportunity.sub_category ? opportunity.sub_category : opportunity.country;
    const tag3 = opportunity.funding_type ? opportunity.funding_type : (opportunity.deadline === "Rolling" ? "Rolling" : `Due ${new Date(opportunity.deadline!).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`);

    // Format date relative or short
    const dateText = opportunity.deadline === "Rolling"
        ? "Rolling"
        : new Date(opportunity.deadline!).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

    // Default placeholder images based on category if none provided
    const defaultImage = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60";

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

    const aiPrompt = `Help me with an application for this opportunity.\n\nTitle: ${opportunity.title}\nOrganization: ${opportunity.organization || "Unknown"}\nCategory: ${opportunity.category}${opportunity.sub_category ? ` – ${opportunity.sub_category}` : ""}\nCountry: ${opportunity.country}\nFunding: ${opportunity.funding_type || "Not specified"}\nDeadline: ${dateText}\nApplication URL: ${opportunity.application_url || "Not provided"}\n\nPlease help me understand if I am a good fit, how to position my background, and how to draft a strong application.`;

    const contentRef = useRef<HTMLDivElement>(null);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
    const [copied, setCopied] = useState(false);
    const appUrl = opportunity.application_url && opportunity.application_url !== "#" ? opportunity.application_url : "https://leavethetrenches.com";
    const shareTitle = `${opportunity.title} – ${opportunity.organization}`;
    const encShareUrl = encodeURIComponent(appUrl);
    const encShareText = encodeURIComponent(shareTitle);
    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encShareText}%20${encShareUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encShareText}&url=${encShareUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encShareUrl}`,
    };

    const copyToClipboard = useCallback(async (text: string) => {
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch {
            }
        }

        if (typeof document !== "undefined") {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                const successful = document.execCommand("copy");
                document.body.removeChild(textarea);
                return successful;
            } catch {
                document.body.removeChild(textarea);
                return false;
            }
        }

        return false;
    }, []);

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
            <div className={`group flex ${compact ? 'flex-col h-full' : 'flex-col md:flex-row'} w-full bg-zinc-950 border-2 border-zinc-800 shadow-[4px_4px_0px_0px_#27272a] hover:border-primary hover:shadow-[6px_6px_0px_0px_var(--primary)] transition-all duration-200 overflow-hidden relative rounded-none`}>
                {/* Full Card Click Trigger */}
                <DialogTrigger className="absolute inset-0 z-10 w-full h-full cursor-pointer focus:outline-none" />

                {/* Image Section */}
                <div className={`relative ${compact ? 'w-full h-48' : 'w-full h-56 md:w-72 md:h-auto'} flex-shrink-0 bg-zinc-900 border-b-2 md:border-b-0 md:border-r-2 border-zinc-800 overflow-hidden`}>
                    <Image
                        src={opportunity.image_url || defaultImage}
                        alt={opportunity.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Content Section */}
                <div className={`flex-1 flex flex-col ${compact ? 'p-4' : 'p-4 md:p-6'}`}>
                    
                    {/* Top Row: Category & Org */}
                    <div className="flex justify-between items-start mb-2">
                        <div className="space-y-1">
                             <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                                <span>{opportunity.category}</span>
                                {opportunity.sub_category && (
                                    <>
                                        <span className="text-zinc-600">•</span>
                                        <span className="text-zinc-400">{opportunity.sub_category}</span>
                                    </>
                                )}
                            </div>
                            <h3 className={`font-bold text-zinc-100 leading-tight group-hover:text-primary transition-colors ${compact ? 'text-lg' : 'text-xl md:text-2xl'}`}>
                                {opportunity.title}
                            </h3>
                        </div>
                    </div>

                    {/* Organization */}
                    <div className="flex items-center gap-2 text-sm md:text-base font-medium text-zinc-400 mb-3 md:mb-4">
                        <Building2 className="w-4 h-4" />
                        <span>{opportunity.organization}</span>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 text-sm text-zinc-400 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg leading-none">{flag}</span>
                            <span>{opportunity.country}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-zinc-500" />
                            <span>{dateText}</span>
                        </div>
                        {opportunity.funding_type && (
                            <div className="flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-zinc-500" />
                                <span className="text-zinc-300 font-semibold">{opportunity.funding_type}</span>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto pt-4 border-t-2 border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 relative z-20">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] md:text-[11px] font-bold rounded-none bg-zinc-900 border border-zinc-800 text-zinc-200">
                                {tag1}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] md:text-[11px] font-bold rounded-none bg-zinc-900 border border-zinc-800 text-zinc-200">
                                {tag2}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-[10px] md:text-[11px] font-bold rounded-none bg-zinc-900 border border-zinc-800 text-zinc-200">
                                {tag3}
                            </span>
                        </div>

                        {/* Actions: Add to Calendar, Share, Apply */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            {/* Add to Calendar Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-none border-2 border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900 hover:text-white relative z-20 h-9 w-9 md:h-10 md:w-10"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Add to Calendar"
                                    >
                                        <CalendarPlus className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-44 bg-zinc-950 border-zinc-800 text-zinc-300 rounded-none z-50">
                                    <DropdownMenuItem asChild>
                                        <Link href={calendarUrls.google} target="_blank" className="cursor-pointer hover:bg-zinc-900 rounded-none flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <Calendar className="h-4 w-4" />
                                            <span>Google Calendar</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={calendarUrls.outlook} target="_blank" className="cursor-pointer hover:bg-zinc-900 rounded-none flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <CalendarClock className="h-4 w-4" />
                                            <span>Outlook Calendar</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <a href={calendarUrls.ics} download={`${opportunity.title.replace(/\s+/g, '-').toLowerCase()}.ics`} className="cursor-pointer hover:bg-zinc-900 rounded-none flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <Download className="h-4 w-4" />
                                            <span>Download ICS</span>
                                        </a>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Share Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-none border-2 border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900 hover:text-white relative z-20 h-9 w-9 md:h-10 md:w-10"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Share"
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-zinc-800 text-zinc-300 rounded-none z-50">
                                    <DropdownMenuItem asChild>
                                        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-zinc-900 rounded-none flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <MessageCircle className="h-4 w-4" />
                                            <span>WhatsApp</span>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-zinc-900 rounded-none flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <Twitter className="h-4 w-4" />
                                            <span>X / Twitter</span>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-zinc-900 rounded-none flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            <Linkedin className="h-4 w-4" />
                                            <span>LinkedIn</span>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onSelect={async (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const text = `${shareTitle} – ${appUrl}`;
                                            const ok = await copyToClipboard(text);
                                            if (ok) {
                                                setCopied(true);
                                                setTimeout(() => setCopied(false), 1500);
                                            }
                                        }}
                                        className="cursor-pointer hover:bg-zinc-900 rounded-none"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Copy className="h-4 w-4" />
                                            <span>{copied ? "Copied" : "Copy Link"}</span>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Apply Button styled */}
                            <Button 
                                asChild 
                                className="rounded-none relative z-20 h-10 md:h-11 px-4 md:px-6 w-full sm:w-auto"
                            >
                                <Link href={opportunity.application_url || "#"} target="_blank" onClick={(e) => e.stopPropagation()}>
                                    Apply <ArrowRightIcon className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


            <DialogContent className="max-w-3xl border border-white/18 bg-white/7 backdrop-blur-2xl text-zinc-100 p-0 overflow-hidden gap-0 rounded-none shadow-[0_28px_70px_rgba(15,23,42,0.95)]">
                <div ref={contentRef}>
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
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            {opportunity.title}
                        </h2>
                    </div>
                </div>

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

                <div className="p-4 md:p-6 border-t-2 border-zinc-800 bg-zinc-950 flex flex-wrap justify-end gap-3 md:gap-4">
                    {/* Share in Modal */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 border-2 border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white rounded-none h-10 md:h-11 px-4 md:px-6">
                                <Share2 className="h-4 w-4" />
                                Share
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-zinc-800 text-zinc-300 rounded-none">
                            <DropdownMenuItem asChild>
                                <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-zinc-900 rounded-none flex items-center gap-2">
                                    <MessageCircle className="h-4 w-4" />
                                    <span>WhatsApp</span>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-zinc-900 rounded-none flex items-center gap-2">
                                    <Twitter className="h-4 w-4" />
                                    <span>X / Twitter</span>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-zinc-900 rounded-none flex items-center gap-2">
                                    <Linkedin className="h-4 w-4" />
                                    <span>LinkedIn</span>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                onSelect={async (e) => {
                                    e.preventDefault();
                                    const text = `${shareTitle} – ${appUrl}`;
                                    await copyToClipboard(text);
                                }}
                                className="cursor-pointer hover:bg-zinc-900 rounded-none"
                            >
                                <div className="flex items-center gap-2">
                                    <Copy className="h-4 w-4" />
                                    <span>Copy Link</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 border-2 border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white rounded-none shadow-[4px_4px_0px_0px_#27272a] hover:shadow-[2px_2px_0px_0px_#27272a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all h-10 md:h-11 px-4 md:px-6">
                                <Sparkles className="h-4 w-4" />
                                Ask AI
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-60 bg-zinc-950 border-zinc-800 text-zinc-300 rounded-none">
                            <DropdownMenuItem
                                onSelect={async (e) => {
                                    e.preventDefault();
                                    const url = `https://chatgpt.com/?q=${encodeURIComponent(aiPrompt)}`;
                                    await copyToClipboard(aiPrompt);
                                    if (typeof window !== "undefined") {
                                        window.open(url, "_blank", "noopener,noreferrer");
                                    }
                                }}
                                className="cursor-pointer hover:bg-zinc-900 rounded-none"
                            >
                                <div className="flex items-center gap-2">
                                    <ChatGPTLogoMark />
                                    <span>Open in ChatGPT</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={async (e) => {
                                    e.preventDefault();
                                    const url = `https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`;
                                    await copyToClipboard(aiPrompt);
                                    if (typeof window !== "undefined") {
                                        window.open(url, "_blank", "noopener,noreferrer");
                                    }
                                }}
                                className="cursor-pointer hover:bg-zinc-900 rounded-none"
                            >
                                <div className="flex items-center gap-2">
                                    <ClaudeLogoMark />
                                    <span>Open in Claude</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={async (e) => {
                                    e.preventDefault();
                                    await copyToClipboard(aiPrompt);
                                }}
                                className="cursor-pointer hover:bg-zinc-900 rounded-none flex items-center gap-2"
                            >
                                <Copy className="h-4 w-4" />
                                <span>Copy AI brief</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 border-2 border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white rounded-none shadow-[4px_4px_0px_0px_#27272a] hover:shadow-[2px_2px_0px_0px_#27272a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all h-10 md:h-11 px-4 md:px-6">
                                <CalendarPlus className="h-4 w-4" />
                                Add to Calendar
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-zinc-800 text-zinc-300 rounded-none">
                            <DropdownMenuItem asChild>
                                <Link href={calendarUrls.google} target="_blank" className="cursor-pointer hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white rounded-none flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Google Calendar</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={calendarUrls.outlook} target="_blank" className="cursor-pointer hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white rounded-none flex items-center gap-2">
                                    <CalendarClock className="h-4 w-4" />
                                    <span>Outlook Calendar</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href={calendarUrls.ics} download="opportunity.ics" className="cursor-pointer hover:bg-zinc-900 focus:bg-zinc-900 focus:text-white rounded-none flex w-full items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    <span>Download ICS</span>
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="outline" onClick={handleDownload} className="gap-2 border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white rounded-none h-10 md:h-11 px-4 md:px-6">
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-10 md:h-11 px-4 md:px-6">
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
