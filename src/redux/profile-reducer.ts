import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { createErrorObject } from "../utils/createErrorObject/createErrorObject";
import { IPostType, UserProfileType, PhotosType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { ActionsTypes, AppStateType } from "./redux-store";
import { ResponseDataEmptyDataType, ResponseDataPutProfilePhotoType } from "../api/types";
import { ResultCodes } from "../enums/responseCodes";

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

const profileReducer = (state=initialState, action: ActionsTypes<ActionType>): InitialStateType => {
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

export const action = {
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
type ActionType = typeof action;
export type AddPostActionType = ReturnType<typeof action.addPost>;

// thunk-creators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes<ActionType>>;

export const getProfile = (userId: number): ThunkType => 
    async (dispatch) => {
        const data: UserProfileType = await profileAPI.getProfile(userId);
        dispatch(action.setUserProfile(data));        
    }

export const updateUserStatus = (status: string): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataEmptyDataType = await profileAPI.updateStatus(status);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(action.setUserStatus(status));
        }
    }

export const getUserStatus = (userId: number): ThunkType => 
    async (dispatch) => {
        const status: string = await profileAPI.getStatus(userId);
        dispatch(action.setUserStatus(status));
    }

export const updatePhoto = (profilePhoto: any): ThunkType => 
    async (dispatch) => {
        const data: ResponseDataPutProfilePhotoType = await profileAPI.updatePhoto(profilePhoto);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(action.savePhoto(data.data.photos));
        }
    }

type SaveProfileDataThunkType = ThunkAction<Promise<boolean>, AppStateType, unknown, ActionsTypes<ActionType> | FormAction>;    

export const saveProfileData = (profileData: UserProfileType): SaveProfileDataThunkType => 
    async (dispatch: any) => {
        const data: ResponseDataEmptyDataType = await profileAPI.saveProfile(profileData);
        if (data.resultCode === ResultCodes.Success) {
            dispatch(getProfile(profileData.userId));
            return false;
        } else {
            dispatch(stopSubmit('profileForm', createErrorObject(data)));
            return true;
        }
    }

export default profileReducer;
            