import { instance } from "./api";
import { ResponseDataGetCaptchaUrlType } from "./types";

export const securityAPI = {
    async getCaptcha() {
        const response = await instance.get<ResponseDataGetCaptchaUrlType>(`security/get-captcha-url`);
        return response.data;
    }
}
