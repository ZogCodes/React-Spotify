import React, {useEffect, useState} from 'react';

function Builder(props) {
  const [activeTrack, setTrack] = useState('');
  const [activeIndex, setIndex] = useState(0)

  useEffect(() => {
    const spotifyURL = `https://api.spotify.com/v1/me/top/tracks`;
    const getTrack = async () => {
      const res = await fetch(spotifyURL, {
        headers: {
          Authorization: 'Bearer ' + props.accessToken
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

  return (
    <>
      <p>Builder</p>

      {(activeTrack)
        ? <>
          <p>{activeTrack.name}</p>
          <p>{activeTrack.artists[0].name}</p>
          <button onClick={()=> nextTrack()}>Next Track</button>
        </>
        : ''}
    </>
  );
}
export default Builder;
