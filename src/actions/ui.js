import { types } from "../types/types";


export const selectNew = () => ({
    type: types.selectNew
})


export const deselectNew = () => ({
    type: types.deselectNew
})


export const selectGridView = () => ({
    type: types.selectGridView
})


export const deselectGridView = () => ({
    type: types.deselectGridView
})


export const uiStartLoading = () => ({
    type: types.uiStartLoading
})


export const uiFinishLoading = () => ({
    type: types.uiFinishLoading
})