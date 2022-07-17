import { AppStateType } from "redux/store";
import { FriendType } from "shared/types";

export const receiveFriends = (state: AppStateType): Array<FriendType> => state.navbar.friends;
