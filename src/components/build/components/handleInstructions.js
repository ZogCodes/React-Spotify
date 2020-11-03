import React from 'react';
import styled from 'styled-components';
import vars from '../../../styles/vars';

const StyledIntructions = styled.div`
  background-color: ${vars.color1};
  padding: ${vars.smallPadding};
  font-size: 14px;
`;

export default function handleInstructions(playlist) {
  let instructions = '';
  switch (true) {
  case (playlist.length === 0):
    instructions = 'These songs are generated from your Spotify listening history. Click "Next" to find more. When you find a song you like, click "Add to Playlist".';
    break;
  case (playlist.length > 0) && (playlist.length < 5):
    // eslint-disable-next-line max-len
    instructions = 'Click "Get recommendations" to find more songs. Turn attributes on and off and change the slider values to tune further. These songs recommendations are generated from the content of your playlist so far.';
    break;
  case (playlist.length >= 5):
    instructions = 'When you\'re ready, export your playlist to Spotify.';
    break;
  default:
    instructions = '';
  }
  return (
    <StyledIntructions>{instructions}</StyledIntructions>);
}
