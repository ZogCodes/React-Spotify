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
        attributes.acousticness = (attributes.acousticness + el.acousticness);
        attributes.danceability = (attributes.danceability + el.danceability);
        attributes.energy = (attributes.energy + el.energy);
        attributes.instrumentalness = (attributes.instrumentalness + el.instrumentalness);
        attributes.loudness = (attributes.loudness + el.loudness);
        attributes.valence = (attributes.valence + el.valence);
      });

      attributes.acousticness = attributes.acousticness/props.playlist.length;
      attributes.danceability = attributes.danceability/props.playlist.length;
      attributes.energy = attributes.energy/props.playlist.length;
      attributes.instrumentalness = attributes.instrumentalness/props.playlist.length;
      attributes.loudness = attributes.loudness/props.playlist.length;
      attributes.valence = attributes.valence/props.playlist.length;

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
