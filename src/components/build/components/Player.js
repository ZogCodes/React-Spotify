import React, { useRef, useState, useEffect } from "react";
import styled from 'styled-components';
import vars from '../../../styles/vars';
import Button from './Button';

const StyledPlayer = styled.div`
  text-align: center;
  padding: ${vars.normalPadding};

  .image-wrapper {
    position: relative;

    img {
      width: 200px;
      box-shadow: ${vars.boxShadow};
  
      .full & {
        width: 450px;
      }
    }

    i {
      position: absolute;
      font-size: 90px;
      top: calc(50% - 50px);
      left: calc(50% - 45px);
      opacity: 0.9;
      box-shadow: 0.5rem 0.5rem 0.5rem rgba(0,0,0,0.5);
      border-radius: 100%;
    }
  }

  .top {
    position: relative;

    &-next, 
    &-prev {
      position: absolute;
      display: flex;
      align-items: center;
      cursor: pointer;
      top: 40%;

      span {
        text-transform: uppercase;
      }
      
      i {
        font-size: 60px;
      }

      &:hover {
        color: ${vars.color6}
      }
    }
    &-next {
      right: 10%;

      span {
        margin-right: 0.25rem;
      }
    }
    &-prev {
      left: 10%;

      span {
        margin-left: 0.25rem;
      }
    }
  }


  h3 {
    margin-bottom: 0.5rem
  }

  p {
    margin: 0
  }
`;

function Player(props) {
  const [playerState, setPlayerState] = useState({
    playing: false,
    playerIcon: <i className="fas fa-pause-circle" onClick={() => handlePlayer()}></i>
  });

  const player = useRef();

  const handlePlayer = () => {
    if (!props.activeTrack.preview_url) {
      console.log('no preview track');
    } else if (player.current.paused) {
      player.current.play();
      setPlayerState({ ...playerState, playing: true, playerIcon: <i className="fas fa-pause-circle" onClick={() => handlePlayer()}></i>});
    } else {
      player.current.pause();
      setPlayerState({ ...playerState, playing: false, playerIcon: <i className="fas fa-play-circle" onClick={() => handlePlayer()}></i>});
    }
  };

  useEffect(() => {
    if (props.activeTrack.preview_url) {
      player.current.src = props.activeTrack.preview_url;
      setPlayerState({ ...playerState, playing: true, playerIcon: <i className="fas fa-pause-circle" onClick={() => handlePlayer()}></i>});
    } else {
      setPlayerState({ ...playerState, playing: false, playerIcon: ''});
    }
  }, [props.activeTrack]);

  console.log(props.activeTrack);

  return (
    <StyledPlayer>
      <div className="top">
        <div className="image-wrapper">
          {playerState.playerIcon}
          <img src={props.activeTrack.album.images[0].url} onClick={() => handlePlayer()} />
        </div>
        <div className="top-next" onClick={() => props.nextTrack('NEXT')}>
          <span>Next</span>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className="top-prev" onClick={() => props.nextTrack('PREV')}>
          <i className="fas fa-chevron-left"></i>
          <span>Previous</span>
        </div>
      </div>
      { props.activeTrack.preview_url
        ? <audio ref={player} autoPlay>
          <source src={props.activeTrack.preview_url} type="audio/ogg" />
        </audio>
        : ''
      }
      <h3>{props.activeTrack.name}</h3>
      <p>{props.activeTrack.artists[0].name}</p>
      <Button onClick={props.addToPlaylist} text="Add to playlist" />
    </StyledPlayer>
  );
}

export default Player;
