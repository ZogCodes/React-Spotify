import React, { useState } from "react";

function Tuner(props) {
  const [activeTunes, setActiveTunes] = useState('');
  const allTunes = [
    'target_acousticness',
    'target_danceability',
    'target_energy',
    'target_instrumentalness',
    'target_loudness',
    'target_popularity',
    'target_tempo',
    'target_valence'
  ];

  const handleCheck = (event) => {
    if (event.target.checked) {
      setActiveTunes([...activeTunes, event.target.name]);
    } else {
      const newTunes = activeTunes.filter(el => el !== event.target.name);
      setActiveTunes(newTunes);
      const newTunings = Object.keys(props.tunings).reduce((object, key) => {
        if (key !== event.target.name) {
          object[key] = props.tunings[key];
        }
        return object;
      }, {});
      props.setTunings(newTunings);
    }
  };

  const handleSlider = (event) => {
    const [name, value] = [event.target.name, event.target.value];
    props.setTunings({ ...props.tunings, [name]: value });
  };

  const createTuners = allTunes.map((el, index) =>
    <div key={index}>
      <input type="checkbox" name={el} onChange={()=> handleCheck(event)}></input>
      <label htmlFor={el} >{el}</label>
      { activeTunes.indexOf(el) !== -1 ? 
        <input type="range" min="0" max="1" step="0.1" onChange={() => handleSlider(event)} name={el}></input>
        : ''}
    </div>);

  return <>{createTuners}</>;
}

export default Tuner;
