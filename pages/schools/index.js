import React from 'react';
import SchoolList from '../../components/Schools/SchoolList';
import SchoolsHero from '../../components/SchoolsPage/SchoolsHero';
import { API_URL, PER_PAGE } from '../../config/index';

const index = ({ schools, page, total }) => {
  console.log(schools);
  return (
    <div>
      <SchoolList schools={schools} />
    </div>
  );
};

export default index;

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/schools/count`);
  const total = await totalRes.json();

  // Fetch events
  const schoolRes = await fetch(
    `${API_URL}/schools?_sort=created_at:ASC&_limit=${PER_PAGE}&_start=${start}`,
  );
  const schools = await schoolRes.json();

  return {
    props: { schools, page: +page, total },
  };
}
