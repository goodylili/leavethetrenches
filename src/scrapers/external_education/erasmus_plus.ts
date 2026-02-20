import { Opportunity, SiteScraper } from "../types";

const SOURCE_URL =
  "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students";

export const scrapeErasmusPlusStudentOpportunities: SiteScraper =
  async () => {
    const opportunities: Opportunity[] = [];

    return opportunities;
  };

