import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

const SpinnerIcon = styled.div`
    border: 0.2em solid rgba(0, 0, 0, 0.1);
    border-top-color: #0077cc;
    border-radius: 50%;
    width: 2em;
    height: 2em;
    animation: ${rotate} 1s linear infinite;
`

const Spinner: React.FC = () => {
    return (
        <SpinnerWrapper>
            <SpinnerIcon />
        </SpinnerWrapper>
    )
}

export default Spinner
