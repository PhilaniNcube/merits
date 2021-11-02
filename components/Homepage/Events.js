/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

const Events = ({ events }) => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {events.map((event) => {
          return (
            <div
              key={event.id}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-md"
            >
              <Link href={`/events/${event.slug}`}>
                <a aria-label="Article">
                  <img
                    src={event.featuredImage.formats.small.url}
                    className="object-cover w-full h-64"
                    alt={event.slug}
                  />
                </a>
              </Link>

              <div className="py-5 px-6 bg-gray-100">
                <p className="mb-2 text-xs font-semibold text-gray-900 uppercase">
                  {event.date}
                </p>
                <Link href={`/events/${event.slug}`}>
                  <a
                    aria-label="Article"
                    className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                  >
                    <h3 className="text-2xl text-blue-700 font-bold leading-5">
                      {event.name}
                    </h3>
                  </a>
                </Link>

                <p className="text-sm text-gray-700">
                  Venue: {event.school.name}, Address:{' '}
                  {event.school.streetAddress}, {event.school.town_city}
                </p>
                <p className="mb-4 text-sm text-gray-700">Time: {event.time}</p>
                <div className="flex align-center space-x-8">
                  <p className=" text-gray-700 text-xs">{`Attendees: ${event.attendees.length}`}</p>
                </div>
                <Link href={`/events/${event.slug}`} passHref>
                  <button className="bg-blue-700 my-3 text-white px-5 py-2 rounded">
                    View Event
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
