import { instance } from "./api";
import { UserProfileType } from "types/types";
import { PhotosDataType, ResponseDataType } from "./types";

export const profileAPI = {
    async getProfile(userId: number) {
        const response = await instance.get<UserProfileType>(`profile/${userId}`);
        return response.data;
    },
    async updateStatus(status: string) {
        const response = await instance.put<ResponseDataType>('profile/status', {status});
        return response.data;
    },
    async getStatus(userId: number) {
        const response = await instance.get<string>(`profile/status/${userId}`);
        return response.data;
    },
    async updatePhoto(profilePhoto: File) {
        const formData = new FormData();
        formData.append('image', profilePhoto);
        const response = await instance.put<ResponseDataType<PhotosDataType>>(`profile/photo`, formData, {headers:
            {'Content-Type': 'multipart/form-data'}});
        return response.data;
    },
    async saveProfile(profile: UserProfileType) {
        const response = await instance.put<ResponseDataType>('profile', profile);
        return response.data;
    } 
}
