/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react';
import { API_URL } from '../../config';
import Link from 'next/link';
import Image from 'next/image';

const Slug = ({ school, students }) => {
  console.log(school);
  console.log(students);
  return (
    <section className="dark:bg-coolGray-800 dark:text-coolGray-100">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-coolGray-900">
          <span className="object-cover col-span-12 md:col-span-6 h-64 rounded sm:h-96 lg:col-span-7 dark:bg-coolGray-500">
            <Image
              src={school.image.formats.medium.url}
              alt=""
              width={school.image.formats.medium.width}
              height={school.image.formats.medium.height}
            />
          </span>
          <div className="p-6 space-y-2 lg:col-span-5">
            <h1 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
              {school.name}
            </h1>

            <p>{school.streetAddress}</p>
            <div className="col-span-5 p-3 rounded shadow-lg bg-blue-800">
              <h3 className="font-medium text-white text-xl">
                Merits Leaderboard
              </h3>
              <ul className="px-3">
                {students.map((student) => {
                  return (
                    <Fragment key={student.id}>
                      <li className="text-white flex justify-between">
                        <span className="font-medium text-white">
                          {`${student.firstName} ${student.lastName}`}:
                        </span>{' '}
                        {student.totalMerits
                          ? `${student.totalMerits} Merits`
                          : `0 Merits`}
                      </li>
                    </Fragment>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <h2>{school.name} - Events</h2>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {school.events.map((event) => {
            return (
              <div
                key={event.slug}
                className="bg-gray-200 rounded-lg shadow-md"
              >
                <Link href={`/events/${event.slug}`}>
                  <a className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-coolGray-900">
                    <span className="object-cover w-full rounded h-44 dark:bg-coolGray-500">
                      <Image
                        role="presentation"
                        src={event.featuredImage.formats.medium.url}
                        width={event.featuredImage.formats.medium.width}
                        height={event.featuredImage.formats.medium.height}
                        alt={event.name}
                      />
                    </span>

                    <div className="p-6 bg-gray-200">
                      <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                        {event.name}
                      </h3>
                      <span className="text-xs dark:text-coolGray-400">
                        {event.date}
                      </span>
                      <p>{event.description.substring(0, 199)}</p>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Slug;

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/schools?slug=${slug}`);
  const schools = await res.json();

  const userRes = await fetch(
    `${API_URL}/users?school.slug_contains=${slug}&_sort=totalMerits:DESC`,
  );
  const students = await userRes.json();

  return {
    props: {
      school: schools[0],
      students,
    },
  };
}
