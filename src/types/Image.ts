export interface Image {
    id: string
    filename?: string
    url: string
    uploadedBy: string
    createdAt: string
    updatedAt: string
    favorited: boolean
    sizeInBytes: number
    dimensions: {
        height: number
        width: number
    }
    resolution: {
        height: number
        width: number
    }
    description: string
}
