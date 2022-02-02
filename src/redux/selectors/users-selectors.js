import { createSelector } from "reselect";

// usersPage
const getUsers = state => state.usersPage.users;
export const recieveUsers = createSelector(getUsers, (users) => {
    return users.filter(user => true);
});
export const recievePageSize = state => state.usersPage.pageSize;
export const recieveTotalUsersCount = state => state.usersPage.totalUsersCount;
export const recieveCurrentPage = state => state.usersPage.currentPage;
export const recieveIsFetching = state => state.usersPage.isFetching;
export const recieveFollowingInProgress = state => state.usersPage.followingInProgress;
export const recieveCurrentId =state => state.usersPage.currentId;
