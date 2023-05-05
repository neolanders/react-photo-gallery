import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

interface HeartIconProps {
    onClick?: MouseEventHandler<any> | undefined
    fill: string
}

const IconContainer = styled.div`
    width: 20px;
    height: 20;
    cursor: pointer;
`

const HeartIconSvg = styled.svg`
    transition: fill 0.2s ease-in-out;
    fill: #ccc;
    &:hover {
        fill: red;
    }
`

export const HeartIcon = ({ onClick, fill }: HeartIconProps) => {
    return (
        <IconContainer onClick={onClick}>
            <HeartIconSvg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                id="favorite"
            >
                <path
                    fill={fill}
                    d="m32 52.9-.8-.7C13 37.4 8.1 32.2 8.1 23.7c0-7 5.7-12.6 12.6-12.6 5.8 0 9.1 3.3 11.3 5.8 2.2-2.5 5.5-5.8 11.3-5.8 7 0 12.6 5.7 12.6 12.6 0 8.5-4.9 13.7-23.1 28.5l-.8.7zM20.7 13.7c-5.5 0-10 4.5-10 10 0 7.3 4.6 12.1 21.3 25.8C48.7 35.8 53.3 31 53.3 23.7c0-5.5-4.5-10-10-10-5 0-7.7 3-9.8 5.4L32 20.8l-1.5-1.7c-2.1-2.4-4.8-5.4-9.8-5.4z"
                ></path>
            </HeartIconSvg>
        </IconContainer>
    )
}
