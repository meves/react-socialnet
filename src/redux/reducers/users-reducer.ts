import { InferActionsTypes, ThunkActionType } from "redux/store";

import { UserType } from "shared/types";
import { ResultCodes } from "rest-api/enums/ResponseCodes";

import { usersAPI } from "rest-api/users-api";
import { followAPI } from "rest-api/followAPI";


const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    blockSize: 20,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: "",
        friend: null as boolean | null
    }
}
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>;

export const usersReducer = (state=initialState, action: ActionsTypes): InitialStateType => {
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
        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload.filter
            }        
        default:
            return state;
    }
}

export const actions = {
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
    } as const),
    setFilter: (filter: FilterType) => ({
        type: "SET_FILTER", payload: { filter }
    } as const)    
}

type ThunkType = ThunkActionType<ActionsTypes>;

export const getUsersChanged = (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
    async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter));
        const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));            
    }

export const followUser = (userId: number): ThunkType => 
    async (dispatch) => {
        dispatch(actions.toggleFollowingInProgress(true, userId));
        const data = await followAPI.followUser(userId);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.follow(userId));
        }
        dispatch(actions.toggleFollowingInProgress(false, userId));                            
    }

export const unfollowUser = (userId: number): ThunkType => 
    async (dispatch) => {
        dispatch(actions.toggleFollowingInProgress(true, userId));
        const data = await followAPI.unfollowUser(userId);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.unfollow(userId));
        }                
        dispatch(actions.toggleFollowingInProgress(false, userId));            
    }

    
export default usersReducer;
