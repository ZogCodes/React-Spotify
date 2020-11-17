import React from 'react';
import styled from "styled-components";
import Button from '../build/components/Button';
import vars from '../../styles/vars';
import config from '../../../config';

const StyledAuth = styled.div`
  max-width: 60%;
  margin: 15% auto 0;
  text-align: center;
  padding-bottom: 15%;

  h2 {
    font-size: 32px;
    color: ${vars.color7};
    font-weight: 400;
  }
`;

function Auth() {
  const scopes = "user-top-read playlist-modify-public streaming";
  const baseURL = "https://accounts.spotify.com/en/authorize";
  const responseType = "token";
  return (
    <StyledAuth>
      <h2>This app allows you to tune for specific moods, discover songs, create a playlist, and export that playlist to your Spotify account.</h2>
      <p>Click below to authorize with Spotify.</p>
      <a href={`${baseURL}?client_id=${config.clientID}&response_type=${responseType}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(process.env.NODE_ENV === "development" ? config.redirectURI : config.prodRedirectURI)}`}>
        <Button text="Authorize" />
      </a>
    </StyledAuth>
  );
}
export default Auth;
