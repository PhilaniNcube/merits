/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react';
import Link from 'next/link';

export async function getStaticProps(context) {
  const eventsRes = await fetch('http://localhost:1337/events');
  const events = await eventsRes.json();

  return {
    props: {
      events: events,
    },
    revalidate: 1,
  };
}

const feed = ({ events }) => {
  console.log(events);
  return (
    <Fragment>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {events.map((event) => {
            return (
              <div
                key={event.id}
                className="overflow-hidden transition-shadow duration-300 bg-white shadow-md rounded"
              >
                <Link href={`/events/${event.slug}`}>
                  <a aria-label="Article">
                    <img
                      src={event.featuredImage.formats.large.url}
                      className="object-cover w-full h-64"
                      alt={event.name}
                    />
                  </a>
                </Link>

                <div className="py-5 px-3">
                  <p className="text-xs font-semibold text-gray-600 uppercase">
                    Date: {event.date}
                  </p>
                  <Link href={`/events/${event.slug}`}>
                    <a
                      aria-label="Article"
                      className="inline-block mb-1 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                    >
                      <p className="text-2xl font-bold leading-5">
                        {event.name}
                      </p>
                    </a>
                  </Link>

                  <p className="mb-1 font-bold text-indigo-400">{event.type}</p>
                  <p className="mb-1 text-gray-700">
                    Venue: {event.school.name}
                  </p>
                  <p className="mb-1 text-gray-700">
                    Address: {event.school.streetAddress}
                  </p>
                  <p className="mb-4 text-gray-700">Time: {event.time}</p>
                  <p className="mb-1 text-gray-700">
                    {' '}
                    {event.description.substring(0, 155)}...
                  </p>
                  <div className="flex space-x-4">
                    <Link href={`/events/${event.slug}`}>
                      <a
                        aria-label="Likes"
                        className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                      >
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
                          >
                            <polyline
                              points="6 23 1 23 1 12 6 12"
                              fill="none"
                              strokeMiterlimit="10"
                            />
                            <path
                              d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z"
                              fill="none"
                              stroke="currentColor"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        </div>
                        <p className="font-semibold">
                          {event.attendees.length}
                        </p>
                      </a>
                    </Link>
                    <Link href="/">
                      <a
                        aria-label="Comments"
                        className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                      >
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-5 h-5 text-gray-600 transition-colors duration-200 group-hover:text-deep-purple-accent-700"
                          >
                            <polyline
                              points="23 5 23 18 19 18 19 22 13 18 12 18"
                              fill="none"
                              strokeMiterlimit="10"
                            />
                            <polygon
                              points="19 2 1 2 1 14 5 14 5 19 12 14 19 14 19 2"
                              fill="none"
                              stroke="currentColor"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        </div>
                        <p className="font-semibold">81</p>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default feed;
