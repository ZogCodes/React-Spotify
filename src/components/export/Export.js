import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import vars from '../../styles/vars';
import Analysis from './Analysis';

const StyledExport = styled.section`
  max-width: 90%;
  margin: 0 auto;
  grid-template: 1fr/1fr 1fr !important;
  margin-top: 3rem;
  padding-bottom: 5rem;

  .exporting {
    text-align: center;

    ul {
      list-style: none;
      padding-inline-start: 0;
      max-height: 100%;
      padding-top: 20px;
      margin-top: 0;
  
      li {
        padding: ${vars.smallPadding};
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
  
        &:nth-child(odd) {
          background-color: ${vars.color4};
        }
        &.key {
          background-color: ${vars.color2};
          text-transform: uppercase;
          font-size: 12px;
          padding: 5px 25px 10px;
        }
      }
    }
  }
`;

function Export(props) {
  const [exportStatus, setExportStatus] = useState('in progress');

  useEffect(() => {
    const getUserID = async () => {
      const infoURL = `https://api.spotify.com/v1/me`;
      const res = await fetch(infoURL, {
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
        },
      });
      const json = await res.json();
      console.log('user id complete');
      return json.id;
    };

    const createPlaylist = async () => {
      const userID = await getUserID();
      const createPlaylistURL = `https://api.spotify.com/v1/users/${userID}/playlists`;
      const playlistName = props.name || 'My Playlist';
      const res = await fetch(createPlaylistURL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${props.accessToken}`
        },
        body: JSON.stringify({name: playlistName})
      });
      const json = await res.json();
      console.log('createPlaylist', json.id);
      if (res.status === 200) {
        setExportStatus('in progress');
      } else {
        setExportStatus('failed');
      }
      return json.id;
    };

    const addSongs = async () => {
      const playlistID = await createPlaylist();
      const addSongsURL = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
      const playlistURIs = { uris: []};
      props.playlist.slice(0).reverse().map(el => {
        playlistURIs.uris.push(el.uri);
        return playlistURIs;
      });
      const res = await fetch(addSongsURL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${props.accessToken}`
        },
        body: JSON.stringify(playlistURIs)
      });
      if (res.status === 200 || res.status === 201) {
        setExportStatus('complete');
      } else {
        setExportStatus('failed');
      }
    };
    addSongs();
  }, [props.accessToken]);

  const songs = props.playlist.slice(0).reverse().map((el, index) => <li key={index}>
    <span className="song-name">{el.name}</span>
    <span className="song-artist">{el.artists[0].name}</span>
    <span className="song-album">{el.album.name}</span>
  </li>);

  return (
    <StyledExport>
      <div className="exporting">
        <h2>{props.name || 'Your Playlist'}</h2>
        <p>Export status: {exportStatus}</p>
        <ul>
          {songs}
        </ul>
      </div>
      <div className="analysis">
        <Analysis playlist={props.playlist} accessToken={props.accessToken}/>
      </div>
    </StyledExport>
  );
}

export default Export;
