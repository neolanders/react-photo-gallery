import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { Image } from '../types/Image'
import { setActiveImage } from '../redux/reducers/imageSlice'

interface ImageListProps {
    onImageClick: () => void
    activeTab: number
}

const ImageItem = styled.div`
    object-fit: cover;
    width: 72px;
    height: 72px;
`

const ImagePreview = styled.img`
    max-width: 100%;
    height: auto;
    cursor: pointer;
`

const ImageListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7fafc;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const NoImagesMessage = styled.p`
    color: #999;
`

const ImageList: React.FC<ImageListProps> = ({ activeTab }) => {
    const images = useSelector<RootState, Image[]>((state) => state.images.data)
    const dispatch = useDispatch()

    const handleImageClick = (image: Image) => {
        dispatch(setActiveImage(image))
    }

    const renderContent = () => {
        switch (activeTab) {
            // Recently added images
            case 1: {
                const sortedImages = images
                    .slice()
                    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                if (sortedImages.length === 0) {
                    return (
                        <NoImagesMessage>
                            No recently added images
                        </NoImagesMessage>
                    )
                }
                return sortedImages.map((image) => (
                    <ImageItem key={image.id}>
                        <ImagePreview
                            src={image.url}
                            alt={image.filename}
                            onClick={() => handleImageClick(image)}
                        />
                    </ImageItem>
                ))
            }
            // Favorited images
            case 2: {
                const favoritedImages = images.filter(
                    (image) => image.favorited
                )
                if (favoritedImages.length === 0) {
                    return (
                        <NoImagesMessage>No favorited images</NoImagesMessage>
                    )
                }
                return favoritedImages.map((image) => (
                    <ImageItem key={image.id}>
                        <ImagePreview
                            src={image.url}
                            alt={image.filename}
                            onClick={() => handleImageClick(image)}
                        />
                    </ImageItem>
                ))
            }
            default: {
                return images.map((image) => (
                    <ImageItem key={image.id}>
                        <ImagePreview
                            src={image.url}
                            alt={image.filename}
                            onClick={() => handleImageClick(image)}
                        />
                    </ImageItem>
                ))
            }
        }
    }
    return <ImageListContainer>{renderContent()}</ImageListContainer>
}

export default ImageList
