import { UserType } from "./types";

export type ResponseDataGetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
export type ResponseDataEmptyDataType = {
    resultCode: number
    messages: string[]
    data: { }
}
export type ResponseDataPutProfilePhotoType = {
    data: {
        photos: {
            small: string
            large: string
        }
    }
    resultCode: number
    messages: Array<string>
}
export type ResponseDataAuthMeType = {
    resultCode: number
    messages: Array<string>,
    data: {
      id: number
      email: string
      login: string
    }
}
export type ResponseDataLoginType = {
    resultCode: number
    messages: Array<string>
    data: {
      userId: number
    }
}
export type ResponseDataGetCaptchaUrlType = {
    url: string
}