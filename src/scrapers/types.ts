export type OpportunityCategory =
  | "education"
  | "immigration"
  | "jobs"
  | "fellowships"
  | "builders_funding";

export type Opportunity = {
  title: string;
  category: OpportunityCategory;
  sub_category: string;
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

export type SiteScraper = () => Promise<Opportunity[]>;

