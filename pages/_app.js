import { Fragment } from 'react';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </Fragment>
  );
}

export default MyApp;
