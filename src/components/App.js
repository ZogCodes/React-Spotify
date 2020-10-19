import React, {useState, useEffect} from "react";
import { Route } from "react-router-dom";

import config from '../../config';
import "../styles/main.scss";

import Auth from "./auth/Auth";
import Builder from "./builder/Builder";

export default function App() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const spotifyURL = `https://accounts.spotify.com/api/token`;

    // if (window.location.href.includes('code')) {
    //   const code = window.location.href.split('code=');
    //   const requestBody = `code=${code[1]}&redirect_uri=${config.redirectURI}&grant_type=authorization_code`;
    //   const makeApiCall = async () => {
    //     const res = await fetch(spotifyURL, {
    //       method: 'POST',
    //       headers: {
    //         Authorization: 'Basic ' + btoa(`${config.clientID}:${config.clientSecret}`),
    //         'Content-Type': "application/x-www-form-urlencoded"
    //       },
    //       body: requestBody,
    //     });
    //     const json = await res.json();
    //     setAccessToken(json.access_token);
    //   };
    //   makeApiCall();
    // }
    if (window.location.href.includes('access_token')) {
      const codeString = window.location.href.split('access_token=');
      const acquiredAccessToken = codeString[1].split('&token_type')[0];
      setAccessToken(acquiredAccessToken);
    }
  }, []);

  return (
    <div className="app">
      <div className="app-body">
        <div className="main-content">
          <Route path="/auth" component={Auth} />
          <Route exact path="/" render={routerProps => <Builder {...routerProps} accessToken={accessToken} />}/>
        </div>
      </div>
    </div>
  );
}
