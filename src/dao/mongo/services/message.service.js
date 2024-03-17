import { createMessage, findMessages } from "../persistence/message.mongo.js"

export const findMessagesService = () => {
    return findMessages();
}

export const createMessageService = (message) => {
    return createMessage(message);
}