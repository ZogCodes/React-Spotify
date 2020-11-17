import React, {useEffect, useState} from "react";

export default function Analysis(props) {
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    let ids = '';
    props.playlist.map(el => {
      ids = `${ids}${el.id},`;
      return ids;
    });
    const attributesURL = `https://api.spotify.com/v1/audio-features?ids=${ids}`;
    const getAttributes = async () => {
      const res = await fetch(attributesURL, {
        headers: {
          Authorization: `Bearer ${props.accessToken}`
        },
      });
      const json = await res.json();
      console.log(json);
      const attributes = {
        acousticness: 0,
        danceability: 0,
        energy: 0,
        instrumentalness: 0,
        loudness: 0,
        valence: 0
      };

      json.audio_features.map(el => {
        attributes.acousticness += el.acousticness;
        attributes.danceability += el.danceability;
        attributes.energy += el.energy;
        attributes.instrumentalness += el.instrumentalness;
        attributes.loudness += el.loudness;
        attributes.valence += el.valence;
      });

      attributes.acousticness /= props.playlist.length;
      attributes.danceability /= props.playlist.length;
      attributes.energy /= props.playlist.length;
      attributes.instrumentalness /= props.playlist.length;
      attributes.loudness /= props.playlist.length;
      attributes.valence /= props.playlist.length;

      setAnalysis(attributes);
    };
    getAttributes();
  }, [props.playlist]);

  const results = Object.keys(analysis).map((key, index) => <li key={index}>{key}: {Math.trunc(analysis[key]*10)}/10</li>);

  return (<>
    Analysis
    <ul>{results}</ul>
  </>);
}
