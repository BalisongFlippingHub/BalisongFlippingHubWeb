import { Comment } from "./Comment";

export interface Post {
    uuid?: string,
    caption: string,
    creatorId: string,
    creatorName: string,
    creatorProfileImg?: File | null,
    creationDate: string,
    files: Array<string>,
    comments: Array<Comment>,
    likes: number,
    tag: string | null,
}

export interface PostPreview {
    id: string, 
    caption: string,
    description: string,
    creatorId: string,
    creatorName: string,
    creatorProfileImg?: string | null,
    creationDate: string,
    files: Array<File>,
    comments: Array<Comment> | null,
    likes: number, 
    identifer: string | null
}

export interface PostCreationObject {
    id: string, 
    caption: string,
    description: string,
    creatorId: string,
    creatorName: string,
    creatorProfileImg?: string | null,
    creationDate: string,
    files: Array<File>,
    comments: Array<Comment> | null,
    likes: number, 
    identifer: string | null
}

export interface PostCreationObjectLinkedPost {
    id: string, 
    caption: string,
    description: string,
    creatorId: string,
    creatorName: string,
    creatorProfileImg?: string | null,
    creationDate: string,
    files: Array<File>,
    comments: Array<Comment> | null,
    likes: number, 
    identifer: string | null
}