/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Fragment } from 'react';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-gray-900">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <Link href="/">
            <a
              aria-label="Merits"
              title="Merits"
              className="inline-flex items-center"
            >
              <svg
                className="w-8 text-white"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                stroke="currentColor"
                fill="none"
              >
                <rect x="3" y="1" width="7" height="12" />
                <rect x="3" y="17" width="7" height="6" />
                <rect x="14" y="1" width="7" height="6" />
                <rect x="14" y="11" width="7" height="12" />
              </svg>
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                Merits
              </span>
            </a>
          </Link>
          <ul className="items-center hidden space-x-8 lg:flex">
            <li>
              <Link href="/schools">
                <a
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Schools
                </a>
              </Link>
            </li>
            <li>
              <Link href="/events">
                <a
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Events
                </a>
              </Link>
            </li>
            <li>
              <Link href="/clubs">
                <a
                  aria-label="Product pricing"
                  title="Product pricing"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Clubs
                </a>
              </Link>
            </li>
            <li>
              <Link href="/sports">
                <a
                  aria-label="About us"
                  title="About us"
                  className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                >
                  Sports
                </a>
              </Link>
            </li>
          </ul>
          <ul className="items-center hidden space-x-8 lg:flex">
            {user ? (
              <Fragment>
                <li>
                  <button
                    onClick={() => logout()}
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-gray-50 transition duration-200 rounded shadow-md bg-red-600 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                    aria-label="Logout"
                    title="Logout"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <Link href="/account/profile">
                    <a
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-gray-900 transition duration-200 rounded shadow-md bg-blue-300 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      aria-label="Profile"
                      title="Profile"
                    >
                      Profile
                    </a>
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <Link href="/account/login">
                    <a
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-gray-900 transition duration-200 rounded shadow-md bg-gray-50 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      aria-label="Sign up"
                      title="Login"
                    >
                      Login
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <a
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-gray-900 transition duration-200 rounded shadow-md bg-gray-50 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      aria-label="Register"
                      title="Register"
                    >
                      Register
                    </a>
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-100" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link href="/">
                        <a
                          aria-label="Merits"
                          title="Merits"
                          className="inline-flex items-center"
                        >
                          <svg
                            className="w-8 text-black"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            stroke="currentColor"
                            fill="none"
                          >
                            <rect x="3" y="1" width="7" height="12" />
                            <rect x="3" y="17" width="7" height="6" />
                            <rect x="14" y="1" width="7" height="6" />
                            <rect x="14" y="11" width="7" height="12" />
                          </svg>
                          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Merits
                          </span>
                        </a>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link href="/schools">
                          <a
                            aria-label="Our product"
                            title="Our product"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Schools
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/events">
                          <a
                            aria-label="Events"
                            title="Events"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Events
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/sports">
                          <a
                            aria-label="Sports"
                            title="Sports"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Sports
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/clubs">
                          <a
                            aria-label="Clubs"
                            title="Clubs"
                            className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Clubs
                          </a>
                        </Link>
                      </li>

                      {user ? (
                        <Fragment>
                          <li>
                            <Link href="/account/profile">
                              <a
                                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                aria-label="Login"
                                title="Login"
                              >
                                Profile
                              </a>
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => logout()}
                              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                              aria-label="Login"
                              title="Login"
                            >
                              Logout
                            </button>
                          </li>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <li>
                            <Link href="/account/login">
                              <a
                                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                aria-label="Login"
                                title="Login"
                              >
                                Login
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/account/register">
                              <a
                                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-900 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                aria-label="Register"
                                title="Register"
                              >
                                Register
                              </a>
                            </Link>
                          </li>
                        </Fragment>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;