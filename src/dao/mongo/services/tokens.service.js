import { createOneToken, findOneToken, findOneTokenAndUpdate } from "../persistence/tokens.mongo.js"


export const findOneTokenService = (option) => {
    return findOneToken(option);
}

export const createOneTokenService = (newToken) => {
    return createOneToken(newToken);
}

export const findOneTokenAndUpdateService = (objectId, updates) => {
    return findOneTokenAndUpdate(objectId, updates);
}