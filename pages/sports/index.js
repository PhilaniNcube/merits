import React, { Fragment } from 'react';
import Image from 'next/image';
import { API_URL, PER_PAGE } from '../../config';
import { SportsList } from '../../components/Sports/SportsList';

const Sports = ({ sports }) => {
  return (
    <Fragment>
      <section>
        <div className="">
          <div className="container flex flex-col items-center px-4 py-4 pb-4 mx-auto text-center lg:pb-8 md:py-4 md:px-10 lg:px-32 text-gray-900">
            <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-900">
              School Sports
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-coolGray-900">
              High school sports are an important part of a well rounded student
              life.
            </p>
          </div>
        </div>
      </section>
      <SportsList sports={sports} />
    </Fragment>
  );
};

export default Sports;

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/sports/count`);
  const total = await totalRes.json();

  // Fetch events
  const schoolRes = await fetch(
    `${API_URL}/sports?_sort=created_at:ASC&_limit=${PER_PAGE}&_start=${start}`,
  );
  const sports = await schoolRes.json();

  return {
    props: { sports, page: +page, total },
  };
}
