export interface Profile {
    uuid: string | null,
    email: string | null,  
    role: String | null, 
    posts: Array<null>,
}

export interface MakerProfile extends Profile {
    companyName: string | null,
    companyDuration: DoubleRange,
    products: Array<null>,
    services: Array<null>,
    facebookLink: string,
    instagramLink: string,
    twitterLink: string,
    personalEmailLink: string,
    personalWebsiteLink: string
}

export interface AdminProfile extends Profile {
    displayName: string
}

export interface UserProfile extends Profile {
    displayName: string,
    ownedKnives: Array<null>,
    facebookLink: string,
    instagramLink: string,
    twitterLink: string,
    personalEmailLink: string,
    personalWebsiteLink: string
}