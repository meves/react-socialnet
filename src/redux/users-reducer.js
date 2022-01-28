import { usersAPI } from "../api/api";

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
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}
// reducer
const usersReducer = (state = initialState, action) => {
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
const follow = (userId) => ({
    type: FOLLOW,
    userId
})

const unfollow = (userId) => ({
    type: UNFOLLOW,
    userId
})

const setUsers = users => ({
    type: SET_USERS,
    users
})

const setCurrentPage = currentPage => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

const setTotalUsersCount = totalUsersCount => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})

const toggleIsFetching = isFetching => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

const toggleFollowingInProgress = (isFetching, userId) => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching,
    userId
})

// thunk-creators
export const getUsers = (currentPage, pageSize) => async dispatch => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));        
}

export const getUsersOnCurrentPage = (currentPage, pageSize) => async dispatch => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(toggleIsFetching(false));            
}

export const followUser = userId => async dispatch => {
    dispatch(toggleFollowingInProgress(true, userId));
    const data = await usersAPI.followUser(userId);
    if (data.resultCode === 0) {
        dispatch(follow(userId));
    }
    dispatch(toggleFollowingInProgress(false, userId));                            
}

export const unfollowUser = userId => async dispatch => {
    dispatch(toggleFollowingInProgress(true, userId));
    const data = await usersAPI.unfollowUser(userId);
    if (data.resultCode === 0) {
        dispatch(unfollow(userId));
    }                
    dispatch(toggleFollowingInProgress(false, userId));            
}

export default usersReducer;
