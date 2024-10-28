import Head from "next/head";
import EventPage from "@/components/eventPage/Pages/EventPage";
import staticEventsData from "@/components/eventPage/Data/EventData";

export default function Event({ eventData }) {
  return (
    <>
      <Head>
        <title>{eventData.title}</title>
        <meta name="description" content={eventData.shortDescription} />
        <meta property="og:title" content={eventData.title} />
        <meta property="og:description" content={eventData.shortDescription} />
        <meta property="og:image" content={eventData.thumbnail} />
      </Head>
      <EventPage eventData={eventData} />
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const event = staticEventsData.find((event) => event.slug === slug);
  if (event) {
    return {
      props: {
        eventData: event
      },
      revalidate: 20
    };
  } else {
    return {
      notFound: true
    };
  }
};

export async function getStaticPaths() {
  const paths = staticEventsData.map((event) => ({
    params: { slug: event.slug }
  }));
  return {
    paths: paths,
    fallback: false // can also be true or 'blocking'
  };
}
