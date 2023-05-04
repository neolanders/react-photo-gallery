import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import {
    ImageThunkDispatch,
    fetchImages,
} from '../../redux/reducers/imageSlice'
import ImageList from '../image/ImageList'
import GallerySidebar from './GallerySidebar'

const GalleryContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #f7fafc;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const GalleryTitle = styled.h1`
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
`

const GalleryHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const GalleryContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex-grow: 1;
    padding: 32px;
`

const GalleryTabs = styled.div`
    display: flex;
    justify-content: center;
`

const GalleryTab = styled.button<{ isActive: boolean }>`
    background-color: transparent;
    padding: 0;
    border: none;
    border-bottom: ${({ isActive }) =>
        isActive ? '1px solid #756DEA' : '1px solid transparent'};
    color: ${({ isActive }) => (isActive ? '#756DEA' : '#8592A3')};
    font-size: 1rem;
    cursor: pointer;
    margin-right: 1rem;
    outline: none;
    height: 36px;
`

const Gallery: React.FC = () => {
    const [activeTab, setActiveTab] = useState(1)
    const dispatch = useDispatch<ImageThunkDispatch>()

    useEffect(() => {
        dispatch(fetchImages())
    }, [dispatch])

    const handleTabClick = (index: number) => {
        setActiveTab(index)
    }

    return (
        <GalleryContainer>
            <GalleryContent>
                <GalleryHeader>
                    <GalleryTitle>Photos</GalleryTitle>
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
                </GalleryHeader>
                <ImageList activeTab={activeTab} />
            </GalleryContent>
            <GallerySidebar />
        </GalleryContainer>
    )
}

export default Gallery
