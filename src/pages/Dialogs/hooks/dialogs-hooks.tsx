import React from "react";
import { useSelector } from "react-redux";
import { DialogItem } from "../Dialog/Dialog";
import { Message } from "../Message/Message";
import { receiveMessages, recieveDialogs } from "../../../redux/selectors/dialogs-selectors";

export const useGenerateDialogsElements = () => {
    const dialogs = useSelector(recieveDialogs);
    const dialogsItems = dialogs.map(dialog => (
        <DialogItem key={dialog.id} id={dialog.id} name={dialog.name} />
    ))
    return dialogsItems;
}

export const useGenerateMessagesElements = () => {
    const messages = useSelector(receiveMessages);
    const messagesItems = messages.map(message => (
        <Message key={message.id} message={message.message} />
    ))  
    return messagesItems;    
}
