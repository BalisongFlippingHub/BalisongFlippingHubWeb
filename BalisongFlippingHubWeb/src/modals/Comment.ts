export interface Comment {
    uuid: string,
    creationDate: Date,
    creatorId: string,
    creatorName: string,
    comment: string,
    replies: Array<Comment>
    likes: number
}