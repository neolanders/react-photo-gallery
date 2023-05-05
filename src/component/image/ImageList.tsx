import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Image } from '../../types/Image'
import { setActiveImage } from '../../redux/reducers/imageSlice'
import { getFavoritedImages, getSortedImages } from '../../utils'
import ImageSize from './ImageSize'
import ImageFileName from './ImageFileName'
import Spinner from '../ui/Spinner'

interface ImageListProps {
    activeTab: number
    loadedImages?: Image[]
}

const ImageItem = styled.div`
    border-radius: 5px;
    min-width: 100px;
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
    width: 100%;
    flex-direction: column;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 1rem;
    padding-top: 32px;
    border-top: 1px solid #d7dee8;
    @media (max-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 576px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

const NoImagesMessage = styled.div`
    color: #999;
    width: 100%;
    height: 100vh;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`

const ImageList: React.FC<ImageListProps> = ({ loadedImages, activeTab }) => {
    const dispatch = useDispatch()

    const handleImageClick = useCallback((image: Image) => {
        dispatch(setActiveImage(image))
    }, [])

    if (!loadedImages) {
        return <Spinner />
    }

    const renderImageList = (imageList: Image[]) => {
        return (
            <ImageListContainer>
                {imageList.map((image: Image) => (
                    <ImageItem key={image.id}>
                        <ImagePreview
                            src={image.url}
                            alt={image.filename}
                            onClick={() => handleImageClick(image)}
                        />
                        <ImageFileName
                            filename={image.filename}
                            maxLength={90}
                        />
                        <ImageSize sizeInBytes={image.sizeInBytes} />
                    </ImageItem>
                ))}
            </ImageListContainer>
        )
    }

    const renderContent = () => {
        switch (activeTab) {
            // Recently added images
            case 1: {
                const sortedImages = getSortedImages(loadedImages)
                if (sortedImages.length === 0) {
                    return (
                        <NoImagesMessage>
                            No recently added images
                        </NoImagesMessage>
                    )
                }
                return renderImageList(sortedImages)
            }
            // Favorited images
            case 2: {
                const favoritedImages = getFavoritedImages(loadedImages)
                if (favoritedImages.length === 0) {
                    return (
                        <NoImagesMessage>No favorited images</NoImagesMessage>
                    )
                }
                return renderImageList(favoritedImages)
            }
            default: {
                return <Spinner />
            }
        }
    }
    return renderContent()
}

export default ImageList
