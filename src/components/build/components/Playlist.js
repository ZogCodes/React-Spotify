import React from "react";

function Playlist(props) {
  const songs = props.playlist.map((el, index) => <li key={index}>{el.name}</li>);
  return <ul>{songs}</ul>;
}

export default Playlist;