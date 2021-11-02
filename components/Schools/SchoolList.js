/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SchoolList = ({ schools }) => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {schools.map((school) => {
          return (
            <div
              key={school.slug}
              className="overflow-hidden transition-shadow duration-300 bg-gray-50 rounded"
            >
              <span className="object-cover w-full h-64">
                <Image
                  src={school.image.formats.medium.url}
                  height={1280}
                  width={1920}
                  alt={school.name}
                />
              </span>
              <div className="p-5 border border-t-0">
                <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                  <Link href={`/schools/${schools.slug}`}>
                    <a
                      className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                      aria-label="School"
                      title="School"
                    >
                      City - {school.town_city}
                    </a>
                  </Link>
                </p>
                <Link href={`/schools/${school.slug}`}>
                  <a
                    aria-label="School"
                    title={`${school.name}`}
                    className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                  >
                    {school.name}
                  </a>
                </Link>

                <p className="mb-2 text-gray-700">{school.streetAddress}</p>
                <p className="mb-2 text-gray-700">{school.province}</p>

                <Link href={`/schools/${school.slug}`} passHref>
                  <button
                    aria-label=""
                    className="inline-flex items-center my-2 font-semibold transition-colors bg-indigo-500 px-3 py-1 rounded text-white duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  >
                    View School
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

export default SchoolList;
