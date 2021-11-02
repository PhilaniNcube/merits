/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';

export const SportsList = ({ sports }) => {
  console.log(sports);
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {sports.map((sport) => {
          return (
            <div
              key={sport.slug}
              className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm"
            >
              <Image
                src={sport.image.formats.medium.url}
                className="object-cover w-full h-64"
                alt={sport.image.formats.medium.name}
                width={sport.image.formats.medium.width}
                height={sport.image.formats.medium.height}
              />
              <div className="p-5 border border-t-0">
                <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                  <Link href={`/sports/${sport.slug}`}>
                    <a
                      className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                      aria-label="Category"
                      title="traveling"
                    >
                      Players
                    </a>
                  </Link>

                  <span className="text-gray-600"> — {sport.users.length}</span>
                </p>
                <Link href={`/sports/${sport.slug}`}>
                  <a
                    aria-label="Category"
                    title="Visit the East"
                    className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                  >
                    {sport.name}
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
