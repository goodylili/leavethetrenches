import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { Opportunity } from "./types";
import { scrapeGitcoin } from "./bounties/gitcoin";
import { scrapeHackerOne } from "./bounties/hackerone";
import { scrapeBugcrowd } from "./bounties/bugcrowd";
import { scrapeOpenBugBounty } from "./bounties/open_bug_bounty";
import { scrapeTopcoderBounties } from "./bounties/topcoder";
import { scrapeSuperteamEarn } from "./bounties/superteam_earn";
import { scrapeLayer3 } from "./bounties/layer3";
import { scrapeImmunefi } from "./bounties/immunefi";
import { scrapeCode4rena } from "./bounties/code4rena";
import { scrapeLumaBounties } from "./bounties/luma";
import { scrapeKaggleCompetitions } from "./competitions/kaggle";
import { scrapeDevpostHackathons } from "./competitions/devpost";
import { scrapeHackerEarthChallenges } from "./competitions/hackerearth_challenges";
import { scrapeCodeforcesContests } from "./competitions/codeforces";
import { scrapeTopcoderCompetitions } from "./competitions/topcoder";
import { scrapeLeetCodeContests } from "./competitions/leetcode_contests";
import { scrapeCodeChefContests } from "./competitions/codechef";
import { scrapeHackerRankContests } from "./competitions/hackerrank_contests";
import { scrapeDevfolioHackathons } from "./competitions/devfolio";
import { scrapeMajorLeagueHacking } from "./competitions/mlh";
import { scrapeLuma } from "./events/luma";
import { scrapeEventbrite } from "./events/eventbrite";
import { scrapeTixAfricaEvents } from "./events/tix_africa";
import { scrapeMeetupEvents } from "./events/meetup";
import { scrapeTechpointAfricaEvents } from "./events/techpoint_africa_events";
import { scrapeGDGAndDSCEvents } from "./events/gdg_dsc";
import { scrapeOpportunitiesForAfricansFellowships } from "./fellowships/opportunities_for_africans";
import { scrapeAfterSchoolAfricaFellowships } from "./fellowships/afterschool_africa";
import { scrapeOpportunityDeskFellowships } from "./fellowships/opportunity_desk";
import { scrapeScholars4DevFellowships } from "./fellowships/scholars4dev";
import { scrapeWorldBankYPPAndFellowships } from "./fellowships/world_bank_ypp";
import { scrapeMandelaWashingtonFellowship } from "./fellowships/mandela_washington";
import { scrapeObamaFoundationScholars } from "./fellowships/obama_foundation_scholars";
import { scrapeAtlanticFellows } from "./fellowships/atlantic_fellows";
import { scrapeSchwarzmanScholars } from "./fellowships/schwarzman_scholars";
import { scrapeAshokaFellowship } from "./fellowships/ashoka_fellowship";
import { scrapeGrantsGov } from "./grants/grants_gov";
import { scrapeEUFundingTendersGrants } from "./grants/eu_funding_tenders";
import { scrapeFordFoundationGrants } from "./grants/ford_foundation";
import { scrapeOpenSocietyFoundationsGrants } from "./grants/open_society_foundations";
import { scrapeAfDBGrantsAndTenders } from "./grants/afdb";
import { scrapeUSAIDGrantsAndContracts } from "./grants/usaid";
import { scrapeGlobalInnovationFund } from "./grants/global_innovation_fund";
import { scrapeGoogleFundingPrograms } from "./grants/google_funding";
import { scrapeUNDPFundingAndProcurement } from "./grants/undp";
import { scrapeAfricanUnionOpportunities } from "./grants/african_union";
import { scrapeCanadaImmigration } from "./immigration/canada_immigration";
import { scrapeUKHomeOfficeImmigration } from "./immigration/uk_home_office";
import { scrapeUSCISImmigration } from "./immigration/uscis";
import { scrapeAustraliaHomeAffairsImmigration } from "./immigration/australia_home_affairs";
import { scrapeNewZealandImmigration } from "./immigration/new_zealand_immigration";
import { scrapeMakeItInGermanyImmigration } from "./immigration/make_it_in_germany";
import { scrapeNetherlandsINDImmigration } from "./immigration/netherlands_ind";
import { scrapeEUImmigrationPortal } from "./immigration/eu_immigration_portal";
import { scrapeIrishImmigrationService } from "./immigration/irish_immigration_service";
import { scrapePortugalImmigration } from "./immigration/portugal_immigration";
import { scrapeRemote4Africa } from "./jobs/remote4africa";
import { scrapeIndeedJobs } from "./jobs/indeed";
import { scrapeGlassdoorJobs } from "./jobs/glassdoor";
import { scrapeJobbermanJobs } from "./jobs/jobberman";
import { scrapeBrighterMondayJobs } from "./jobs/brightermonday";
import { scrapeRemoteOKJobs } from "./jobs/remoteok";
import { scrapeWeWorkRemotelyJobs } from "./jobs/weworkremotely";
import { scrapeWellfoundJobs } from "./jobs/wellfound";
import { scrapeMonsterJobs } from "./jobs/monster";
import { scrapeZipRecruiterJobs } from "./jobs/ziprecruiter";
import { scrapeFlexJobs } from "./jobs/flexjobs";
import { scrapeFuzuJobs } from "./jobs/fuzu";
import { scrapeEUFundingTendersResearch } from "./research/eu_funding_tenders";
import { scrapeNIHResearchFunding } from "./research/nih";
import { scrapeWellcomeTrustFunding } from "./research/wellcome_trust";
import { scrapeAfricanAcademyOfSciencesFunding } from "./research/aas";
import { scrapeUKRIFundingFinder } from "./research/ukri";
import { scrapeNSFResearchFunding } from "./research/nsf";
import { scrapeGatesFoundationGrants } from "./research/gates_foundation";
import { scrapeIDRCResearchFunding } from "./research/idrc";
import { scrapeTWASOpportunities } from "./research/twas";
import { scrapeARUAOpportunities } from "./research/arua";
import { scrapeOpportunitiesForAfricansScholarships } from "./scholarships/opportunities_for_africans";
import { scrapeAfterSchoolAfricaScholarships } from "./scholarships/afterschool_africa";
import { scrapeAdvanceAfricaScholarships } from "./scholarships/advance_africa";
import { scrapeScholars4DevScholarships } from "./scholarships/scholars4dev";
import { scrapeScholarshipSetScholarships } from "./scholarships/scholarshipset";
import { scrapeOpportunityDeskScholarships } from "./scholarships/opportunity_desk";
import { scrapeScholarshipPositionsScholarships } from "./scholarships/scholarshippositions";
import { scrapeStudyportalsScholarships } from "./scholarships/studyportals_scholarships";
import { scrapeInternationalScholarships } from "./scholarships/international_scholarships";
import { scrapeDAADScholarshipsDatabase } from "./scholarships/daad_scholarships_db";
import { scrapeDAADForAfricanStudents } from "./external_education/daad_africa";
import { scrapeCheveningScholarships } from "./external_education/chevening";
import { scrapeErasmusPlusStudentOpportunities } from "./external_education/erasmus_plus";
import { scrapeFulbrightForeignStudentProgram } from "./external_education/fulbright_foreign_student";
import { scrapeMastercardFoundationScholars } from "./external_education/mastercard_scholars";
import { scrapeCommonwealthScholarships } from "./external_education/commonwealth_scholarships";
import { scrapeCampusFrancePrograms } from "./external_education/campus_france";
import { scrapeSwedishInstituteScholarships } from "./external_education/swedish_institute_scholarships";
import { scrapeEducationUSAGlobalPrograms } from "./external_education/educationusa";
import { scrapeStudyportalsPrograms } from "./external_education/studyportals_programs";

type SourceConfig = {
  id: number;
  category: string;
  name: string;
  url: string;
  scraperKey: string;
  scraped: boolean;
};

const SOURCES_PATH = path.join(process.cwd(), "sources.json");

function loadSources(): SourceConfig[] {
  const raw = fs.readFileSync(SOURCES_PATH, "utf-8");
  return JSON.parse(raw) as SourceConfig[];
}

function saveSources(sources: SourceConfig[]): void {
  const formatted = JSON.stringify(sources, null, 2);
  fs.writeFileSync(SOURCES_PATH, formatted);
}

const scrapers: Record<string, () => Promise<Opportunity[]>> = {
  "bounties.gitcoin": scrapeGitcoin,
  "bounties.hackerone": scrapeHackerOne,
  "bounties.bugcrowd": scrapeBugcrowd,
  "bounties.open_bug_bounty": scrapeOpenBugBounty,
  "bounties.topcoder": scrapeTopcoderBounties,
  "bounties.superteam_earn": scrapeSuperteamEarn,
  "bounties.layer3": scrapeLayer3,
  "bounties.immunefi": scrapeImmunefi,
  "bounties.code4rena": scrapeCode4rena,
  "bounties.luma": scrapeLumaBounties,
  "competitions.kaggle": scrapeKaggleCompetitions,
  "competitions.devpost": scrapeDevpostHackathons,
  "competitions.hackerearth_challenges": scrapeHackerEarthChallenges,
  "competitions.codeforces": scrapeCodeforcesContests,
  "competitions.topcoder": scrapeTopcoderCompetitions,
  "competitions.leetcode_contests": scrapeLeetCodeContests,
  "competitions.codechef": scrapeCodeChefContests,
  "competitions.hackerrank_contests": scrapeHackerRankContests,
  "competitions.devfolio": scrapeDevfolioHackathons,
  "competitions.mlh": scrapeMajorLeagueHacking,
  "events.luma": scrapeLuma,
  "events.eventbrite": scrapeEventbrite,
  "events.tix_africa": scrapeTixAfricaEvents,
  "events.meetup": scrapeMeetupEvents,
  "events.techpoint_africa_events": scrapeTechpointAfricaEvents,
  "events.gdg_dsc": scrapeGDGAndDSCEvents,
  "fellowships.opportunities_for_africans": scrapeOpportunitiesForAfricansFellowships,
  "fellowships.afterschool_africa": scrapeAfterSchoolAfricaFellowships,
  "fellowships.opportunity_desk": scrapeOpportunityDeskFellowships,
  "fellowships.scholars4dev": scrapeScholars4DevFellowships,
  "fellowships.world_bank_ypp": scrapeWorldBankYPPAndFellowships,
  "fellowships.mandela_washington": scrapeMandelaWashingtonFellowship,
  "fellowships.obama_foundation_scholars": scrapeObamaFoundationScholars,
  "fellowships.atlantic_fellows": scrapeAtlanticFellows,
  "fellowships.schwarzman_scholars": scrapeSchwarzmanScholars,
  "fellowships.ashoka_fellowship": scrapeAshokaFellowship,
  "grants.grants_gov": scrapeGrantsGov,
  "grants.eu_funding_tenders": scrapeEUFundingTendersGrants,
  "grants.ford_foundation": scrapeFordFoundationGrants,
  "grants.open_society_foundations": scrapeOpenSocietyFoundationsGrants,
  "grants.afdb": scrapeAfDBGrantsAndTenders,
  "grants.usaid": scrapeUSAIDGrantsAndContracts,
  "grants.global_innovation_fund": scrapeGlobalInnovationFund,
  "grants.google_funding": scrapeGoogleFundingPrograms,
  "grants.undp": scrapeUNDPFundingAndProcurement,
  "grants.african_union": scrapeAfricanUnionOpportunities,
  "immigration.canada_immigration": scrapeCanadaImmigration,
  "immigration.uk_home_office": scrapeUKHomeOfficeImmigration,
  "immigration.uscis": scrapeUSCISImmigration,
  "immigration.australia_home_affairs": scrapeAustraliaHomeAffairsImmigration,
  "immigration.new_zealand_immigration": scrapeNewZealandImmigration,
  "immigration.make_it_in_germany": scrapeMakeItInGermanyImmigration,
  "immigration.netherlands_ind": scrapeNetherlandsINDImmigration,
  "immigration.eu_immigration_portal": scrapeEUImmigrationPortal,
  "immigration.irish_immigration_service": scrapeIrishImmigrationService,
  "immigration.portugal_immigration": scrapePortugalImmigration,
  "jobs.remote4africa": scrapeRemote4Africa,
  "jobs.indeed": scrapeIndeedJobs,
  "jobs.glassdoor": scrapeGlassdoorJobs,
  "jobs.jobberman": scrapeJobbermanJobs,
  "jobs.brightermonday": scrapeBrighterMondayJobs,
  "jobs.remoteok": scrapeRemoteOKJobs,
  "jobs.weworkremotely": scrapeWeWorkRemotelyJobs,
  "jobs.wellfound": scrapeWellfoundJobs,
  "jobs.monster": scrapeMonsterJobs,
  "jobs.ziprecruiter": scrapeZipRecruiterJobs,
  "jobs.flexjobs": scrapeFlexJobs,
  "jobs.fuzu": scrapeFuzuJobs,
  "research.eu_funding_tenders": scrapeEUFundingTendersResearch,
  "research.nih": scrapeNIHResearchFunding,
  "research.wellcome_trust": scrapeWellcomeTrustFunding,
  "research.aas": scrapeAfricanAcademyOfSciencesFunding,
  "research.ukri": scrapeUKRIFundingFinder,
  "research.nsf": scrapeNSFResearchFunding,
  "research.gates_foundation": scrapeGatesFoundationGrants,
  "research.idrc": scrapeIDRCResearchFunding,
  "research.twas": scrapeTWASOpportunities,
  "research.arua": scrapeARUAOpportunities,
  "scholarships.opportunities_for_africans": scrapeOpportunitiesForAfricansScholarships,
  "scholarships.afterschool_africa": scrapeAfterSchoolAfricaScholarships,
  "scholarships.advance_africa": scrapeAdvanceAfricaScholarships,
  "scholarships.scholars4dev": scrapeScholars4DevScholarships,
  "scholarships.scholarshipset": scrapeScholarshipSetScholarships,
  "scholarships.opportunity_desk": scrapeOpportunityDeskScholarships,
  "scholarships.scholarshippositions": scrapeScholarshipPositionsScholarships,
  "scholarships.studyportals_scholarships": scrapeStudyportalsScholarships,
  "scholarships.international_scholarships": scrapeInternationalScholarships,
  "scholarships.daad_scholarships_db": scrapeDAADScholarshipsDatabase,
  "external_education.daad_africa": scrapeDAADForAfricanStudents,
  "external_education.chevening": scrapeCheveningScholarships,
  "external_education.erasmus_plus": scrapeErasmusPlusStudentOpportunities,
  "external_education.fulbright_foreign_student": scrapeFulbrightForeignStudentProgram,
  "external_education.mastercard_scholars": scrapeMastercardFoundationScholars,
  "external_education.commonwealth_scholarships": scrapeCommonwealthScholarships,
  "external_education.campus_france": scrapeCampusFrancePrograms,
  "external_education.swedish_institute_scholarships": scrapeSwedishInstituteScholarships,
  "external_education.educationusa": scrapeEducationUSAGlobalPrograms,
  "external_education.studyportals_programs": scrapeStudyportalsPrograms
};

async function run(): Promise<void> {
  const sources = loadSources();

  for (const source of sources) {
    if (source.scraped) {
      continue;
    }

    const scraper = scrapers[source.scraperKey];
    if (!scraper) {
      console.warn(`Scraper not found for key: ${source.scraperKey}`);
      continue;
    }

    console.log(`Scraping ${source.name}...`);
    try {
      const opportunities = await scraper();

      if (opportunities.length === 0) {
        console.warn(`No opportunities found for ${source.name}. Skipping update.`);
        continue;
      }

      const outDir = path.join(process.cwd(), "scraped", source.category);
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      const fileName = `${source.id}.json`;
      const outPath = path.join(outDir, fileName);
      fs.writeFileSync(outPath, JSON.stringify(opportunities, null, 2));

      source.scraped = true;
      saveSources(sources);

      console.log(`Success: Found ${opportunities.length} opportunities for ${source.name}.`);

      try {
        execSync("git add .");
        execSync(`git commit -m "Scrape ${source.name}"`);
        execSync("git push");
        console.log("Pushed to GitHub.");
      } catch (gitError) {
        console.error("Git push failed:", gitError);
      }

    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error);
    }
  }
}

run().catch((error) => {
  console.error(error);
});

