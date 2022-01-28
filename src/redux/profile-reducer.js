import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { createErrorObject } from "../utils/createErrorObject/createErrorObject";

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SAVE_PHOTO = 'SAVE_PHOTO';

const initialState = {    
        posts: [
            {id: 1, message: '"Hi, how are you?', likesCount: 15},
            {id: 2, message: 'It\'s my first post', likesCount: 5},
            {id: 3, message: 'Send me your messages', likesCount: 0},
            {id: 4, message: 'Nice to meet you, friends', likesCount: 20}
        ],
        userProfile: null,
        status: ''   
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts, 
                    {
                      id: state.posts.length + 1,
                      message: action.newPost,
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
        case SAVE_PHOTO:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    photos: action.photos
                }
            }
        default:
            return state;
    }
}

// action-creators
export const addPost = (newPost) => ({
    type: ADD_POST,
    newPost
})

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})

const setUserProfile = userProfile => ({
    type: SET_USER_PROFILE,
    userProfile
})

const setUserStatus = status => ({
    type: SET_USER_STATUS,
    status
})

const savePhoto = photos => ({
    type: SAVE_PHOTO,
    photos
})

// thunk-creators
export const getProfile = userId => async dispatch => {
    const data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));        
}

export const updateUserStatus = status => async dispatch => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}

export const getUserStatus = userId => async dispatch => {
    const status = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(status));
}

export const updatePhoto = profilePhoto => async dispatch => {
    const data = await profileAPI.updatePhoto(profilePhoto);
    if (data.resultCode === 0) {
        dispatch(savePhoto(data.data.photos));
    }
}

export const saveProfileData = profileData => async dispatch => {
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
            