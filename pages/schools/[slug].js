import React, { Fragment } from 'react';
import { SchoolHero } from '../../components/Schools/SchoolHero';
import { API_URL } from '../../config';

const school = ({ school }) => {
  console.log(school);
  return (
    <Fragment>
      <SchoolHero school={school} />
    </Fragment>
  );
};

export default school;

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/schools?slug=${slug}`);
  const schools = await res.json();

  return {
    props: {
      school: schools[0],
    },
  };
}
