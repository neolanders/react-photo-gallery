import React from 'react'
import styled from 'styled-components'

interface Props {
    fullText: string
    maxLength: number
}

const TruncatedText = styled.span<Props>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    max-width: ${({ maxLength }) => maxLength}px;
    cursor: pointer;
    &:hover:after {
        content: ${({ fullText }) => `'${fullText}'`};
        position: absolute;
        left: 0;
        top: 100%;
        white-space: normal;
        background-color: white;
        padding: 5px;
        z-index: 999;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
`

const TruncatedTextComponent: React.FC<Props> = ({ fullText, maxLength }) => {
    return (
        <TruncatedText fullText={fullText} maxLength={maxLength}>
            {fullText}
        </TruncatedText>
    )
}

export default TruncatedTextComponent
