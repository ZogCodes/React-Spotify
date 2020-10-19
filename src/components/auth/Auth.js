import React from 'react';
import config from '../../../config';

function Auth() {
  return (
    <>
      <a href={`${config.baseURL}?client_id=${config.clientID}&response_type=${config.responseType}&scope=${encodeURIComponent(config.scopes)}&redirect_uri=${encodeURIComponent(config.redirectURI)}`}>
        Auth
      </a>
    </>
  );
}
export default Auth;
