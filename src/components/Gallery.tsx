import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { ImageThunkDispatch, fetchImages } from '../redux/reducers/imageSlice'
import ImageList from './ImageList'
import GallerySidebar from './GallerySidebar'
// import GallerySidebar from './GallerySidebar'

const GalleryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const GalleryTabs = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
`

const GalleryTab = styled.button<{ isActive: boolean }>`
    background-color: ${({ isActive }) => (isActive ? '#007bff' : '#f2f2f2')};
    color: ${({ isActive }) => (isActive ? '#fff' : '#333')};
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 1rem;
    outline: none;
    height: 36px;
`

const Gallery: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0)
    const dispatch = useDispatch<ImageThunkDispatch>()

    useEffect(() => {
        dispatch(fetchImages())
    }, [dispatch])

    const handleTabClick = (index: number) => {
        setActiveTab(index)
    }

    return (
        <GalleryContainer>
            <GalleryTabs>
                <GalleryTab
                    isActive={activeTab === 1}
                    onClick={() => handleTabClick(1)}
                >
                    Recently Added
                </GalleryTab>
                <GalleryTab
                    isActive={activeTab === 2}
                    onClick={() => handleTabClick(2)}
                >
                    Favorited
                </GalleryTab>
            </GalleryTabs>
            <ImageList onImageClick={() => {}} activeTab={activeTab} />
            <GallerySidebar />
        </GalleryContainer>
    )
}

export default Gallery
