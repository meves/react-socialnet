import { ResultCodes } from "../enums/responseCodes";
import { PhotosType, UserType } from "../types/types";

export type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
export type ResponseDataType<D={}, RC=ResultCodes> = {
    resultCode: RC
    messages: string[]
    data: D
}
export type PhotosDataType = {
    photos: PhotosType    
}
export type AuthMeDataType = {
    id: number
    email: string
    login: string    
}
export type LoginDataType = {
    userId: number
}
export type ResponseDataGetCaptchaUrlType = {
    url: string
}