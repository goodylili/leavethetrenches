import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
    {
        title: "Scholarships",
        items: [
            "Fully Funded Masters",
            "PhD Scholarships",
            "Undergraduate Scholarships",
            "MBA Scholarships",
            "Government Scholarships",
            "Research Grants",
            "Commonwealth Scholarships",
            "Chevening Scholarships",
            "Erasmus Mundus",
            "Fulbright Program"
        ]
    },
    {
        title: "Jobs Abroad",
        items: [
            "Visa Sponsored Jobs",
            "Healthcare Recruitment",
            "Tech Relocation Roles",
            "Blue Collar Migration",
            "Software Engineer",
            "Nurse / Midwife",
            "Medical Doctor",
            "Data Scientist",
            "Product Manager",
            "DevOps Engineer"
        ]
    },
    {
        title: "Immigration Pathways",
        items: [
            "Study Visas",
            "Skilled Worker Visas",
            "Post-Study Work Visas",
            "Permanent Residency",
            "Startup Visas",
            "Canada Express Entry",
            "UK Skilled Worker",
            "US H1B Visa",
            "German Opportunity Card",
            "Tech Nation Visa"
        ]
    },
    {
        title: "Fellowships & Leadership",
        items: [
            "Global Leadership",
            "Policy Fellowships",
            "UN & NGO Programs",
            "Social Impact Grants",
            "Journalism Fellowships",
            "Arts Residencies",
            "Obama Foundation Scholars",
            "Echoing Green",
            "Thiel Fellowship",
            "Rhodes Scholarship"
        ]
    },
    {
        title: "Popular Destinations",
        items: [
            "Move to UK",
            "Move to Canada",
            "Move to USA",
            "Move to Germany",
            "Move to Australia",
            "Move to Netherlands",
            "Move to Sweden",
            "Move to France",
            "Move to Ireland",
            "Move to New Zealand"
        ]
    }
];

export function BrowseCategories() {
    return (
        <section className="bg-black border-t border-zinc-900 py-20">
            <div className="container max-w-7xl mx-auto px-4">
                <h2 className="text-xl font-bold text-white mb-12 text-center md:text-left">
                    Browse Opportunities
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
                    {CATEGORIES.map((category) => (
                        <div key={category.title}>
                            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
                                {category.title}
                            </h3>
                            <ul className="space-y-3">
                                {category.items.map((item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-sm text-zinc-400 hover:text-white group flex items-center gap-1 transition-colors"
                                        >
                                            {item}
                                            <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
