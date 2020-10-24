import React from 'react';

function Auth() {
  const scopes = "user-top-read playlist-modify-public streaming";
  console.log(process.env.redirectURI)
  return (
    <>
      <a href={`${process.env.REACT_APP_baseURL}?client_id=${process.env.REACT_APP_clientID}&response_type=${process.env.REACT_APP_responseType}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_redirectURI)}`}>
        Auth
      </a>
    </>
  );
}
export default Auth;
