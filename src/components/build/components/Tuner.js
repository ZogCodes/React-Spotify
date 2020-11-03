import React, { useState } from "react";
import styled from 'styled-components';
import vars from '../../../styles/vars';
import Button from './Button';

const StyledTuner = styled.div`
  background-color: ${vars.color5};
  padding: ${vars.normalPadding};
  grid-area: 1/1/3/2;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  color: ${vars.color1};

  .tuner {
    padding: 10px 0;

    label {
      padding-bottom: 1rem;
      display: inline-block;
    }

    input {
      
      &[type="checkbox"] {
        margin: 0 1rem 0 0;
      }

      &[type="range"] {
        display: block;
        width: 90%;
        margin: 10px;
        -webkit-appearance: none;
        background-color: ${vars.color1};
        outline: none;
  
        &::-webkit-slider-runnable-track {
          height: 10px;
          -webkit-appearance: none;
          color: ${vars.color7};
        }
        
        &::-webkit-slider-thumb {
          width: 10px;
          -webkit-appearance: none;
          height: 30px;
          cursor: ew-resize;
          background: ${vars.color7};
          position: relative;
          top: -100%;
        }
      }
    }
  }
`;

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

  const handleCheck = event => {
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

  const handleSlider = event => {
    const [name, value] = [event.target.name, event.target.value];
    props.setTunings({ ...props.tunings, [name]: value });
  };

  const formatString = string => (string.charAt(0).toUpperCase() + string.slice(1)).replace('_', ' ');

  const createTuners = allTunes.map((el, index) => <div key={index} className="tuner">
    <input type="checkbox" name={el} onChange={() => handleCheck(event)}></input>
    <label htmlFor={el} >{formatString(el)}{props.tunings[el] ? `: ${props.tunings[el] * 10}/10` : ''}</label>
    { activeTunes.indexOf(el) !== -1
      ? <input type="range" min="0" max="1" step="0.1" onChange={() => handleSlider(event)} name={el}></input>
      : ''}
  </div>);

  return (
    <StyledTuner>
      <div>{createTuners}</div>
      <Button onClick={props.getRecommendations} text="Get recommendations" />
    </StyledTuner>);
}

export default Tuner;
