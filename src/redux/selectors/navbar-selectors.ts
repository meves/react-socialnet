import { AppStateType } from "redux/store";
import { PersonType } from "types/types";

export const receiveFriendsNames = (state: AppStateType): Array<PersonType> => state.navbar.friendsNames;
