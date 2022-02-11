import { PersonType } from "../../types/types";
import { AppStateType } from "../redux-store";

export const receiveFriendsNames = (state: AppStateType): Array<PersonType> => state.navbar.friendsNames;
