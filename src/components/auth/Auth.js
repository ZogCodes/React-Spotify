import React from 'react';

function Auth() {
  const scopes = "user-top-read playlist-modify-public streaming";
  console.log(process.env.redirectURI)
  return (
    <>
      <a href={`${process.env.baseURL}?client_id=${process.env.clientID}&response_type=${process.env.responseType}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(process.env.redirectURI)}`}>
        Auth
      </a>
    </>
  );
}
export default Auth;
