import RegistrationPage from "@/components/registrationPage/RegistrationPage";
import Head from "next/head";
import React from "react";

const Registration = () => {
  return (
    <>
      <Head>
        <title>Join Us | Geek Room Plaksha</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RegistrationPage />
    </>
  );
};

export default Registration;
