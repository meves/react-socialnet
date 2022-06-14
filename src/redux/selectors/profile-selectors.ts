import { IPostType, UserProfileType } from "../../types/types";
import { AppStateType } from "../redux-store";

export const recievePosts = (state: AppStateType): Array<IPostType> => state.profilePage.posts;
export const recieveUserProfile = (state: AppStateType): UserProfileType | null => state.profilePage.userProfile;
export const recieveStatus = (state: AppStateType): string => state.profilePage.status;
export const recieveUserProfilePhoto = (state: AppStateType) => state.profilePage.userProfile?.photos;
