/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Events from '../../components/Homepage/Events';
import { API_URL, PER_PAGE } from '../../config';

const index = ({ events, page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <Fragment>
      <div className="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
        <div className="max-w-xl mx-auto lg:max-w-screen-xl">
          <div className="mb-16 lg:max-w-lg lg:mb-0">
            <div className="max-w-xl mb-6">
              <div></div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Events
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Checkout events happenning at schools in your area
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
          <span className="object-cover object-top w-full z-0 h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md">
            <Image
              src="/images/library.jpg"
              alt=""
              width={1920}
              height={1280}
              className="object-cover object-top w-full z-0 h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
            />
          </span>
        </div>
      </div>
      <Events events={events} />
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex max-w-7xl mx-auto justify-between">
          {page > 1 && (
            <Link href={`/events?page=${page - 1}`}>
              <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </a>
            </Link>
          )}
          {page < lastPage && (
            <Link href={`/events?page=${page + 1}`}>
              <a className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </a>
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default index;

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const res = await fetch(
    `${API_URL}/events?_sort=date:DESC&_limit=${PER_PAGE}&_start=${start}`,
  );
  const events = await res.json();

  // Fecth total events
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  return {
    props: {
      events,
      page: +page,
      total,
    },
  };
}
