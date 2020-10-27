import React, {useEffect, useState} from 'react';
import Playlist from "./components/Playlist";
import Tuner from "./components/Tuner";

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

  const nextTrack = () => {
    setIndex(prevIndex => prevIndex + 1);
    recTracks.length > 0 ? setTrack(recTracks[activeIndex + 1]) : setTrack(myTracks[activeIndex + 1]);
  };

  const addToPlaylist = () => {
    props.setPlaylist([activeTrack, ...props.playlist]);
    props.playlist.length == 0 ? setTunings({ ...tunings, 'seed_tracks': activeTrack.id, 'seed_artists':activeTrack.artists[0].id }) : '';
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
    <section>
      {(activeTrack)
        ? <>
          <p>{activeTrack.name}</p>
          <p>{activeTrack.artists[0].name}</p>
          {/* <audio controls>
            <source src={activeTrack.preview_url} type="audio/ogg" />
          </audio> */}

          <button onClick={() => nextTrack()}>Next Track</button>
          <button onClick={() => addToPlaylist()}>Add to playlist</button>
          <Playlist playlist={props.playlist} />
          {props.playlist.length > 0 ?
            <>
              <Tuner setTunings={setTunings} tunings={tunings}/>
              <button onClick={() => getRecommendations()}>Get Recs</button>
            </>
            : '' }
        </>
        : ''}
      <div>
        In dev instructions...
        <ol>
          <li>The first tracks you'll see are recommended based on your spotify listener data.
            Click "Next Track" until you find a track you like, and then click "Add to Playlist".</li>
          <li>Check music attributes on and off to tune for songs- 
            moving a slider to the left puts the value super low, and to the right puts it super high.</li>
          <li>Click "Get Recs" to find new songs.</li>
        </ol>
      </div>
    </section>
  );
}
export default Build;