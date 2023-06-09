import { Image } from '../types/Image'
import moment from 'moment'

export const bytesToMB = (bytes: number) =>
    (bytes / (1024 * 1024)).toFixed(2) + ' MB'

export const getSortedImages = (images: Image[]) =>
    images
        .slice()
        .sort(
            (
                a: { createdAt: any; favorited: boolean },
                b: { createdAt: string; favorited: boolean }
            ) => b.createdAt.localeCompare(a.createdAt)
        )

export const getFavoritedImages = (images: Image[]) =>
    images.filter((image: Image) => image.favorited)

export const getFormatedDate = (date: string) =>
    moment(date).format('MMMM DD, YYYY')
