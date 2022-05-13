import { IMessageType, PersonType } from "../../types/types";
import { AppStateType } from "../redux-store";

export const recieveDialogs = (state: AppStateType): Array<PersonType> => state.dialogsPage.dialogs;
export const receiveMessages = (state: AppStateType): Array<IMessageType> => state.dialogsPage.messages;
