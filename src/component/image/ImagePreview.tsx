import React, { ImgHTMLAttributes, MouseEventHandler } from 'react'
import styled from 'styled-components'

interface Props {
    src: string
    alt?: string
    selected?: boolean
    onClick?: MouseEventHandler<any> | undefined
    minWidth?: number
    maxHeight?: number
    minHeight?: number
}

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    minWidth?: number
    maxHeight?: number
    minHeight?: number
    selected?: boolean
}

const ImageContent = styled.img<ImageProps>`
    max-width: 100%;
    height: auto;
    cursor: pointer;
    min-width: ${({ minWidth }) => minWidth}px;
    max-height: ${({ maxHeight }) => maxHeight}px;
    min-height: ${({ minHeight }) => minHeight}px;
    box-shadow: ${({ selected }) =>
        selected ? '0 0 0 2px #f7fafc, 0 0 0 4px #756dea' : 'none'};
`

const ImagePreview: React.FC<Props> = ({
    src,
    alt,
    selected,
    onClick,
    minWidth,
    maxHeight,
    minHeight,
}) => {
    return (
        <ImageContent
            selected={selected}
            src={src}
            alt={alt}
            onClick={onClick}
            minWidth={minWidth}
            maxHeight={maxHeight}
            minHeight={minHeight}
        />
    )
}

export default ImagePreview
