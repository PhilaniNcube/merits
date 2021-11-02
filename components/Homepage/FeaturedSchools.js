/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Fragment } from 'react';

export const FeaturedSchools = ({ schools }) => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {schools.map((school) => {
          return (
            <Fragment key={school.slug}>
              <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
                <img
                  src="/images/school.jpg"
                  className="object-cover w-full h-64"
                  alt=""
                />
                <div className="p-5 border border-t-0">
                  <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                    <Link href={school.slug}>
                      <a
                        className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                        aria-label="Category"
                        title="traveling"
                      >
                        {school.town_city}
                      </a>
                    </Link>
                    <span className="text-gray-600">
                      {' '}
                      {`${school.type} School `}
                    </span>
                  </p>
                  <Link href={school.slug}>
                    <a
                      aria-label="Category"
                      title="Visit the East"
                      className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                    >
                      {school.name}
                    </a>
                  </Link>

                  <p className="mb-2 text-indigo-700">{school.streetAddress}</p>
                  <Link href={school.slug}>
                    <a
                      aria-label=""
                      className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                      Sign Up
                    </a>
                  </Link>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
