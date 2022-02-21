import { instance } from "./api";
import { AuthMeDataType, LoginDataType, ResponseDataType } from "./types";

export const authAPI = {
    async auth() {
        const response = await instance.get<ResponseDataType<AuthMeDataType>>(`auth/me`);
        return response.data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: boolean|undefined) {
        const response = await instance.post<ResponseDataType<LoginDataType>>(`auth/login`, 
            {email, password, rememberMe, captcha});
        return response.data;
    },
    async logout() {
        const response = await instance.delete<ResponseDataType>(`auth/login`);
        return response.data;
    }
}
