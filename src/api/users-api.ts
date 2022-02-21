import { instance } from "./api";
import { GetUsersType } from "./types";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 5) {
        const response = await instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`); 
        return response.data;
    }
}
