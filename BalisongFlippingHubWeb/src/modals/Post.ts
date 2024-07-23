export interface Post {
    id?: string,
    caption: string | null,
    description: string | null,
    creatorId: string,
    creatorName: string,
    creatorProfileImg?: string | null,
    creationDate: string,
    files: Array<string>,
    comments: Array<string>,
    likes: number,
    identifier: string | null,
    isPrivate: boolean,
    isAnnouncement: boolean,
    hasTimer: boolean,
    timerValue: number | null
}

export interface PostCover {
    id?: string,
    caption: string | null,
    coverFile: string | null,
    comments: number,
    likes: number,
    identifier: string | null,
    isPrivate: boolean,
    isAnnouncement: boolean
}

export interface PostPreview {
    id: string, 
    caption: string,
    description: string,
    creatorName: string,
    creatorProfileImg?: string | null,
    creationDate: string,
    files: Array<File>,
    likes: number, 
    identifer: string | null,
    isAnnouncement: boolean,
    isPrivatePost: boolean,
    hasTimer: boolean,
    timeInHours: string
}

export interface CreationPostDTO {
    caption: string,
    description: string,
    creatorId: string,
    identifier: string, 
    isPrivatePost: boolean,
    isAnnouncement: boolean,
    hasTimer: boolean
    timerInHours: string,
}