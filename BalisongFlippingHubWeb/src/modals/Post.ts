import { Comment } from "./Comment";

export interface Post {
    uuid?: string,
    caption: string,
    creatorId: string,
    creatorName: string,
    creatorProfileImg?: File | null,
    creationDate: string,
    captionTop: boolean,
    files: Array<File>,
    comments: Array<Comment>,
    likes: number,
    tag: string | null,
}