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

// dialogsPage
export const recieveDialogsPage = state => state.dialogsPage;

// auth
export const recieveLogin = state => state.auth.login;
export const recieveIsAuth = state => state.auth.isAuth;
export const recieveUserId = state => state.auth.id;
export const receiveCaptchaUrl = state => state.auth.captchaUrl;

// profilePage
export const recieveProfilePage = state => state.profilePage.posts;
export const recieveUserProfile = state => state.profilePage.userProfile;
export const recieveStatus = state => state.profilePage.status;
    