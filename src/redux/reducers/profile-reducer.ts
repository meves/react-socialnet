import { FormAction, stopSubmit } from "redux-form";

import { InferActionsTypes, ThunkActionType } from "redux/store";
import { createErrorObject } from "utils/createErrorObject/createErrorObject";
import { IPostType, UserProfileType, PhotosType } from "types/types";
import { ResultCodes } from "enums/responseCodes";

import { profileAPI } from "shared/api/profile-api";


export const initialState = {    
        posts: [
            {id: 1, message: '"Hi, how are you?', likesCount: 15},
            {id: 2, message: 'It\'s my first post', likesCount: 5},
            {id: 3, message: 'Send me your messages', likesCount: 0},
            {id: 4, message: 'Nice to meet you, friends', likesCount: 20}
        ] as Array<IPostType>,
        userProfile: null as UserProfileType | null,
        status: ''   
}
type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>;

const profileReducer = (state=initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case "ADD_POST":
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
        case "DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }          
        case "SET_USER_PROFILE":
            return {
                ...state,
                userProfile: action.userProfile
            }
        case "SET_USER_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SAVE_PHOTOS":
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

export const actions = {
    addPost: (newPostText: string) => ({
        type: "ADD_POST", newPostText
    } as const),
    deletePost: (postId: number) => ({
        type: "DELETE_POST", postId
    } as const),
    setUserProfile: (userProfile: UserProfileType) => ({
        type: "SET_USER_PROFILE", userProfile
    } as const),
    setUserStatus: (status: string) => ({
        type: "SET_USER_STATUS", status
    } as const),
    savePhoto: (photos: PhotosType) => ({
        type: "SAVE_PHOTOS", photos
    } as const)
}

export type AddPostActionType = ReturnType<typeof actions.addPost>;

type ThunkType = ThunkActionType<ActionsTypes | FormAction, void | boolean>;

export const getProfile = (userId: number): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.getProfile(userId);
        dispatch(actions.setUserProfile(data));        
    }

export const updateUserStatus = (status: string): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.setUserStatus(status));
        }
    }

export const getUserStatus = (userId: number): ThunkType => 
    async (dispatch) => {
        const status: string = await profileAPI.getStatus(userId);
        dispatch(actions.setUserStatus(status));
    }

export const updatePhoto = (profilePhoto: File): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.updatePhoto(profilePhoto);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.savePhoto(data.data.photos));
        }
    }

export const saveProfileData = (profileData: UserProfileType): ThunkType => 
    async (dispatch) => {
        const data = await profileAPI.saveProfile(profileData);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(getProfile(profileData.userId));
            return false;
        } else {
            dispatch(stopSubmit('profileForm', createErrorObject(data)));
            return true;
        }
    }

export default profileReducer;
            