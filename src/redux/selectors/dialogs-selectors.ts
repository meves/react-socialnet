import { AppStateType } from "redux/store";
import { IMessageType, PersonType } from "types/types";

export const recieveDialogs = (state: AppStateType): Array<PersonType> => state.dialogsPage.dialogs;
export const receiveMessages = (state: AppStateType): Array<IMessageType> => state.dialogsPage.messages;
