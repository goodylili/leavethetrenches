"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OpportunityCard } from "@/components/OpportunityCard";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { OnboardingModal } from "@/components/OnboardingModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BrowseCategories } from "@/components/BrowseCategories";
import { SearchIcon, MapPinIcon, BriefcaseIcon, GraduationCapIcon, PlaneIcon, FilterIcon, XIcon, AwardIcon, RocketIcon, CalendarIcon } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { ComboboxInput } from "@/components/ui/combobox-input";
import { COUNTRIES } from "@/data/countries";

// Expanded Mock Data
const MOCK_OPPORTUNITIES = [
  // Scholarships
  {
    id: "1",
    title: "Global Korea Scholarship (GKS) 2026",
    organization: "Korean Government",
    category: "Scholarships",
    sub_category: "Masters",
    country: "South Korea",
    funding_type: "Fully Funded",
    visa_sponsorship: true,
    deadline: "2026-03-31",
    application_url: "https://studyinkorea.go.kr",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    hot: true,
    posted_date: "2025-10-15",
    image_url: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "4",
    title: "Chevening Scholarship 2026/2027",
    organization: "UK Government",
    category: "Scholarships",
    sub_category: "Masters",
    country: "United Kingdom",
    funding_type: "Fully Funded",
    visa_sponsorship: true,
    deadline: "2026-11-01",
    application_url: "https://chevening.org",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-09-01",
    image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "7",
    title: "Erasmus Mundus Joint Masters",
    organization: "European Union",
    category: "Scholarships",
    country: "Sweden",
    funding_type: "Fully Funded",
    visa_sponsorship: true,
    deadline: "2026-02-15",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-10-20",
    image_url: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "8",
    title: "Fulbright Foreign Student Program",
    organization: "USA Government",
    category: "Scholarships",
    country: "USA",
    funding_type: "Fully Funded",
    visa_sponsorship: true,
    deadline: "Varies",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-08-15",
    image_url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=60"
  },

  // Jobs
  {
    id: "3",
    title: "Senior Backend Engineer",
    organization: "Spotify",
    category: "Jobs",
    sub_category: "Tech",
    country: "Sweden",
    funding_type: "$90k - $120k",
    visa_sponsorship: true,
    deadline: "2026-04-15",
    application_url: "https://lifeatspotify.com/",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-10-25",
    image_url: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "9",
    title: "Product Designer",
    organization: "Klarna",
    category: "Jobs",
    country: "Sweden",
    funding_type: "$70k - $95k",
    visa_sponsorship: true,
    deadline: "2026-01-20",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-10-22",
    image_url: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "10",
    title: "Software Engineer, iOS",
    organization: "Google",
    category: "Jobs",
    country: "United Kingdom",
    funding_type: "Competitive",
    visa_sponsorship: true,
    deadline: "Rolling",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-10-26",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "11",
    title: "Data Scientist",
    organization: "Shopify",
    category: "Jobs",
    country: "Canada",
    funding_type: "$110k - $140k",
    visa_sponsorship: true,
    deadline: "2026-03-01",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-10-18",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
  },

  // Immigration
  {
    id: "2",
    title: "Tech Nation Visa (Global Talent)",
    organization: "Tech Nation UK",
    category: "Immigration",
    sub_category: "Skilled Worker",
    country: "United Kingdom",
    funding_type: "Visa Path",
    visa_sponsorship: true,
    deadline: "Rolling",
    application_url: "https://technation.io/visa/",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-01-01",
    image_url: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "5",
    title: "Canada Express Entry (STEM Draw)",
    organization: "IRCC",
    category: "Immigration",
    sub_category: "Permanent Residency",
    country: "Canada",
    funding_type: "PR Status",
    visa_sponsorship: true,
    deadline: "Rolling",
    application_url: "https://canada.ca/express-entry",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-05-01",
    image_url: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "12",
    title: "German Opportunity Card",
    organization: "German Gov",
    category: "Immigration",
    country: "Germany",
    funding_type: "Job Seeker",
    visa_sponsorship: false, // It's a visa itself
    deadline: "Rolling",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-06-01",
    image_url: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&auto=format&fit=crop&q=60"
  },

  // Fellowships
  {
    id: "6",
    title: "Obama Foundation Scholars",
    organization: "Obama Foundation",
    category: "Fellowships",
    sub_category: "Leadership",
    country: "USA",
    funding_type: "Fully Funded",
    visa_sponsorship: true,
    deadline: "2025-12-15",
    application_url: "https://obama.org",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-09-10",
    image_url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "13",
    title: "Echoing Green Fellowship",
    organization: "Echoing Green",
    category: "Fellowships",
    country: "USA",
    funding_type: "$80k Stipend",
    visa_sponsorship: true, // Often assists
    deadline: "2026-01-10",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-08-01",
    image_url: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&auto=format&fit=crop&q=60"
  },
  // Startups
  {
    id: "14",
    title: "Y Combinator S26",
    organization: "Y Combinator",
    category: "Startups",
    country: "USA",
    funding_type: "$500k Investment",
    visa_sponsorship: true, // Founder visa support
    deadline: "2026-03-01",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-09-01",
    image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "15",
    title: "French Tech Visa",
    organization: "La French Tech",
    category: "Startups",
    country: "France",
    funding_type: "Visa for Founders",
    visa_sponsorship: true,
    deadline: "Rolling",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    posted_date: "2025-01-01",
    image_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "16",
    title: "Global Talent Visa (UK) - Digital Tech",
    organization: "Tech Nation",
    category: "Immigration",
    country: "United Kingdom",
    funding_type: "Visa Path",
    visa_sponsorship: true,
    deadline: "Rolling",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    hot: true,
    posted_date: "2025-09-01",
    image_url: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "17",
    title: "Schwarzman Scholars",
    organization: "Tsinghua University",
    category: "Scholarships",
    country: "China",
    funding_type: "Fully Funded",
    visa_sponsorship: true,
    deadline: "2025-09-20",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    hot: true,
    posted_date: "2025-08-30",
    image_url: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "18",
    title: "Thiel Fellowship",
    organization: "Thiel Foundation",
    category: "Fellowships",
    country: "USA",
    funding_type: "$100k Grant",
    visa_sponsorship: false,
    deadline: "Rolling",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    hot: true,
    posted_date: "2025-09-15",
    image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "19",
    title: "Y Combinator W27",
    organization: "Y Combinator",
    category: "Startups",
    country: "USA",
    funding_type: "$500k Investment",
    visa_sponsorship: true,
    deadline: "2026-10-01",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    hot: true,
    posted_date: "2025-10-01",
    image_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "20",
    title: "Gates Cambridge Scholarship",
    organization: "University of Cambridge",
    category: "Scholarships",
    country: "United Kingdom",
    funding_type: "Fully Funded",
    visa_sponsorship: true,
    deadline: "2025-10-10",
    application_url: "#",
    description: `This is an exceptional opportunity for qualified candidates to join a world-class organization dedicated to making a global impact. You will be working with a diverse team of experts from around the world, tackling some of the most challenging problems in the industry.

Key Responsibilities:
- Lead and manage complex projects from conception to completion, ensuring all milestones are met on time and within budget.
- Collaborate with cross-functional teams to design, develop, and deploy innovative solutions that address user needs and business goals.
- Conduct in-depth research and analysis to identify trends, opportunities, and risks, and provide actionable insights to senior leadership.
- Mentor and coach junior team members, fostering a culture of continuous learning and professional growth.
- Represent the organization at international conferences, workshops, and industry events, building strong relationships with key stakeholders.

Qualifications:
- A master's degree or higher in a relevant field (e.g., Computer Science, Engineering, Business Administration, International Relations).
- Minimum of 5 years of professional experience in a similar role, with a proven track record of success.
- Strong leadership and communication skills, with the ability to influence and inspire others.
- Fluency in English is required; proficiency in other languages is a plus.
- Willingness to travel internationally as needed.

Benefits:
- Competitive salary and performance-based bonuses.
- Comprehensive health, dental, and vision insurance plans.
- Generous paid time off, including vacation days, holidays, and sick leave.
- Professional development opportunities, including access to training programs and conferences.
- Relocation assistance and visa sponsorship for qualified candidates.

About the Organization:
Our organization is a global leader in its field, committed to driving positive change and creating a better future for all. We value diversity, inclusion, and innovation, and we are dedicated to providing a supportive and inclusive work environment where everyone can thrive. Join us and be part of a team that is making a difference in the world.

Application Process:
Interested candidates should submit a resume, cover letter, and portfolio (if applicable) through our online application portal. Shortlisted candidates will be contacted for an interview. We look forward to reviewing your application!`,
    hot: true,
    posted_date: "2025-09-01",
    image_url: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&auto=format&fit=crop&q=60"
  }
];

const FILTERS = [
  { label: "All", icon: null, value: "All" },
  { label: "Scholarships", icon: GraduationCapIcon, value: "Scholarships" },
  { label: "Jobs", icon: BriefcaseIcon, value: "Jobs" },
  { label: "Immigration", icon: PlaneIcon, value: "Immigration" },
  { label: "Fellowships", icon: AwardIcon, value: "Fellowships" },
  { label: "Startups", icon: RocketIcon, value: "Startups" },
  { label: "Events", icon: CalendarIcon, value: "Events" },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userCountry, setUserCountry] = useState<string | undefined>(undefined);

  const isFiltering = searchTerm !== "" || selectedCategory !== "All" || location !== "";

  const handleOnboardingComplete = (country: string) => {
    setUserCountry(country);
  };

  useEffect(() => {
    // Check local storage for user's country on mount
    if (typeof window !== 'undefined') {
      const storedCountry = localStorage.getItem("ltt_country");
      if (storedCountry) {
        setUserCountry(storedCountry);
      }
    }
  }, []);

  const filtered = MOCK_OPPORTUNITIES.filter((opp) => {
    const matchesSearch = searchTerm === "" ||
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesLocation = location === "" || 
      opp.country.toLowerCase().includes(location.toLowerCase());

    const matchesCategory = selectedCategory === "All" || opp.category === selectedCategory;
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  // Helper to get slice of category for Dashboard
  const getCategorySlice = (category: string, limit: number = 4) => {
    return MOCK_OPPORTUNITIES.filter(o => o.category === category).slice(0, limit);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      <AnnouncementBanner />
      <OnboardingModal onComplete={handleOnboardingComplete} />
      <Header />

      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <section className="relative pt-20 pb-12 md:pt-32 md:pb-16 overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-none pointer-events-none" />

          <div className="container max-w-7xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6">
              Escape Velocity for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">Your Promising Talents.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              The search engine for visa-sponsored jobs, fully funded scholarships, and global immigration pathways.
            </p>

            {/* Search Box Container */}
            <div className="bg-zinc-950 border-2 border-zinc-800 shadow-[4px_4px_0px_0px_#27272a] hover:border-primary hover:shadow-[4px_4px_0px_0px_var(--primary)] p-2 rounded-none flex flex-col md:flex-row gap-2 w-full mx-auto animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4 delay-200 transition-all">
              <div className="relative flex-1 group">
                <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-zinc-200 transition-colors" />
                <Input
                  placeholder="Keywords (e.g. 'Software Engineer', 'Scholarship')"
                  className="pl-12 h-12 bg-transparent border-transparent shadow-none text-base text-zinc-200 focus-visible:ring-0 placeholder:text-zinc-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-px bg-zinc-900 my-2 hidden md:block" />
              <div className="relative flex-1 md:flex-[0.6] group">
                <MapPinIcon className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500 group-focus-within:text-zinc-200 transition-colors z-10" />
                <ComboboxInput
                  options={COUNTRIES}
                  placeholder="Location"
                  className="pl-12 h-12 bg-transparent border-transparent shadow-none text-base text-zinc-200 focus-visible:ring-0 placeholder:text-zinc-600"
                  value={location}
                  onValueChange={setLocation}
                />
              </div>
              <Button size="lg" className="h-12 rounded-none px-8 font-semibold text-base shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                Search
              </Button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {FILTERS.map((filter) => {
                const Icon = filter.icon;
                const isActive = selectedCategory === filter.value;
                return (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedCategory(filter.value)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-none text-sm font-medium transition-all duration-200 border
                      ${isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:border-foreground/20 hover:text-foreground"}
                    `}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Carousel Section (Only on Dashboard view) */}
        {!isFiltering && (
          <section className="container max-w-7xl mx-auto px-4 pb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                Trending Opportunities
              </h2>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {MOCK_OPPORTUNITIES.filter(o => o.hot).map((opp) => (
                  <CarouselItem key={opp.id} className="pl-4 basis-full">
                    <div className="h-full">
                      <OpportunityCard opportunity={opp} userCountry={userCountry} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </div>
            </Carousel>
          </section>
        )}

        {/* Listings Section */}
        <section className="container max-w-7xl mx-auto px-4 pb-24">

          {isFiltering ? (
            /* Filtered View (Original Layout) */
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight">
                  {filtered.length} {filtered.length === 1 ? 'Opportunity' : 'Opportunities'} Found
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="hidden sm:inline">Sorted by:</span>
                  <select className="bg-transparent border-none text-foreground font-medium focus:ring-0 cursor-pointer">
                    <option>Newest</option>
                    <option>Closing Soon</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filtered.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} userCountry={userCountry} />
                ))}

                {filtered.length === 0 && (
                  <div className="text-center py-32 rounded-none border border-dashed border-border bg-card/30">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-none bg-muted mb-4">
                      <SearchIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No results found</h3>
                    <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                    <Button
                      variant="link"
                      onClick={() => { setSearchTerm(""); setSelectedCategory("All"); setLocation(""); }}
                      className="mt-4 text-primary"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Dashboard View (Categorized) */
            <div className="space-y-16">

              {/* Scholarships Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Scholarships</h2>
                <div className="space-y-4">
                  {getCategorySlice("Scholarships").map(opp => (
                    <OpportunityCard key={opp.id} opportunity={opp} userCountry={userCountry} />
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="link" className="text-muted-foreground hover:text-white p-0 h-auto" onClick={() => setSelectedCategory("Scholarships")}>
                    Browse all Scholarships...
                  </Button>
                </div>
              </div>

              {/* Jobs Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Visa Sponsored Jobs</h2>
                <div className="space-y-4">
                  {getCategorySlice("Jobs").map(opp => (
                    <OpportunityCard key={opp.id} opportunity={opp} userCountry={userCountry} />
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="link" className="text-muted-foreground hover:text-white p-0 h-auto" onClick={() => setSelectedCategory("Jobs")}>
                    Browse all Jobs...
                  </Button>
                </div>
              </div>

              {/* Immigration Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Immigration Pathways</h2>
                <div className="space-y-4">
                  {getCategorySlice("Immigration").map(opp => (
                    <OpportunityCard key={opp.id} opportunity={opp} userCountry={userCountry} />
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="link" className="text-muted-foreground hover:text-white p-0 h-auto" onClick={() => setSelectedCategory("Immigration")}>
                    Browse all Immigration Pathways...
                  </Button>
                </div>
              </div>

              {/* Fellowships Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Fellowships</h2>
                <div className="space-y-4">
                  {getCategorySlice("Fellowships").map(opp => (
                    <OpportunityCard key={opp.id} opportunity={opp} userCountry={userCountry} />
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="link" className="text-muted-foreground hover:text-white p-0 h-auto" onClick={() => setSelectedCategory("Fellowships")}>
                    Browse all Fellowships...
                  </Button>
                </div>
              </div>

              {/* Startups Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Startups</h2>
                <div className="space-y-4">
                  {getCategorySlice("Startups").map(opp => (
                    <OpportunityCard key={opp.id} opportunity={opp} userCountry={userCountry} />
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="link" className="text-muted-foreground hover:text-white p-0 h-auto" onClick={() => setSelectedCategory("Startups")}>
                    Browse all Startups...
                  </Button>
                </div>
              </div>

            </div>
          )}
        </section>
      </main>

      <BrowseCategories />
      <Footer />
    </div>
  );
}
