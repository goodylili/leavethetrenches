import Link from "next/link";

const announcements = [
    "New: Global Korea Scholarship (GKS) 2026 applications are now open",
    "Tech Nation Visa requirements updated for 2026",
    "Spotify is hiring Senior Backend Engineers in Sweden - Visa Sponsorship Available",
    "Canada Express Entry STEM draw expected next week",
];

export function AnnouncementBanner() {
    return (
        <div className="bg-primary text-primary-foreground h-10 flex items-center overflow-hidden whitespace-nowrap relative z-50">
            <div className="animate-marquee inline-block">
                {announcements.map((text, i) => (
                    <Link key={i} href="#" className="mx-8 text-sm font-medium hover:underline">
                        • {text}
                    </Link>
                ))}
                {/* Duplicate for seamless loop */}
                {announcements.map((text, i) => (
                    <Link key={`dup-${i}`} href="#" className="mx-8 text-sm font-medium hover:underline">
                        • {text}
                    </Link>
                ))}
            </div>
        </div>
    );
}
