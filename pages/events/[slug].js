/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { API_URL } from '../../config';
import Link from 'next/link';

const Event = ({ event }) => {
  console.log(event);
  return (
    <div className="container px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl mb-6">
            <h1 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              {event.name}
              <span className="relative px-1">
                <div className="absolute inset-x-0 bottom-0 h-3 transform -skew-x-12 bg-teal-accent-400" />
              </span>
            </h1>
            <p className="text-base text-gray-700 md:text-lg">
              {event.description.substring(0, 180)}
            </p>
          </div>
          <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
            <div className="bg-blue-900 border-l-4 shadow-sm border-indigo-400">
              <div className="h-full p-5 border border-l-0 rounded-r">
                <h6 className="mb-2 text-white font-semibold leading-5">
                  Venue
                </h6>
                <p className="text-sm text-white">{event.school.name}</p>
                <p className="text-sm text-white">
                  {event.school.streetAddress}
                </p>
              </div>
            </div>
            <div className="bg-blue-900 border-l-4 shadow-sm border-indigo-400">
              <div className="h-full p-5 border border-l-0 rounded-r">
                <h6 className="mb-2 font-semibold text-white leading-5">
                  Date
                </h6>
                <p className="text-sm text-white">
                  {new Date(event.date).toLocaleDateString('en-ZA')}
                </p>
                <p className="text-sm text-white">{event.time}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src={event.featuredImage.formats.medium.url}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Event;

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      event: events[0],
    },
  };
}
