import { instance } from "./api";
import { ResponseDataType } from "./types";

export const followAPI = {
    async followUser(userId: number) {
        const response = await instance.post<ResponseDataType>(`follow/${userId}`);
        return response.data;
    },
    async unfollowUser(userId: number) {
        const response = await instance.delete<ResponseDataType>(`follow/${userId}`);
        return response.data;
    }
}
