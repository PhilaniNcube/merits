/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { Fragment } from 'react';
import Image from 'next/image';
import Events from '../../components/Homepage/Events';
import { API_URL } from '../../config';

const index = ({ events }) => {
  console.log(events);

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
              src="https://kitwind.io/assets/kometa/full-browser.png"
              alt=""
              width={1920}
              height={1280}
            />
          </span>
        </div>
      </div>
      <Events events={events} />
    </Fragment>
  );
};

export default index;

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:DESC`);
  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
