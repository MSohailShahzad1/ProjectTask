// src/types/randomUser.ts

export interface UserName {
    first: string
    last: string
}

export interface UserPicture {
    large: string
}

export interface UserLogin {
    uuid: string
}

export interface User {
    login: UserLogin
    gender: string
    name: UserName
    email: string
    picture: UserPicture
}

export interface RandomUserApiResponse {
    results: User[]
}
