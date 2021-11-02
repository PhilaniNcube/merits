/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useContext, useState } from 'react';
import { API_URL } from '../../../config';

import AuthContext from '../../../context/AuthContext';
import { parseCookies } from '../../../helpers/index';

const Update = ({ events, schools, token }) => {
  console.log(events);
  console.log(schools);

  const { user, update } = useContext(AuthContext);

  console.log(user);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState(7);
  const [mobile, setMobile] = useState('');

  const updateUser = (e) => {
    e.preventDefault();
    update(firstName, lastName, mobile, grade, school);
  };

  return (
    <div className="container mx-auto">
      {!user ? (
        <h1 className="text-4xl">Loading...</h1>
      ) : (
        <Fragment>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Update Your Profile
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={updateUser}>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            autoComplete="given-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="mobile"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mobile Number
                          </label>
                          <input
                            type="text"
                            name="mobile"
                            id="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            autoComplete="mobile"
                            placeholder="061 500 5000"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="school"
                            className="block text-sm font-medium text-gray-700"
                          >
                            School
                          </label>
                          <select
                            id="school"
                            name="school"
                            autoComplete="school"
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="">Select Your School</option>
                            {schools.map((school) => {
                              return (
                                <option key={school.id} value={school.id}>
                                  {school.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="grade"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Grade
                          </label>
                          <select
                            id="grade"
                            name="grade"
                            autoComplete="grade"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="">Select Your Grade</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Update;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const schoolRes = await fetch(`${API_URL}/schools`, {
    method: 'GET',
  });

  const schools = await schoolRes.json();

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      schools,
      token,
    },
  };
}
