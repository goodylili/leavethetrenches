import { Opportunity, SiteScraper } from "../types";

const SOURCE_URL =
  "https://www.daad.de/en/study-and-research-in-germany/scholarships/";

export const scrapeDAADScholarshipsDatabase: SiteScraper = async () => {
  const opportunities: Opportunity[] = [];

  return opportunities;
};

