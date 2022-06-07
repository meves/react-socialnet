import { AppStateType } from "../redux-store";

export const receiveChatMessages = (state: AppStateType) => state.chatPage.messages;
