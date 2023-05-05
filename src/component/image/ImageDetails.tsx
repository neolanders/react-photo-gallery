import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { Image } from '../../types/Image'
import { toggleFavorite, deleteImage } from '../../redux/reducers/imageSlice'
import { HeartIcon } from '../../assets/svg/HeartIcon'
import ImageFileName from './ImageFileName'
import ImageSize from './ImageSize'
import List from '../ui/List'

const ImageContainer = styled.div`
    width: 100%;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ImagePreview = styled.img`
    max-width: 100%;
    min-width: 222px;
    max-height: 138px;
    min-height: 138px;
`

const ImageSubContent = styled.div`
    display: flex;
    flex-direction: row;
`

const ImageInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const ImageInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const TitleContent = styled.h3`
    color: #000;
`

const Content = styled.p`
    color: #9ea9b7;
`

const ImageDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const ImageActions = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`

const ImageAction = styled.button`
    background-color: transparent;
    color: #000;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    cursor: pointer;
    outline: none;
    border: 1px solid #e4e9ef;
    &:hover {
        background-color: #e4e9eg;
    }
`

const NoImagesMessage = styled.p`
    color: #999;
    width: 100%;
    height: 100vh;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`

const ImageDetails: React.FC = () => {
    const selectedImage = useSelector<RootState, Image | null>(
        (state) => state.images.activeImage
    )
    const dispatch = useDispatch()

    const handleToggleFavorite = useCallback(() => {
        if (selectedImage) {
            dispatch(toggleFavorite({ id: selectedImage.id }))
        }
    }, [dispatch, selectedImage])

    const handleDeleteImage = useCallback(() => {
        if (selectedImage) {
            dispatch(deleteImage({ id: selectedImage.id }))
        }
    }, [dispatch, selectedImage])

    if (!selectedImage) {
        return <NoImagesMessage>No image selected</NoImagesMessage>
    }
    return (
        <>
            <ImageContainer>
                <ImagePreview
                    src={selectedImage.url}
                    alt={selectedImage.filename}
                />
                <ImageSubContent>
                    <ImageInfo>
                        <ImageFileName
                            filename={selectedImage.filename}
                            maxLength={221}
                        />
                        <ImageSize sizeInBytes={selectedImage.sizeInBytes} />
                    </ImageInfo>
                    <HeartIcon
                        onClick={handleToggleFavorite}
                        fill={selectedImage.favorited ? 'red' : 'gray'}
                    />
                </ImageSubContent>
            </ImageContainer>
            <ImageInfoContainer>
                <TitleContent>Information</TitleContent>
                <List label="Name" data="John Doe" />
                <List label="Age" data="25" />
                <List label="Email" data="john.doe@example.com" />
            </ImageInfoContainer>
            <ImageDescriptionContainer>
                <TitleContent>Description</TitleContent>
                <Content>sdfdsfdsfdsfdsf</Content>
            </ImageDescriptionContainer>
            <ImageActions>
                <ImageAction onClick={handleDeleteImage}>Delete</ImageAction>
            </ImageActions>
        </>
    )
}

export default ImageDetails
