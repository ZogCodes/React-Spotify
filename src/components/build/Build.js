import React, {useEffect, useState } from 'react';
import Playlist from "./components/Playlist";
import Tuner from "./components/Tuner";
import Player from "./components/Player";
import handleInstructions from "./components/handleInstructions";

function Build(props) {
  const [activeTrack, setTrack] = useState('');
  const [myTracks, setMyTracks] = useState('');
  const [activeIndex, setIndex] = useState(0);
  const [tunings, setTunings] = useState({market: 'from_token'});
  const [recTracks, setRecTracks] = useState('');

  useEffect(() => {
    const parameters = "limit=40";
    const tracksURL = `https://api.spotify.com/v1/me/top/tracks?${parameters}`;
    const getTrack = async () => {
      const res = await fetch(tracksURL, {
        headers: {
          Authorization: `Bearer ${props.accessToken}`
        },
      });
      const json = await res.json();
      setTrack(json.items[0]);
      setMyTracks(json.items);
    };
    getTrack();
  }, [props.accessToken]);

  const nextTrack = action => {
    let newIndex = '';
    switch (action) {
    case 'NEXT':
      setIndex(prevIndex => prevIndex + 1);
      if (recTracks.length > 0) {
        setTrack(recTracks[activeIndex + 1]);
      } else {
        setTrack(myTracks[activeIndex + 1]);
      }
      break;
    case 'PREV':
      if (activeIndex === 0) {
        newIndex = 20;
      } else {
        newIndex = activeIndex - 1;
      }
      setIndex(newIndex);
      if (recTracks.length > 0) {
        setTrack(recTracks[newIndex]);
      } else {
        setTrack(myTracks[newIndex]);
      }
      break;
    default:
    }
  };

  const addToPlaylist = () => {
    props.setPlaylist([activeTrack, ...props.playlist]);
    if (props.playlist.length === 0) {
      setTunings({ ...tunings, seed_tracks: activeTrack.id, seed_artists: activeTrack.artists[0].id });
    }
  };

  const getRecommendations = async () => {
    setIndex(0);
    const tuningsEntries = Object.entries(tunings);
    const queryParams = tuningsEntries.join("&").replace(/,/g, '=');
    const recommendationsURL = `https://api.spotify.com/v1/recommendations?${queryParams}`;
    const res = await fetch(recommendationsURL, {
      headers: {
        Authorization: `Bearer ${props.accessToken}`
      },
    });
    const json = await res.json();
    setTrack(json.tracks[0]);
    setRecTracks(json.tracks);
  };

  return (
    <>
      {handleInstructions(props.playlist)}
      <section>
        {(activeTrack)
          ? <>
            {props.playlist.length > 0
              ? <>
                <Tuner setTunings={setTunings} tunings={tunings} getRecommendations={getRecommendations}/>
              </>
              : '' }
            <div className={props.playlist.length === 0 ? "full" : ''}>
              <Player activeTrack={activeTrack} nextTrack={nextTrack} addToPlaylist={addToPlaylist} />
            </div>
            {props.playlist.length > 0
              ? <>
                <Playlist playlist={props.playlist} name={props.name} setName={props.setName} />
              </>
              : '' }
          </>
          : '' }
        <div>
        </div>
      </section>
    </>
  );
}
export default Build;
