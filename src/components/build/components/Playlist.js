import React from "react";
import styled from 'styled-components';
import vars from '../../../styles/vars';
import Button from './Button';

const StyledPlaylist = styled.div`
  position: relative;

  .name {
    position: absolute;
    top: 0;
    background: ${vars.color1};
    padding: 15px 25px 5px;
    width: 100%;

    input[name="playlist-name"] {
      margin-left: 1rem;
      background-color: ${vars.color1};
      appearance: none;
      border: none;
      color: ${vars.color7};
      font-family: inherit;
      font-size: 16px;

      &:focus {
        border: 1px solid ${vars.color1};
        outline: none;
        padding: 1rem;
      }
    }
  }

  ul {
    list-style: none;
    padding-inline-start: 0;
    overflow: scroll;
    height: 27vh;
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
        background-color: ${vars.color1};
        text-transform: uppercase;
        font-size: 12px;
        padding: 5px 25px 10px;
      }
    }
  }

  [href="/export"] {
    display: block;
    text-align: center;
  }

`;

function Playlist(props) {
  const songs = props.playlist.slice(0).reverse().map((el, index) => <li key={index}>
    <span className="song-name">{el.name}</span>
    <span className="song-artist">{el.artists[0].name}</span>
    <span className="song-album">{el.album.name}</span>
  </li>);

  const updateName = event => {
    props.setName(event.target.value);
  };

  return (
    <StyledPlaylist>
      <div className="name">
        <label htmlFor="playlist-name">Name your playlist:</label>
        <input type="text" name="playlist-name" onChange={() => updateName(event)}></input>
      </div>;
      <ul>
        <li className="key">
          <span className="song-name">Title</span>
          <span className="song-artist">Artist</span>
          <span className="song-album">Album</span>
        </li>
        {songs}
      </ul>
      {props.playlist.length >= 5
        ? <a href="/export">
          <Button text="Export" extraClasses="export" />
        </a>
        : ''}
    </StyledPlaylist>);
}

export default Playlist;
