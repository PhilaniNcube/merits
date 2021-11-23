import { Fragment } from 'react';
import Events from '../components/Homepage/Events';
import { API_URL } from '../config/index';

export default function Home({ events }) {
  console.log(events);
  return (
    <Fragment>
      <Events events={events} />
    </Fragment>
  );
}

export async function getServerSideProps() {
  const eventsRes = await fetch(`${API_URL}/events?_sort=date:DESC`);
  const events = await eventsRes.json();

  return {
    props: {
      events: events,
    },
  };
}
