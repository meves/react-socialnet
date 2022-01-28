import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a4367af1-edc7-4a2a-bdcc-eb84478de1f8"
    }
});

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 5) {
        const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`); 
        return response.data;
    },    
    async followUser(userId) {
        const response = await instance.post(`follow/${userId}`);
        return response.data;
    },
    async unfollowUser(userId) {
        const response = await instance.delete(`follow/${userId}`);
        return response.data;
    }
}

export const profileAPI = {
    async getProfile(userId) {
        const response = await instance.get(`profile/${userId}`);
        return response.data;
    },
    async updateStatus(status) {
        const response = await instance.put('profile/status', {status});
        return response.data;
    },
    async getStatus(userId) {
        const response = await instance.get(`profile/status/${userId}`);
        return response.data;
    },
    async updatePhoto(profilePhoto) {
        const formData = new FormData();
        formData.append('image', profilePhoto);
        const response = await instance.put(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
        return response.data;
    },
    async saveProfile(profile) {
        const response = await instance.put('profile', profile);
        return response.data;
    } 
}

export const authAPI = {
    async auth() {
        const response = await instance.get(`auth/me`);
        return response.data;
    },
    async login(email, password, rememberMe = false, captcha) {
        const response = await instance.post(`auth/login`, {email, password, rememberMe, captcha});
        return response.data;
    },
    async logout() {
        const response = await instance.delete(`auth/login`);
        return response.data;
    }
}

export const securityAPI = {
    async getCaptcha() {
        const response = await instance.get(`security/get-captcha-url`);
        return response.data;
    }
}
