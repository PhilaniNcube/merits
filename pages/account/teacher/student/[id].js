import React from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '../../../../config';
import { parseCookies } from '../../../../helpers';

const StudentPage = ({ student, token }) => {
  console.log(student);

  const router = useRouter();

  const awardMerits = async (type, points, name) => {
    const res = await fetch(`${API_URL}/merits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: student.id,
        points: points,
        type: type,
        name: name,
      }),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        console.log('No token included');
        return;
      }
      console.log('Something Went Wrong');
    } else {
      let points = 0;

      if (student.merits.length === 0) {
        points = 0;
        student.totalMerits = points;
      } else {
        points = student.merits.reduce(function(acc, cur) {
          acc += cur.points;
          return acc;
        }, 0);

        const totalMeritsRes = await fetch(`${API_URL}/users/${student.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            totalMerits: points,
          }),
        });
      }

      const merit = await res.json();
      console.log(merit);
      router.push('/account/teacher');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 mt-10 px-2 md:px-0">
      <div className="border-b-2 border-gray-100 pb-2">
        <h1 className="font-extrabold text-2xl md:text-4xl">
          {student.firstName} {student.lastName}
        </h1>
        <p className="text-sm md:text-lg text-gray-400">{student.email}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="shadow rounded p-2">
          <h3 className="text-lg text-gray-400">Award Academic Merits</h3>
          <div className="grid grid-cols-3">
            <button
              onClick={() => awardMerits('academic', 20, 'Gold')}
              className="mx-2 my-2 bg-yellow-400 transition duration-150 ease-in-out  hover:text-gray-900 rounded border  text-white font-medium px-6 py-2 text-xs"
            >
              Gold
            </button>
            <button
              onClick={() => awardMerits('academic', 15, 'Silver')}
              className="mx-2 my-2 bg-gray-400 transition duration-150 ease-in-out  hover:text-gray-900 rounded border  text-white font-medium px-6 py-2 text-xs"
            >
              Silver
            </button>
            <button
              onClick={() => awardMerits('academic', 10, 'Bronze')}
              className="mx-2 my-2 bg-yellow-800 transition duration-150 ease-in-out  hover:text-gray-900 rounded border  text-white font-medium px-6 py-2 text-xs"
            >
              Bronze
            </button>
          </div>
        </div>
        <div className="shadow rounded p-2">
          <h3 className="text-lg text-gray-400">Award Sports Merits</h3>
          <div className="grid grid-cols-3">
            <button
              onClick={() => awardMerits('sport', 20, 'Gold')}
              className="mx-2 my-2 bg-yellow-400 transition duration-150 ease-in-out  hover:text-gray-900 rounded border  text-white font-medium px-6 py-2 text-xs"
            >
              Gold
            </button>
            <button
              onClick={() => awardMerits('sport', 15, 'Silver')}
              className="mx-2 my-2 bg-gray-400 transition duration-150 ease-in-out  hover:text-gray-900 rounded border  text-white font-medium px-6 py-2 text-xs"
            >
              Silver
            </button>
            <button
              onClick={() => awardMerits('sport', 10, 'Bronze')}
              className="mx-2 my-2 bg-yellow-800 transition duration-150 ease-in-out  hover:text-gray-900 rounded border  text-white font-medium px-6 py-2 text-xs"
            >
              Bronze
            </button>
          </div>
        </div>
        <div className="shadow rounded p-2">
          <h3 className="text-lg text-gray-400">Award Social Merits</h3>
          <div className="grid grid-cols-3">
            <button
              onClick={() => awardMerits('social', 20, 'Gold')}
              className="mx-2 my-2 bg-yellow-400 transition duration-150 ease-in-out  hover:text-gray-900 rounded border  text-white font-medium px-6 py-2 text-xs"
            >
              Gold
            </button>
            <button
              onClick={() => awardMerits('social', 15, 'Silver')}
              className="mx-2 my-2 bg-gray-400 transition duration-150 ease-in-out  hover:text-gray-900 rounded border  text-white font-medium px-6 py-2 text-xs"
            >
              Silver
            </button>
            <button
              onClick={() => awardMerits('social', 10, 'Bronze')}
              className="mx-2 my-2 bg-yellow-800 transition duration-150 ease-in-out  hover:text-gray-900 rounded border  text-white font-medium px-6 py-2 text-xs"
            >
              Bronze
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;

export async function getServerSideProps({ query: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/users?id=${id}`);
  const students = await res.json();

  return {
    props: {
      student: students[0],
      token,
    },
  };
}
