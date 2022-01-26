/* eslint-disable import/no-anonymous-default-export */
import { API_URL } from '../../config/index';
import { parseCookies } from '../../helpers';

export default async (req, res) => {
  const { token } = parseCookies(req);
  console.log(token);
  console.log(req.body);

  const { firstName, lastName, mobile, grade, school } = req.body;

  if (req.method === 'PUT') {
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        mobile,
        grade,
        school,
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user: data.user });
    } else {
      res.status(data.statusCode).json({ message: data.message[0] });
    }
  } else {
    console.log('Error');
    res.setHeader('Allow', ['PUT']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
