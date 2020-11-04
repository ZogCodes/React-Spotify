import React from 'react';
import styled from 'styled-components';
import vars from '../../../styles/vars';

const StyledButton = styled.button`
  -webkit-appearance: none;
  padding: 10px 20px;
  background-color: ${vars.color6};
  border-radius: 50px;
  color: ${vars.color1};
  text-transform: uppercase;
  font-weight: 600;
  border: 0;
  font-family: inherit;
  font-size: 14px;
  transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
  margin: 1rem 0;

  &.export {
    margin: 0 auto;
  }

  &:hover{
    transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
    background-color: ${vars.color2};
    color: ${vars.color7};
  }
`;

export default function Button(props) {
  return (
    <StyledButton className={props.extraClasses} onClick={() => props.onClick ? props.onClick() : ''}>{props.text}</StyledButton>
  );
}
