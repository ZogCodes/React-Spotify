import React, {useState, useEffect} from "react";
import { Route } from "react-router-dom";

import "../styles/main.scss";

import Auth from "./auth/Auth";
import Build from "./build/Build";
import Export from "./export/Export";

export default function App() {
  const [accessToken, setAccessToken] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    if (window.location.href.includes('access_token')) {
      const codeString = window.location.href.split('access_token=');
      const acquiredAccessToken = codeString[1].split('&token_type')[0];
      setAccessToken(acquiredAccessToken);
    }
  }, []);

  return (
    <div className="app">
      <div className="main-content">
        <header>Spotify Playlist Builder</header>
        <Route exact path="/" component={Auth} />
        <Route path="/build" render={routerProps => <Build {...routerProps} accessToken={accessToken} playlist={playlist} setPlaylist={setPlaylist} name={name} setName={setName}/>}/>
        <Route path="/export" render={routerProps => <Export {...routerProps} accessToken={accessToken} playlist={playlist} name={name}/>}/>
      </div>
    </div>
  );
}
