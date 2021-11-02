import { Fragment } from 'react';
import Events from '../components/Homepage/Events';
import { FeaturedSchools } from '../components/Homepage/FeaturedSchools';
import { Feature } from '../components/Homepage/Features';
import HomepageHero from '../components/Homepage/HomepageHero';

export default function Home({ events }) {
  console.log(events);
  return (
    <Fragment>
      <Events events={events} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const res = await fetch('http://localhost:1337/schools');
  const schools = await res.json();
  const eventsRes = await fetch('http://localhost:1337/events');
  const events = await eventsRes.json();

  return {
    props: {
      schools: schools,
      events: events,
    },
    revalidate: 1,
  };
}
