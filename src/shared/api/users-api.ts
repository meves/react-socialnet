import { FriendDataType } from "types/types";
import { instance } from "./api";
import { GetUsersType } from "./types";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 5, term = "", friend: boolean | null = null) {
        const response = await instance.get<GetUsersType>
            (`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend !== null ? friend : ""}`); 
        return response.data;
    },
    async getFriends(count: number, page: number, friend: boolean) {
        const response = await instance.get<FriendDataType>
            (`users?count=${count}&page=${page}&friend=${friend}`);
        return response;
    }
}
