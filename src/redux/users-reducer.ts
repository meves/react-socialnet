import { usersAPI } from "../api/api";
import { UserType } from "../types/types";

// constants
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

// inintialState
const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}
type InitialStateType = typeof initialState
// reducer
const usersReducer = (state=initialState, action: any): InitialStateType => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
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
// actionCreators
type FollowActionType = {
    type: typeof FOLLOW
    userId: number
}
const follow = (userId: number): FollowActionType => ({
    type: FOLLOW,
    userId
})

type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
const unfollow = (userId: number): UnfollowActionType => ({
    type: UNFOLLOW,
    userId
})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS,
    users
})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressActionType => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching,
    userId
})

// thunk-creators
export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));        
}

export const getUsersOnCurrentPage = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(toggleIsFetching(false));            
}

export const followUser = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowingInProgress(true, userId));
    const data = await usersAPI.followUser(userId);
    if (data.resultCode === 0) {
        dispatch(follow(userId));
    }
    dispatch(toggleFollowingInProgress(false, userId));                            
}

export const unfollowUser = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowingInProgress(true, userId));
    const data = await usersAPI.unfollowUser(userId);
    if (data.resultCode === 0) {
        dispatch(unfollow(userId));
    }                
    dispatch(toggleFollowingInProgress(false, userId));            
}

export default usersReducer;
