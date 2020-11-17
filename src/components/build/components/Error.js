import React from 'react';
import styled from 'styled-components';
import vars from '../../../styles/vars';

const StyledError = styled.div`
  background-color: ${vars.color6};
  padding: ${vars.smallPadding};
  font-size: 14px;
  color: ${vars.color1};
`;

export default function Error(props) {
  return <StyledError>{props.error}</StyledError>;
}
