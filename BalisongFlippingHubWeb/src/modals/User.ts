import { Post } from "./Post"

export interface Profile {
    uuid: string | null,
    email: string | null,  
    role: String | null, 
    posts: Array<Post>,
    profileImg: File | null,
    bannerImg: File | null,

    compnayName?: string | null,
    companyDuration?: DoubleRange | null,
    products?: Array<null>,
    services?: Array<null>,
    facebookLink?: string | null,
    instagramLink?: string | null,
    twitterLink?: string | null,
    personalEmailLink?: string | null,
    personalWebsiteLink?: string | null,

    displayName?: string | null
    ownedKnives?: Array<null> | null
}