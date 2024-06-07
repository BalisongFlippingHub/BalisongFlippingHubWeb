export interface Profile {
    email: string,  
    token: string,
    role: ROLE 
}

export enum ROLE {
    MAKER,
    USER,
    ADMIN
}

export interface MakerProfile extends Profile {
    companyName: string
}

export interface AdminProfile extends Profile {
    displayName: string
}

export interface UserProfile extends Profile {
    displayName: string
}