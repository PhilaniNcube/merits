/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Events from '../../components/Homepage/Events';
import { API_URL } from '../../config';
import qs from 'qs';

const SearchPage = ({ events }) => {
  const router = useRouter();

  return (
    <Fragment>
      <div className="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
        <div className="max-w-xl mx-auto lg:max-w-screen-xl">
          <div className="mb-16 lg:max-w-lg lg:mb-0">
            <div className="max-w-xl mb-6">
              <div></div>
              <Link href="/events">
                <a className="bg-blue-300 hover:bg-blue-700 hover:text-white text-gray-800 uppercase font-medium transition py-3 px-6 rounded mt-2 mb-2">
                  Back To Events
                </a>
              </Link>
              <h1 className="max-w-lg mt-6 mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Search Results for{' '}
                <span className="text-red-400 underline">
                  {router.query.term}
                </span>
              </h1>
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
    </Fragment>
  );
};

export default SearchPage;

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { description_contains: term },
        { type_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
