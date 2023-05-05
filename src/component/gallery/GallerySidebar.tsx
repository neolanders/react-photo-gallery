import React from 'react'
import styled from 'styled-components'
import ImageDetails from '../image/ImageDetails'

const SidebarWrapper = styled.div`
    width: 25%;
    height: 100vh;
    background-color: #fff;
    padding: 32px;
    @media (max-width: 768px) {
        width: 100%;
        height: auto;
    }
`

const SidebarLink = styled.a`
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 20px;
    color: #818181;
    display: block;
`

const GallerySidebar: React.FC = () => {
    return (
        <SidebarWrapper>
            <ImageDetails />
        </SidebarWrapper>
    )
}

export default GallerySidebar
