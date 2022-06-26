import { AppStateType } from "redux/store";
import { FriendType } from "types/types";

export const receiveFriends = (state: AppStateType): Array<FriendType> => state.navbar.friends;
