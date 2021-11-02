/* eslint-disable import/no-anonymous-default-export */
import { API_URL } from '../../config/index';
import { parseCookies } from '../../helpers';

export default async (req, res) => {
  const { token } = parseCookies(req);

  const { type, points, name, userId } = req.body;

  if (req.method === 'POST') {
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type,
        points,
        name,
        userId,
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ message: `Merit awarded successfuly` });
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
