import { useEffect } from "react";
import Router from "next/router";
import Nprogress from 'nprogress';  //For showing a progress bar while navigating
import 'nprogress/nprogress.css'
import "@/styles/globals.css";

import { AuthProvider } from "../firebase/context";
import AuthRoute from "@/components/AuthRoute";

function MyApp({ Component, pageProps }) {

  useEffect(() => { //UseEffect hook required to make sure that this code does not run on the server

    Nprogress.configure({ minimum: 0.17 })

    Router.events.on('routeChangeStart', Nprogress.start) // Starts the progress bar
    Router.events.on('routeChangeError', Nprogress.done)  // Finishes the progress bar
    Router.events.on('routeChangeComplete', Nprogress.done) // Finishes the progress bar
  }, [])

  return (
    <AuthProvider>
      <AuthRoute>
        <Component {...pageProps} />
      </AuthRoute>
    </AuthProvider>
  );
}

export default MyApp;
