import React from 'react'
import styled from 'styled-components'
import ImageDetails from '../image/ImageDetails'

const SidebarWrapper = styled.div`
    height: 100vh;
    background-color: #fff;
    padding: 16px;
    display: flex;
    flex-direction: column;
    max-width: 300px;
    @media (max-width: 768px) {
        max-width: 100%;
    }
`

const GallerySidebar: React.FC = () => {
    return (
        <SidebarWrapper>
            <ImageDetails />
        </SidebarWrapper>
    )
}

export default GallerySidebar
