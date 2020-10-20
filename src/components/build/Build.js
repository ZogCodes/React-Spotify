import React, {useEffect, useState} from 'react';
import Playlist from "./components/Playlist";

function Build(props) {
  const [activeTrack, setTrack] = useState('');
  const [activeIndex, setIndex] = useState(0);

  useEffect(() => {
    const parameters = "limit=40";
    const spotifyURL = `https://api.spotify.com/v1/me/top/tracks?${parameters}`;
    const getTrack = async () => {
      const res = await fetch(spotifyURL, {
        headers: {
          Authorization: `Bearer ${props.accessToken}`
        },
      });
      const json = await res.json();
      setTrack(json.items[activeIndex]);
    };
    getTrack();
  }, [activeIndex, props.accessToken]);

  const nextTrack = () => {
    setIndex(prevIndex => prevIndex + 1);
  };

  const addToPlaylist = () => {
    props.setPlaylist([activeTrack, ...props.playlist]);
    console.log(activeTrack);
    console.log(props.playlist);
  };

  return (
    <>
      <p>Builder</p>
      {(activeTrack)
        ? <>
          <p>{activeTrack.name}</p>
          <p>{activeTrack.artists[0].name}</p>
          <audio controls>
            <source src={activeTrack.preview_url} type="audio/ogg" />
          </audio>

          <button onClick={() => nextTrack()}>Next Track</button>
          <button onClick={() => addToPlaylist()}>Add to playlist</button>
          <Playlist playlist={props.playlist} />
        </>
        : ''}
    </>
  );
}
export default Build;