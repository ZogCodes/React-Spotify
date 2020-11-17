import React from "react";
import styled from 'styled-components';
import vars from '../../../styles/vars';

const StyledPlaylist = styled.div`
  position: relative;

  .name {
    position: absolute;
    top: 0;
    background: ${vars.color2};
    padding: 15px 25px 5px;
    width: calc(100% - 50px);

    input[name="playlist-name"] {
      margin-left: 1rem;
      background-color: ${vars.color2};
      appearance: none;
      border: none;
      color: ${vars.color7};
      font-family: inherit;
      font-size: 16px;
      width: 300px;

      &:focus {
        border: 1px solid ${vars.color1};
        outline: none;
        padding: 1rem;
      }
      &:-internal-autofill-selected {
        background-color: ${vars.color2};
      }
    }
  }

  ul {
    list-style: none;
    padding-inline-start: 0;
    overflow: scroll;
    height: 300px;
    padding-top: 20px;
    margin-top: 0;

    li {
      padding: ${vars.smallPadding};
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      &:nth-child(odd) {
        background-color: ${vars.color2};
      }
      &.key {
        background-color: ${vars.color2};
        text-transform: uppercase;
        font-size: 12px;
        padding: 5px 25px 10px;
      }
    }
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
    </StyledPlaylist>);
}

export default Playlist;
