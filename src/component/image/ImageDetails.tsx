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
import { getFormatedDate } from '../../utils'
import ImagePreview from './ImagePreview'

const ImageContainer = styled.div`
    width: 100%;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ImageSubContent = styled.div`
    display: flex;
    flex-direction: row;
    width: 222px;
    margin-top: 16px;
`

const ImageInfo = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

const FavoriteIconContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const ImageInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    div:first-child {
        border-top: 1px solid #d7dee8;
    }
    div:last-child {
        border-bottom: 1px solid #d7dee8;
    }
`

const TitleContent = styled.h2`
    color: #000;
`

const Content = styled.p`
    color: #9ea9b7;
    font-size: 0.7rem;
`

const ImageDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    max-width: 200px;
    @media (max-width: 768px) {
        max-width: 100%;
    }
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
                    minWidth={222}
                    maxHeight={138}
                    minHeight={138}
                />
                <ImageSubContent>
                    <ImageInfo>
                        <ImageFileName
                            filename={selectedImage.filename}
                            maxLength={221}
                        />
                        <ImageSize sizeInBytes={selectedImage.sizeInBytes} />
                    </ImageInfo>
                    <FavoriteIconContainer>
                        <HeartIcon
                            onClick={handleToggleFavorite}
                            fill={selectedImage.favorited ? 'red' : 'gray'}
                        />
                    </FavoriteIconContainer>
                </ImageSubContent>
            </ImageContainer>
            <ImageInfoContainer>
                <TitleContent>Information</TitleContent>
                <List label="Uploaded by" data={selectedImage.uploadedBy} />
                <List
                    label="Created"
                    data={getFormatedDate(selectedImage.createdAt)}
                />
                <List
                    label="Last modified"
                    data={getFormatedDate(selectedImage.updatedAt)}
                />
                <List
                    label="Dimensions"
                    data={`${selectedImage.dimensions.width} x ${selectedImage.dimensions.height}`}
                />
                <List
                    label="Resolution"
                    data={`${selectedImage.resolution.width} x ${selectedImage.resolution.height}`}
                />
            </ImageInfoContainer>
            <ImageDescriptionContainer>
                <TitleContent>Description</TitleContent>
                <Content>{selectedImage.description}</Content>
            </ImageDescriptionContainer>
            <ImageActions>
                <ImageAction onClick={handleDeleteImage}>Delete</ImageAction>
            </ImageActions>
        </>
    )
}

export default ImageDetails
