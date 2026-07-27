import { PostHeader } from "@/components/PostHeader";
import { H2 } from "@/components/Headings";
import InlineLink from "@/components/InlineLink";
import Figure from "@/components/Figure";
import { createMetadata } from "@/lib/metadata";
import { getProjectBySlug } from "@/lib/projects";
import countryTable from "@/public/images/postpub-country-table.png";
import retractionsOverTime from "@/public/images/postpub-retractions-over-time.png";

const project = getProjectBySlug("postpub");

export async function generateMetadata() {
  return createMetadata(project, "/projects");
}

export default function PostPub() {
  return (
    <>
      <PostHeader post={project} />

      <div className="space-y-4">
        <p>
          <strong>PostPub</strong> is a dashboard that makes research
          retractions legible. It sits on top of the{" "}
          <InlineLink href="https://retractionwatch.com/">
            Retraction Watch
          </InlineLink>{" "}
          database and turns it into something you can actually browse —
          retraction rates by country and by institution, tracked over time,
          with the stated reason for each retraction classified against an
          established taxonomy of misconduct.
        </p>

        <p>
          The premise is that retractions are a lagging but honest signal of
          research misconduct, and that the signal is only useful if somebody
          watches it <em>continuously</em>. A single study goes stale the year
          it publishes; a dashboard doesn't. It's built for journalists,
          policymakers, and librarians — people who need to ask "where is this
          getting worse?" and get an answer without doing the data engineering
          first.
        </p>

        <H2>The dashboard</H2>

        <Figure
          src={countryTable}
          alt="PostPub country table showing retraction totals, rates and reason breakdowns for China, the United States, India and other countries."
          caption="Country view: totals, rate per 1,000 papers, a reason breakdown, and a trend sparkline per country."
        />

        <p>
          The interesting column isn't the total — it's the rate. Ranked by raw
          count, the list reads like a ranking of how much science a country
          publishes: China first, then the United States, then India. Normalised
          to retractions per 1,000 papers, the order changes completely. Saudi
          Arabia sits near the top at <strong>4.68</strong> while the United
          States drops to <strong>0.41</strong>, an order of magnitude lower on
          a far larger body of work.
        </p>

        <p>
          That gap is the whole argument for the tool. Raw counts flatter big
          publishers and punish productive ones; rates surface where the problem
          is actually concentrated. Each row also splits retractions by reason —
          serious misconduct, integrity, research error, supplemental — so a
          high number can be read for what caused it rather than treated as one
          undifferentiated score.
        </p>

        <Figure
          src={retractionsOverTime}
          alt="Animated bar chart race of cumulative retractions by country from 1996 to 2025, ending with China at 34,368 and a global total of 75,894."
          caption="Cumulative retractions by country, 1996–2025. The total crosses 75,000 by the end of the run."
        />

        <p>
          Played over time, the shape of the problem is growth. The cumulative
          count passes <strong>75,000</strong> retractions by 2025, and most of
          that curve steepens in the last decade — which is either evidence that
          misconduct is rising or evidence that detection is finally catching
          up. Probably both.
        </p>

        <H2>Research</H2>

        <p>
          The work is published as{" "}
          <InlineLink href="https://doi.org/10.51408/issi2025_097">
            A Dashboard to Visualize Retraction Statistics
          </InlineLink>
          , presented at <strong>ISSI 2025</strong> and written with Achal
          Agrawal (India Research Watch) and Moumita Koley (DST-Centre for
          Policy Research, IISc).
        </p>

        <p>
          The institute-wise view was highlighted in{" "}
          <InlineLink href="https://www.nature.com/articles/d41586-025-00455-y">
            Nature
          </InlineLink>
          , in Richard Van Noorden's reporting on which universities carry the
          most retracted articles, for its role in visualizing institute-wise
          retraction trends globally.
        </p>

        <H2>Funding</H2>

        <p>
          The work is funded by a seed grant from the{" "}
          <InlineLink href="https://www.orfg.org/">
            Open Research Funders Group
          </InlineLink>{" "}
          and by a{" "}
          <InlineLink href="https://www.digital-science.com/press-releases/digital-science-catalyst-grant-winners-research-integrity/">
            Digital Science Catalyst Grant
          </InlineLink>
          , awarded in the 2024 round for work on research integrity.
        </p>
      </div>

      <hr />

      <div className="flex flex-wrap gap-4 text-xs">
        <InlineLink href="https://postpub.net">Retraction Dashboard</InlineLink>
        <InlineLink href="https://doi.org/10.51408/issi2025_097">
          Read the paper
        </InlineLink>
        <InlineLink href="https://www.nature.com/articles/d41586-025-00455-y">
          Nature coverage
        </InlineLink>
      </div>
    </>
  );
}
