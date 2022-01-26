/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import StudentRanking from './StudentRanking';

export const SchoolHero = ({ school }) => {
  return (
    <section className="px-5 py-10 dark:bg-coolGray-800 dark:text-coolGray-100">
      <div className="container grid grid-cols-12 mx-auto gap-y-6 md:gap-10">
        <div className="flex flex-col justify-between col-span-12 py-2 space-y-8 md:space-y-16 md:col-span-3">
          <div className="flex flex-col space-y-8 md:space-y-12">
            <div className="flex flex-col space-y-2">
              <h3 className="flex items-center space-x-2 dark:text-coolGray-400">
                <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-blue-400"></span>
                <span className="text-xs font-bold tracking-wider uppercase">
                  Exclusive
                </span>
              </h3>
              <a href="#" className="font-serif hover:underline">
                Donec sed elit quis odio mollis dignissim eget et nulla.
              </a>
              <p className="text-xs dark:text-coolGray-400">
                47 minutes ago by
                <a href="#" className="hover:underline dark:text-blue-400">
                  Leroy Jenkins
                </a>
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="flex items-center space-x-2 dark:text-coolGray-400">
                <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-blue-400"></span>
                <span className="text-xs font-bold tracking-wider uppercase">
                  Exclusive
                </span>
              </h3>
              <a href="#" className="font-serif hover:underline">
                Ut fermentum nunc quis ipsum laoreet condimentum.
              </a>
              <p className="text-xs dark:text-coolGray-400">
                2 hours ago by
                <a href="#" className="hover:underline dark:text-blue-400">
                  Leroy Jenkins
                </a>
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="flex items-center space-x-2 dark:text-coolGray-400">
                <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-blue-400"></span>
                <span className="text-xs font-bold tracking-wider uppercase">
                  Exclusive
                </span>
              </h3>
              <a href="#" className="font-serif hover:underline">
                Nunc nec ipsum lobortis, pulvinar neque sed.
              </a>
              <p className="text-xs dark:text-coolGray-400">
                4 hours ago by
                <a href="#" className="hover:underline dark:text-blue-400">
                  Leroy Jenkins
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <div className="flex w-full h-1 bg-opacity-10 dark:bg-blue-400">
              <div className="w-1/2 h-full dark:bg-blue-400"></div>
            </div>
            <a href="#" className="flex items-center justify-between w-full">
              <span className="text-xs font-bold tracking-wider uppercase">
                See more exclusives
              </span>
              <svg
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 strokeCurrent dark:text-blue-400"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
        <div
          className="relative flex col-span-12 bg-center bg-no-repeat bg-cover dark:bg-coolGray-500 xl:col-span-6 lg:col-span-5 md:col-span-9 min-h-96"
          style={{
            backgroundImage: `url(${school.image.formats.medium.url})`,
          }}
        >
          <span className="absolute px-1 pb-2 text-xs text-white font-bold uppercase left-6 top-6">
            {school.town_city}
          </span>
          <a className="flex flex-col items-center justify-end p-6 text-center sm:p-8 group dark:via-transparent flex-grow-1 bg-gradient-to-b dark:from-coolGray-900 dark:to-coolGray-900">
            <span className="flex items-center mb-4 space-x-2 dark:text-blue-400">
              <span className="relative flex-shrink-0 w-2 h-2 rounded-full dark:bg-blue-400">
                <span className="absolute flex-shrink-0 w-3 h-3 rounded-full -left-1 -top-1 animate-ping dark:bg-blue-400"></span>
              </span>
            </span>
            <h1 href="#" className="text-2xl text-white font-semibold">
              {school.name}
            </h1>
          </a>
        </div>
        <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block">
          <div className="mb-8 space-x-5 border-b-2 border-opacity-10 dark:border-blue-400">
            <button
              type="button"
              className="pb-5 text-xs font-bold uppercase border-b-2 dark:border-blue-400"
            >
              School Events
            </button>
            <button
              type="button"
              className="pb-5 text-xs font-bold uppercase border-b-2 dark:border-transparent dark:text-coolGray-400"
            >
              Popular
            </button>
          </div>
          <div className="flex flex-col divide-y divide-coolGray-700">
            {school.events.map((event) => {
              return (
                <div className="flex px-1 py-4" key={event.id}>
                  <img
                    alt={event.name}
                    className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-coolGray-500"
                    src={event.featuredImage.formats.medium.url}
                  />
                  <div className="flex flex-col flex-grow">
                    <a href="#" className="font-sans hover:underline">
                      {event.name}
                    </a>
                    <p className="mt-auto text-xs dark:text-coolGray-400">
                      Date: {event.date}
                      <a
                        href="#"
                        className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline"
                      >
                        {event.type}
                      </a>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
