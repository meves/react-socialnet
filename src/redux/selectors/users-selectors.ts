import { createSelector } from "reselect";
import { UserType } from "../../types/types";
import { AppStateType } from "../redux-store";

const getUsers = (state: AppStateType): Array<UserType> => state.usersPage.users;
export const recieveUsers = createSelector(getUsers, (users: Array<UserType>): Array<UserType> => {
    return users.filter((user: UserType) => true);
});
export const recievePageSize = (state: AppStateType): number => state.usersPage.pageSize;
export const recieveTotalUsersCount = (state: AppStateType): number => state.usersPage.totalUsersCount;
export const recieveCurrentPage = (state: AppStateType): number => state.usersPage.currentPage;
export const recieveIsFetching = (state: AppStateType): boolean => state.usersPage.isFetching;
export const recieveFollowingInProgress = (state: AppStateType): Array<number> => state.usersPage.followingInProgress;
export const receiveBlockSize = (state: AppStateType): number => state.usersPage.blockSize;