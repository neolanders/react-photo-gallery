import React from 'react'
import styled from 'styled-components'
import TruncatedTextWithTooltip from '../ui/TruncatedTextWithTooltip'

interface Props {
    filename?: string
    maxLength: number
}

const ImageFileNameContent = styled.p`
    color: #000;
    font-size: 10px;
    font-weight: 600;
    margin: 0;
    padding: 0;
`

const ImageFileName: React.FC<Props> = ({ filename, maxLength }) => {
    return (
        <ImageFileNameContent>
            <TruncatedTextWithTooltip
                fullText={filename || ''}
                maxLength={maxLength}
            />
        </ImageFileNameContent>
    )
}

export default ImageFileName
