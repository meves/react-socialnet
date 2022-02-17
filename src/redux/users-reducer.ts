import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { ResultCodes } from "../enums/responseCodes";
import { ResponseDataEmptyDataType, ResponseDataGetUsersType } from "../api/types";
import { UserType } from "../types/types";
import { ActionsTypes, AppStateType } from "./redux-store";

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    blockSize: 20,
    isFetching: false,
    followingInProgress: [] as Array<number>
}
type InitialStateType = typeof initialState

const usersReducer = (state=initialState, action: ActionsTypes<ActionType>): InitialStateType => {
    switch(action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case "SET_USERS":
            return {
                ...state,
                users: [...action.users]
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case "TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "TOGGLE_FOLLOWING_IN_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId] 
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

const action = {
    follow: (userId: number) => ({
        type: "FOLLOW", userId
    } as const),
    unfollow: (userId: number) => ({
        type: "UNFOLLOW", userId
    } as const),
    setUsers: (users: Array<UserType>) => ({
        type: "SET_USERS", users
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: "SET_CURRENT_PAGE", currentPage
    } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: "SET_TOTAL_USERS_COUNT", totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: "TOGGLE_IS_FETCHING", isFetching
    } as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: "TOGGLE_FOLLOWING_IN_PROGRESS", isFetching, userId
    } as const)
}
type ActionType = typeof action;

// thunk-creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes<ActionType>>;

export const getUsers = (currentPage: number, pageSize: number): ThunkType => 
    async (dispatch) => {
        dispatch(action.toggleIsFetching(true));
        const data: ResponseDataGetUsersType = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(action.setUsers(data.items));
        dispatch(action.setTotalUsersCount(data.totalCount));
        dispatch(action.toggleIsFetching(false));        
    }

export const getUsersOnCurrentPage = (currentPage: number, pageSize: number): ThunkType =>
    async (dispatch) => {
        dispatch(action.toggleIsFetching(true));
        dispatch(action.setCurrentPage(currentPage));
        const data: ResponseDataGetUsersType = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(action.setUsers(data.items));
        dispatch(action.toggleIsFetching(false));            
    }

export const followUser = (userId: number): ThunkType => 
    async (dispatch) => {
        dispatch(action.toggleFollowingInProgress(true, userId));
        const data: ResponseDataEmptyDataType = await usersAPI.followUser(userId);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(action.follow(userId));
        }
        dispatch(action.toggleFollowingInProgress(false, userId));                            
    }

export const unfollowUser = (userId: number): ThunkType => 
    async (dispatch) => {
        dispatch(action.toggleFollowingInProgress(true, userId));
        const data: ResponseDataEmptyDataType = await usersAPI.unfollowUser(userId);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(action.unfollow(userId));
        }                
        dispatch(action.toggleFollowingInProgress(false, userId));            
    }

export default usersReducer;
