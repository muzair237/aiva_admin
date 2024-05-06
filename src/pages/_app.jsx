import React from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '../slices/store';
import '../assets/scss/themes.scss';
import 'animate.css';
import VerticalLayout from '../layouts';
import { getCookie } from '../helpers/common';

export default function App({ Component, pageProps }) {
  const allowedPages = JSON.parse(getCookie(process.env.NEXT_PUBLIC_ADMIN_ALLOWED_PAGES_COOKIE));
  return (
    <Provider store={store}>
      {allowedPages ? (
        <VerticalLayout>
          <Component {...pageProps} />
        </VerticalLayout>
      ) : (
        <Component {...pageProps} />
      )}
      <Toaster
        position="top-center"
        reverseOrder
        gutter={8}
        toastOptions={{
          duration: 4700,
        }}
      />
    </Provider>
  );
}
