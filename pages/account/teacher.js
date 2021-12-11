/* eslint-disable @next/next/no-img-element */
import React, { useContext, Fragment } from 'react';
import Link from 'next/link';
import { API_URL } from '../../config';
import AuthContext from '../../context/AuthContext';
import { parseCookies } from '../../helpers/index';

const teacher = ({ users, school, token, schoolTeacher }) => {
  console.log({ users, school, token, schoolTeacher });

  return (
    <Fragment>
      <div className="flex flex-col max-w-7xl mx-auto mt-6">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="/images/avatar.svg"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {`${person.firstName} ${person.lastName}`}
                            </div>

                            <div className="text-sm text-gray-500">
                              {`Grade: ${person.grade}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {person.mobile}
                        </div>
                        <div className="text-sm text-gray-500">
                          {person.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/account/teacher/student/${person.id}`}>
                          <a className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default teacher;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const strapiRes = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await strapiRes.json();

  console.log(user.school);

  const schoolRes = await fetch(`${API_URL}/schools/${user.school}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const school = await schoolRes.json();

  const res = await fetch(`${API_URL}/users?school.id=${user.school}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const users = await res.json();

  return {
    props: {
      users,
      school,
      token,
      schoolTeacher: user,
    },
  };
}
