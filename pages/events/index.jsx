import Head from "next/head";
import EventsSection from "@/components/eventPage/eventsSection/EventsSection";

const Events = () => {
  return (
    <div>
      <Head>
        <title>Events | Geek Room Plaksha</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventsSection />
    </div>
  );
};

export default Events;
