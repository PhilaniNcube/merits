import React, { useContext, Fragment } from 'react';
import { API_URL } from '../../config';
import AuthContext from '../../context/AuthContext';
import { parseCookies } from '../../helpers/index';
import ProfileHeader from "../../components/Profile/ProfileHeader"

const teacher = ({ users, school, token, schoolTeacher }) => {
  console.log({ users, school, token, schoolTeacher });

  return (
<Fragment>
<ProfileHeader schoolTeacher={schoolTeacher} school={school} />
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

  console.log(user.school)

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
