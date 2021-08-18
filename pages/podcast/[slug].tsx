import { useEffect } from "react";
import { GetStaticProps } from "next";
import EpisodeProps from "utils/types/EpisodeProps";
import markdownToHtml from "utils/markdownToHtml";
import { getAllEpisodes, getEpisodeBySlug } from "utils/podcastApi";
import Head from "components/layout/Head";
import EpisodePage from "components/podcast/EpisodePage";
import PageClipper from "components/layout/PageClipper";
import ResourceFooter from "components/shared/footers/ResourceFooter";

export default function Episodio({ locale, setTitle, episode }) {
  useEffect(() => {
    setTitle("Episodio");
  }, [locale]);

  return (
    <PageClipper>
      <Head 
        title={episode.title + " | " + episode.guest + ", " + episode.business}
        description={episode.description}
        headerTitle="Episodio"
        es_canonical={`https://acueducto.studio/podcast/${episode.slug}`}
        image={{
          fileName: `og_image_e${episode.episode}.png`,
          alt: episode.title + " | " + episode.guest + ", " + episode.business,
        }}
      ></Head>
      <EpisodePage {...episode} slug={episode.slug} />
      <ResourceFooter shadow identify={episode.slug} />
    </PageClipper>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const episode: EpisodeProps = getEpisodeBySlug(context.params.slug, [
    "title",
    "guest",
    "date",
    "business",
    "category",
    "description",
    "episode",
    "slug",
    "spotify",
    "apple",
    "google",
    "youtube",
    "content",
  ]);
  const content = await markdownToHtml(episode.content || "");
  if (!episode) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      episode: {
        ...episode,
        content,
      },
    },
  };
};

export async function getStaticPaths() {
  const episodes = getAllEpisodes(["slug"]);
  return {
    paths: episodes.map((episode: EpisodeProps) => {
      return {
        params: {
          slug: episode.slug,
        },
      };
    }),
    fallback: false,
  };
}
