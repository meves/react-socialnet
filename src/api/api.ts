import axios from "axios";
import { ResponseDataAuthMeType, ResponseDataEmptyDataType, ResponseDataGetCaptchaUrlType, 
         ResponseDataGetUsersType, ResponseDataLoginType, ResponseDataPutProfilePhotoType } from "./types";
import { UserProfileType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a4367af1-edc7-4a2a-bdcc-eb84478de1f8"
    }
});

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 5) {
        const response = await instance.get<ResponseDataGetUsersType>(`users?page=${currentPage}&count=${pageSize}`); 
        return response.data;
    },    
    async followUser(userId: number) {
        const response = await instance.post<ResponseDataEmptyDataType>(`follow/${userId}`);
        return response.data;
    },
    async unfollowUser(userId: number) {
        const response = await instance.delete<ResponseDataEmptyDataType>(`follow/${userId}`);
        return response.data;
    }
}

export const profileAPI = {
    async getProfile(userId: number) {
        const response = await instance.get<UserProfileType>(`profile/${userId}`);
        return response.data;
    },
    async updateStatus(status: string) {
        const response = await instance.put<ResponseDataEmptyDataType>('profile/status', {status});
        return response.data;
    },
    async getStatus(userId: number) {
        const response = await instance.get<string>(`profile/status/${userId}`);
        return response.data;
    },
    async updatePhoto(profilePhoto: any) {
        const formData = new FormData();
        formData.append('image', profilePhoto);
        const response = await instance.put<ResponseDataPutProfilePhotoType>(`profile/photo`, formData, {headers:
            {'Content-Type': 'multipart/form-data'}});
        return response.data;
    },
    async saveProfile(profile: UserProfileType) {
        const response = await instance.put<ResponseDataEmptyDataType>('profile', profile);
        return response.data;
    } 
}

export const authAPI = {
    async auth() {
        const response = await instance.get<ResponseDataAuthMeType>(`auth/me`);
        return response.data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: boolean|undefined) {
        const response = await instance.post<ResponseDataLoginType>(`auth/login`, {email, password, rememberMe, captcha});
        return response.data;
    },
    async logout() {
        const response = await instance.delete<ResponseDataEmptyDataType>(`auth/login`);
        return response.data;
    }
}

export const securityAPI = {
    async getCaptcha() {
        const response = await instance.get<ResponseDataGetCaptchaUrlType>(`security/get-captcha-url`);
        return response.data;
    }
}
