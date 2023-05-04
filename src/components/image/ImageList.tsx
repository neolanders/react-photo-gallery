import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { Image } from '../../types/Image'
import { setActiveImage } from '../../redux/reducers/imageSlice'

interface ImageListProps {
    activeTab: number
}

const ImageItem = styled.div`
    border-radius: 5px;

    img {
        width: 100px;
        height: 77px;
        object-fit: cover;
    }
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    padding-top: 32px;
    border-top: 1px solid #d7dee8;
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 576px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const ImageFileName = styled.p`
    color: #000;
    font-size: 10px;
`

const ImageSize = styled.p`
    color: #9ea9b7;
    font-size: 10px;
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
                        <ImageFileName>{image.filename}</ImageFileName>
                        <ImageSize>{image.sizeInBytes}</ImageSize>
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
