/* eslint-disable @next/next/no-img-element */
import { PaperClipIcon } from '@heroicons/react/outline';
import React, { Fragment, useContext, useState } from 'react';
import { API_URL } from '../../../config';
import Link from 'next/link';

import AuthContext from '../../../context/AuthContext';
import { parseCookies } from '../../../helpers/index';
import ProfileHeader from '../../../components/Profile/ProfileHeader';

const Profile = ({ events, schools, token }) => {
  console.log(events);
  console.log(schools);

  const { user, update } = useContext(AuthContext);

  console.log(user);

  if (!user) {
    return (
      <div className="flex flex-col m-8 mx-auto rounded shadow-md w-60 sm:w-full px-8 animate-pulse h-96">
        <div className="h-48 rounded-t bg-blue-900"></div>
        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-900">
          <div className="w-full h-6 rounded bg-gray-600"></div>
          <div className="w-full h-6 rounded bg-gray-600"></div>
          <div className="w-3/4 h-6 rounded bg-gray-600"></div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <ProfileHeader events={events} schools={schools} user={user} />
    </Fragment>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const schoolRes = await fetch(`${API_URL}/schools`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
