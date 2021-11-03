/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

export const SchoolHero = ({ school }) => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="max-w-xl mb-6">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              {school.name}
            </h2>
          </div>
          <div className="grid gap-5 row-gap-8 sm:grid-cols-2">
            <div className="bg-blue-700 rounded-r border-l-4 shadow-sm border-deep-purple-accent-400">
              <div className="h-full p-5 border border-l-0 rounded-r">
                <h6 className="mb-2 font-semibold text-blue-50 leading-5">
                  {school.town_city}
                </h6>
                <p className="text-sm text-white">
                  Address: {school.streetAddress}
                </p>
                <p className="text-sm text-white">{school.province}</p>
              </div>
            </div>
            <div className="bg-white border-l-4 shadow-sm border-deep-purple-accent-400">
              <div className="h-full p-5 border border-l-0 rounded-r">
                <h6 className="mb-2 font-semibold leading-5">Students</h6>
                <p className="text-sm text-gray-900">{school.users.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Image
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src={school.image.url}
            width={1920}
            height={1080}
            alt={school.name}
          />
        </div>
      </div>
    </div>
  );
};
