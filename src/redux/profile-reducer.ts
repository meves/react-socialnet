import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { createErrorObject } from "../utils/createErrorObject/createErrorObject";
import { IPostType, UserProfileType, PhotosType } from "../types/types";

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SAVE_PHOTOS = 'SAVE_PHOTOS';

const initialState = {    
        posts: [
            {id: 1, message: '"Hi, how are you?', likesCount: 15},
            {id: 2, message: 'It\'s my first post', likesCount: 5},
            {id: 3, message: 'Send me your messages', likesCount: 0},
            {id: 4, message: 'Nice to meet you, friends', likesCount: 20}
        ] as Array<IPostType>,
        userProfile: null as UserProfileType | null,
        status: ''   
}
type InitialStateType = typeof initialState

const profileReducer = (state=initialState, action: any): InitialStateType => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts, 
                    {
                      id: state.posts.length + 1,
                      message: action.newPostText,
                      likesCount: 7 
                    }
                ]
            }  
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }          
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTOS:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    photos: action.photos
                } as UserProfileType
            }
        default:
            return state;
    }
}

// action-creators
export type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ({
    type: ADD_POST,
    newPostText
})

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({
    type: DELETE_POST,
    postId
})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    userProfile: UserProfileType
}
const setUserProfile = (userProfile: UserProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    userProfile
})

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string
}
const setUserStatus = (status: string): SetUserStatusActionType => ({
    type: SET_USER_STATUS,
    status
})

type SavePhotosActionType = {
    type: typeof SAVE_PHOTOS
    photos: PhotosType
}
const savePhoto = (photos: PhotosType): SavePhotosActionType => ({
    type: SAVE_PHOTOS,
    photos
})

// thunk-creators
export const getProfile = (userId: number) => async (dispatch: any) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));        
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    const status = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(status));
}

export const updatePhoto = (profilePhoto: any) => async (dispatch: any) => {
    const data = await profileAPI.updatePhoto(profilePhoto);
    if (data.resultCode === 0) {
        dispatch(savePhoto(data.data.photos));
    }
}

export const saveProfileData = (profileData: UserProfileType) => async (dispatch: any) => {
    const data = await profileAPI.saveProfile(profileData);
    if (data.resultCode === 0) {
        dispatch(getProfile(profileData.userId));
        return false;
    } else {
        dispatch(stopSubmit('profileForm', createErrorObject(data)));
        return true;
    }
}

export default profileReducer;
            