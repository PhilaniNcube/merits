import React from 'react';
import SchoolList from '../../components/Schools/SchoolList';
import { API_URL } from '../../config/index';

const index = ({ schools }) => {
  console.log(schools);
  return (
    <div>
      <SchoolList schools={schools} />
    </div>
  );
};

export default index;

export async function getServerSideProps() {
  // calculate start page

  // Fetch events
  const schoolRes = await fetch(`${API_URL}/schools`);
  const schools = await schoolRes.json();

  return {
    props: { schools },
  };
}
