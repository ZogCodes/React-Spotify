import React from 'react';
import config from '../../../config';

function Auth() {
  const scopes = "user-top-read playlist-modify-public streaming";
  const baseURL = "https://accounts.spotify.com/en/authorize";
  const responseType = "token";
  console.log(config);
  return (
    <section>
      <a href={`${baseURL}?client_id=${config.clientID}&response_type=${responseType}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent( process.env.NODE_ENV == "development" ? config.redirectURI : config.prodRedirectURI)}`}>
        Auth
      </a>
    </section>
  );
}
export default Auth;
