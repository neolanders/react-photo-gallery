import { Image } from '../types/Image'

export const bytesToMB = (bytes: number) =>
    (bytes / (1024 * 1024)).toFixed(2) + ' MB'

export const getSortedImages = (images: Image[]) =>
    images
        .slice()
        .sort((a: { createdAt: any }, b: { createdAt: string }) =>
            b.createdAt.localeCompare(a.createdAt)
        )

export const getFavoritedImages = (images: Image[]) =>
    images.filter((image: Image) => image.favorited)
