"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComboboxInput } from "@/components/ui/combobox-input";
import { COUNTRIES } from "@/data/countries";
import { ArrowRight, Bell, CheckCircle2, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type OpportunityCategory =
  | "education"
  | "jobs"
  | "immigration"
  | "fellowships"
  | "builders_funding";

type Opportunity = {
  title: string;
  category: OpportunityCategory;
  sub_category: string;
  image_url: string;
  country: string;
  region: string;
  funding_type: string;
  funding_amount: string;
  equity_required: boolean;
  visa_sponsorship: boolean;
  remote_allowed: boolean;
  target_audience: string[];
  education_level_required: string;
  experience_level_required: string;
  industry: string[];
  deadline: string;
  rolling_deadline: boolean;
  application_url: string;
  official_source_verified: boolean;
  eligibility_summary: string;
  required_documents: string[];
  benefits_summary: string;
  risk_flags: string[];
  confidence_score: number;
};

type OpportunityFormState = {
  title: string;
  category: OpportunityCategory | "";
  sub_category: string;
  terms_accepted: boolean;
  image_url: string;
  country: string;
  region: string;
  funding_type: string;
  funding_amount: string;
  equity_required: "yes" | "no";
  visa_sponsorship: "yes" | "no" | "";
  remote_allowed: "yes" | "no" | "";
  target_audience_raw: string;
  education_level_required: string;
  experience_level_required: string;
  industry_raw: string;
  deadline: string;
  rolling_deadline: boolean;
  application_url: string;
  official_source_verified: "yes" | "no";
  eligibility_summary: string;
  required_documents_raw: string;
  benefits_summary: string;
  risk_flags_raw: string;
  confidence_score: string;
};

const defaultFormState: OpportunityFormState = {
  title: "",
  category: "",
  sub_category: "",
  terms_accepted: false,
  image_url: "",
  country: "",
  region: "Africa",
  funding_type: "",
  funding_amount: "",
  equity_required: "no",
  visa_sponsorship: "",
  remote_allowed: "no",
  target_audience_raw: "African students, African professionals",
  education_level_required: "",
  experience_level_required: "",
  industry_raw: "",
  deadline: "",
  rolling_deadline: false,
  application_url: "",
  official_source_verified: "yes",
  eligibility_summary: "",
  required_documents_raw: "CV, Passport, Academic transcripts",
  benefits_summary: "",
  risk_flags_raw: "",
  confidence_score: "0.8",
};

const categoryOptions: { value: OpportunityCategory; label: string }[] = [
  { value: "education", label: "Education & Scholarships" },
  { value: "jobs", label: "Jobs" },
  { value: "immigration", label: "Immigration & Visas" },
  { value: "fellowships", label: "Fellowships" },
  { value: "builders_funding", label: "Builders Funding / Grants" },
];

function toOpportunityPayload(form: OpportunityFormState): Opportunity | null {
  if (!form.title || !form.category || !form.country || !form.application_url) {
    return null;
  }

  const parseList = (raw: string) =>
    raw
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

  const parseBool = (value: "yes" | "no" | "") =>
    value === "" ? false : value === "yes";

  const confidence = Number.parseFloat(form.confidence_score);
  const confidenceSafe =
    Number.isFinite(confidence) && confidence >= 0 && confidence <= 1
      ? confidence
      : 0.8;

  const payload: Opportunity = {
    title: form.title,
    category: form.category,
    sub_category: form.sub_category,
    image_url: form.image_url.trim(),
    country: form.country,
    region: form.region,
    funding_type: form.funding_type,
    funding_amount: form.funding_amount,
    equity_required: parseBool(form.equity_required),
    visa_sponsorship: parseBool(form.visa_sponsorship),
    remote_allowed: parseBool(form.remote_allowed),
    target_audience: parseList(form.target_audience_raw),
    education_level_required: form.education_level_required,
    experience_level_required: form.experience_level_required,
    industry: parseList(form.industry_raw),
    deadline: form.deadline,
    rolling_deadline: form.rolling_deadline,
    application_url: form.application_url,
    official_source_verified: parseBool(form.official_source_verified),
    eligibility_summary: form.eligibility_summary,
    required_documents: parseList(form.required_documents_raw),
    benefits_summary: form.benefits_summary,
    risk_flags: parseList(form.risk_flags_raw),
    confidence_score: confidenceSafe,
  };

  return payload;
}

export default function PostOpportunityPage() {
  const [form, setForm] = useState<OpportunityFormState>(defaultFormState);
  const [submittedPayload, setSubmittedPayload] = useState<Opportunity | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    <K extends keyof OpportunityFormState>(key: K) =>
    (
      value:
        | OpportunityFormState[K]
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (typeof value === "object" && "target" in value) {
        const v = value.target.value as OpportunityFormState[K];
        setForm((prev) => ({ ...prev, [key]: v }));
      } else {
        setForm((prev) => ({ ...prev, [key]: value }));
      }
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.terms_accepted) {
      setError(
        "Please confirm that this opportunity is real, relevant for African participants, and on an official or reputable website."
      );
      return;
    }

    const payload = toOpportunityPayload(form);
    if (!payload) {
      setError(
        "Please fill in at least Title, Category, Country, and Application URL."
      );
      return;
    }

    setSubmittedPayload(payload);
  };

  const handleReset = () => {
    setForm(defaultFormState);
    setSubmittedPayload(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="container max-w-6xl mx-auto px-4 py-10 md:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-none border border-zinc-800 bg-zinc-950 text-xs font-semibold text-zinc-400 uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 bg-primary" />
              Community Contributions
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Contribute a verified opportunity for Africans
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Share scholarships, jobs, immigration pathways, and funding
              tailored for Africans. We capture everything needed for
              verification and structured search. Every contribution is manually
              reviewed by the Leave the Trenches team before it goes live.
            </p>
          </div>

          <div className="mt-10 max-w-4xl mx-auto">
            <Card className="border border-white/18 bg-white/7 shadow-[0_24px_60px_rgba(15,23,42,0.9)]">
              <CardHeader className="border-b border-white/15 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-none bg-primary/10 border border-primary/40">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </span>
                  Contribute an opportunity
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Fields marked with * are required so we can properly index and
                  verify this opportunity. Contributions are not auto-published;
                  they are first reviewed by our team.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="rounded-none border border-amber-400/60 bg-amber-400/10 px-3 py-2 text-[11px] text-amber-100 backdrop-blur-sm">
                    <span className="font-semibold">Human review:</span> we
                    manually check every contribution against the official
                    source before it appears on the site.
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-1.5 rounded-none border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-300 shadow-[3px_3px_0px_0px_#27272a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#27272a] transition-all"
                      >
                        <Bell className="h-3 w-3" />
                        Contribution info
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-[340px] md:w-[420px] bg-zinc-950 border-zinc-800 rounded-none shadow-[6px_6px_0px_0px_#27272a] p-3 space-y-3"
                    >
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="border border-zinc-800 bg-zinc-950 p-3">
                          <p className="text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-[0.18em]">
                            What we collect
                          </p>
                          <ul className="space-y-1 text-[11px] text-zinc-300 list-disc list-inside">
                            <li>
                              Core details (title, category, country, deadline)
                            </li>
                            <li>Eligibility and benefits summary</li>
                            <li>
                              Official application link and required documents
                            </li>
                          </ul>
                        </div>
                        <div className="border border-zinc-800 bg-zinc-950 p-3">
                          <p className="text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-[0.18em]">
                            Review process
                          </p>
                          <ul className="space-y-1 text-[11px] text-zinc-300 list-disc list-inside">
                            <li>
                              Internal verification against the official source
                            </li>
                            <li>
                              Structured into our global opportunity index
                            </li>
                            <li>Shown on Leave the Trenches once approved</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-[10px] text-zinc-500">
                        We may edit contribution copy for clarity and
                        consistency before publishing.
                      </p>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="space-y-2 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Opportunity title
                    </p>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-300">
                        Opportunity title *
                      </label>
                      <Input
                        placeholder="Example: Global Korea Scholarship (Masters)"
                        value={form.title}
                        onChange={handleChange("title")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Cover image
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 rounded-none border border-dashed border-zinc-700 bg-zinc-950/40 px-3 py-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-none border border-zinc-800 bg-zinc-950">
                          <Upload className="h-5 w-5 text-zinc-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-zinc-200">
                            Paste an image URL for this opportunity
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            Use a landscape banner from the official site or press.
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Image URL
                        </label>
                        <Input
                          type="url"
                          placeholder="https://images.example.com/opportunity-banner.jpg"
                          value={form.image_url}
                          onChange={handleChange("image_url")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Classification
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Category *
                        </label>
                        <Select
                          value={form.category}
                          onValueChange={(value) =>
                            setForm((prev) => ({
                              ...prev,
                              category: value as OpportunityCategory | "",
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Primary category</SelectLabel>
                              {categoryOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Sub-category
                        </label>
                        <Input
                          placeholder="e.g. Masters, Software Engineering"
                          value={form.sub_category}
                          onChange={handleChange("sub_category")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Location
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Country *
                        </label>
                        <ComboboxInput
                          options={COUNTRIES}
                          placeholder="Country of opportunity"
                          value={form.country}
                          onValueChange={(value) =>
                            handleChange("country")(value)
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Region
                        </label>
                        <Input
                          placeholder="e.g. Africa, Europe, Global"
                          value={form.region}
                          onChange={handleChange("region")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Funding details
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Funding type
                        </label>
                        <Input
                          placeholder="e.g. Fully funded, Partial, Salary range"
                          value={form.funding_type}
                          onChange={handleChange("funding_type")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Funding amount
                        </label>
                        <Input
                          placeholder="Optional numeric or text (e.g. $100k grant)"
                          value={form.funding_amount}
                          onChange={handleChange("funding_amount")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Work & visa conditions
                    </p>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Visa sponsorship
                        </label>
                        <Select
                          value={
                            form.visa_sponsorship === ""
                              ? "unsure"
                              : form.visa_sponsorship
                          }
                          onValueChange={(value) =>
                            setForm((prev) => ({
                              ...prev,
                              visa_sponsorship:
                                value === "unsure"
                                  ? ""
                                  : (value as "yes" | "no"),
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Not sure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unsure">Not sure</SelectItem>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Remote allowed
                        </label>
                        <Select
                          value={form.remote_allowed}
                          onValueChange={(value) =>
                            setForm((prev) => ({
                              ...prev,
                              remote_allowed: value as "yes" | "no" | "",
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="On-site / hybrid" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">
                              On-site / hybrid
                            </SelectItem>
                            <SelectItem value="yes">Remote possible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Equity required
                        </label>
                        <Select
                          value={form.equity_required}
                          onValueChange={(value) =>
                            setForm((prev) => ({
                              ...prev,
                              equity_required: value as "yes" | "no",
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="No equity required" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">
                              No equity required
                            </SelectItem>
                            <SelectItem value="yes">
                              Equity / ownership needed
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Application deadline
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Deadline (ISO or text)
                        </label>
                        <Input
                          placeholder="2026-03-31 or Rolling"
                          value={form.deadline}
                          onChange={handleChange("deadline")}
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input
                          id="rolling_deadline"
                          type="checkbox"
                          className="h-4 w-4 border-2 border-zinc-700 bg-zinc-950 text-primary"
                          checked={form.rolling_deadline}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              rolling_deadline: e.target.checked,
                            }))
                          }
                        />
                        <label
                          htmlFor="rolling_deadline"
                          className="text-xs text-zinc-300 select-none"
                        >
                          This opportunity has a rolling deadline
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Official application
                    </p>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-300">
                        Official application URL *
                      </label>
                      <Input
                        type="url"
                        placeholder="https://officialwebsite.com/apply"
                        value={form.application_url}
                        onChange={handleChange("application_url")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Audience & taxonomy
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Target audience (comma separated)
                        </label>
                        <Input
                          placeholder="African students, African professionals"
                          value={form.target_audience_raw}
                          onChange={handleChange("target_audience_raw")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Industry tags (comma separated)
                        </label>
                        <Input
                          placeholder="Fintech, Climate, Web3"
                          value={form.industry_raw}
                          onChange={handleChange("industry_raw")}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Education level required
                        </label>
                        <Input
                          placeholder="High school, Bachelors, Masters, PhD, Any"
                          value={form.education_level_required}
                          onChange={handleChange("education_level_required")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Experience level required
                        </label>
                        <Input
                          placeholder="Entry, Mid, Senior, 3+ years"
                          value={form.experience_level_required}
                          onChange={handleChange("experience_level_required")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Eligibility summary
                    </p>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-300">
                        Eligibility summary *
                      </label>
                      <textarea
                        placeholder="Short bullet-style summary of who is eligible, focusing on African applicants."
                        className="min-h-[80px] w-full rounded-none border-2 border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-[4px_4px_0px_0px_#27272a] focus:shadow-none transition-all"
                        value={form.eligibility_summary}
                        onChange={handleChange("eligibility_summary")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Benefits summary
                    </p>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-300">
                        Benefits summary *
                      </label>
                      <textarea
                        placeholder="Stipend, tuition coverage, relocation support, mentorship, visa benefits, etc."
                        className="min-h-[80px] w-full rounded-none border-2 border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-[4px_4px_0px_0px_#27272a] focus:shadow-none transition-all"
                        value={form.benefits_summary}
                        onChange={handleChange("benefits_summary")}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Required documents
                    </p>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-300">
                        Required documents (comma separated)
                      </label>
                      <Input
                        placeholder="CV, Passport, Academic transcripts, Recommendation letters"
                        value={form.required_documents_raw}
                        onChange={handleChange("required_documents_raw")}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 border-b border-zinc-800 pb-5">
                    <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.18em]">
                      Quality signals
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 items-start">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          Risk flags (comma separated, optional)
                        </label>
                        <Input
                          placeholder="New program, Tight deadline, Competitive, Early-stage website"
                          value={form.risk_flags_raw}
                          onChange={handleChange("risk_flags_raw")}
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-zinc-300">
                            Official source verified
                          </label>
                          <Select
                            value={form.official_source_verified}
                            onValueChange={(value) =>
                              setForm((prev) => ({
                                ...prev,
                                official_source_verified:
                                  value as "yes" | "no",
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">
                                Yes, I checked the official site
                              </SelectItem>
                              <SelectItem value="no">
                                Not fully verified yet
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-zinc-300">
                            Confidence score (0 to 1)
                          </label>
                          <Input
                            type="number"
                            step="0.05"
                            min="0"
                            max="1"
                            value={form.confidence_score}
                            onChange={handleChange("confidence_score")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-none border border-red-900 bg-red-950/40 px-3 py-2 text-xs text-red-200">
                      {error}
                    </div>
                  )}

                  <div className="mt-2">
                    <label className="flex items-start gap-2 text-[11px] text-zinc-300">
                      <input
                        type="checkbox"
                        className="mt-[2px] h-4 w-4 border-2 border-zinc-700 bg-zinc-950 text-primary"
                        checked={form.terms_accepted}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            terms_accepted: e.target.checked,
                          }))
                        }
                      />
                      <span>
                        By contributing, I confirm this opportunity is real, relevant
                        for African participants, and hosted on an official or reputable
                        website. I understand that the team may edit copy for clarity
                        and consistency.
                      </span>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button
                        type="submit"
                        className="flex-1 sm:flex-none h-10 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0px_0px_#27272a] hover:shadow-[2px_2px_0px_0px_#27272a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm font-semibold"
                      >
                        Contribute for review
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 sm:flex-none h-10 rounded-none border-zinc-700 text-zinc-300 hover:bg-zinc-900"
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    </div>
                    <p className="text-[10px] text-zinc-500 max-w-xs">
                      We do not publish raw contributions automatically. Every
                      opportunity is reviewed by the Leave the Trenches team.
                    </p>
                  </div>
                </form>

                {submittedPayload && (
                  <div className="mt-6 border-t border-zinc-900 pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>
                        Contribution captured. You can copy the structured JSON
                        below for backend or manual review.
                      </span>
                    </div>
                    <pre className="max-h-64 overflow-auto rounded-none border border-zinc-800 bg-black/70 p-3 text-[10px] leading-relaxed text-zinc-200">
{JSON.stringify(submittedPayload, null, 2)}
                    </pre>
                    <p className="text-[10px] text-zinc-500">
                      This payload matches the internal{" "}
                      <code className="font-mono text-[10px]">Opportunity</code>{" "}
                      type used by our scrapers and data pipeline.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-xs text-zinc-500 flex flex-wrap items-center gap-2">
            <span>Need help deciding if something is suitable?</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Explore existing opportunities
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
