import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => checkUserLoggedIn(), []);

  // Register user
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json({});

    if (res.ok) {
      setUser(data.user);
      router.push('/');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Login User
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json({});

    if (res.ok) {
      setUser(data.user);
      router.push('/');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Update User
  const update = async (firstName, lastName, mobile, grade, school) => {
    const res = await fetch(`${NEXT_URL}/api/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        mobile,
        school,
        grade,
      }),
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      setError(data.message);
      setError(null);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        checkUserLoggedIn,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
