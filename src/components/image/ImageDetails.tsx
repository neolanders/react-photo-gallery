import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { Image } from '../../types/Image'
import { toggleFavorite, deleteImage } from '../../redux/reducers/imageSlice'

const ImageContainer = styled.div`
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
`

const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 138px;
`

const ImageActions = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`

const ImageAction = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    cursor: pointer;
    outline: none;
    &:hover {
        background-color: #0069d9;
    }
`

const NoImagesMessage = styled.p`
    color: #999;
`

const ImageDetails: React.FC = () => {
    const selectedImage = useSelector<RootState, Image | null>(
        (state) => state.images.activeImage
    )
    const dispatch = useDispatch()

    const handleToggleFavorite = () => {
        if (selectedImage) {
            dispatch(toggleFavorite({ id: selectedImage.id }))
        }
    }

    const handleDeleteImage = () => {
        if (selectedImage) {
            dispatch(deleteImage({ id: selectedImage.id }))
        }
    }

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
            </ImageContainer>
            <ImageActions>
                <ImageAction onClick={handleToggleFavorite}>
                    {selectedImage.favorited ? 'Unfavorite' : 'Favorite'}
                </ImageAction>
                <ImageAction onClick={handleDeleteImage}>Delete</ImageAction>
            </ImageActions>
        </>
    )
}

export default ImageDetails
