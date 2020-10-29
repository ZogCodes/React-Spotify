import React from "react";
import styled from 'styled-components';
import vars from '../../../styles/vars';

const StyledPlayer = styled.div`
  text-align: center;

  img {
    width: 450px;
    box-shadow: ${vars.boxShadow};
  }
  .top {
    position: relative;

    &-next {
      position: absolute;
      right: 10%;
      top: 40%;
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        text-transform: uppercase;
        margin-right: 0.25rem;
      }

      i {
        font-size: 80px;
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
  return (
    <StyledPlayer>
      <div className="top">
        <img src={props.activeTrack.album.images[0].url}/>
        <div className="top-next" onClick={()=> props.nextTrack()}>
          <span>Next</span>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
      <h3>{props.activeTrack.name}</h3>
      <p>{props.activeTrack.artists[0].name}</p>
    </StyledPlayer>
  );
}

export default Player;