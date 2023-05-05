import React from 'react'
import styled from 'styled-components'
import { bytesToMB } from '../../utils'

interface Props {
    sizeInBytes: number
}

const ImageSizeContent = styled.p`
    color: #9ea9b7;
    font-size: 10px;
    margin: 0;
    padding: 0;
`

const ImageSize: React.FC<Props> = ({ sizeInBytes }) => {
    return <ImageSizeContent>{bytesToMB(sizeInBytes)}</ImageSizeContent>
}

export default ImageSize
