import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
    ImageThunkDispatch,
    fetchImages,
    setActiveImage,
} from '../../redux/reducers/imageSlice'
import { Image } from '../../types/Image'
import ImageList from '../image/ImageList'
import GallerySidebar from './GallerySidebar'
import { RootState } from '../../redux/store'
import { getFavoritedImages, getSortedImages } from '../../utils/index'

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
    padding: 16px 0px 0px 32px;
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
        isActive ? '2px solid #756DEA' : '2px solid transparent'};
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
    const images: any = useSelector<RootState, Image[]>(
        (state) => state.images.data
    )
    const loading = useSelector<RootState, boolean>(
        (state) => state.images.isLoading
    )
    const [loadedImages, setLoadedImages] = useState([])

    const getFirstImageTab = (images: Image[]) => {
        let firstImage = images[0]
        switch (activeTab) {
            case 1:
                firstImage = getSortedImages(images)[0]
                break
            case 2:
                firstImage = getFavoritedImages(images)[0]
                break
        }
        return firstImage
    }

    const firstImage = getFirstImageTab(images)

    useEffect(() => {
        dispatch(fetchImages())
    }, [dispatch])

    useEffect(() => {
        if (!loading && images) {
            setLoadedImages(images)
        }
    }, [loading, images])

    useEffect(() => {
        if (firstImage) {
            dispatch(setActiveImage(firstImage)) // Set the first image as activeImage
        }
    }, [dispatch, firstImage, activeTab])

    const handleTabClick = useCallback((index: number) => {
        setActiveTab(index)
    }, [])

    return (
        <GalleryContainer>
            <GalleryContent>
                <GalleryHeader>
                    <GalleryTitle>Photos</GalleryTitle>
                    <GalleryTabs>
                        <GalleryTab
                            aria-selected={activeTab === 1}
                            isActive={activeTab === 1}
                            onClick={() => handleTabClick(1)}
                        >
                            Recently Added
                        </GalleryTab>
                        <GalleryTab
                            aria-selected={activeTab === 2}
                            isActive={activeTab === 2}
                            onClick={() => handleTabClick(2)}
                        >
                            Favorited
                        </GalleryTab>
                    </GalleryTabs>
                </GalleryHeader>
                <ImageList loadedImages={loadedImages} activeTab={activeTab} />
            </GalleryContent>
            <GallerySidebar />
        </GalleryContainer>
    )
}

export default Gallery
