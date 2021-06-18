import Swal from "sweetalert2"

import { types } from "../types/types"
import { getDataFromFirestore, postDataFirestore, updateDataFirestore } from "../helpers/manageDataFromFirestore"
import { updateCloudFire } from "../helpers/updateCloudFire"
import { deselectNew, uiFinishLoading } from "./ui"
import { uploadCloudinary } from "../helpers/manageDataFromCloudinary"


export const loadAllCards = () => {
    return async ( dispatch ) => {
        await updateCloudFire()

        const data = await getDataFromFirestore()        
    
        dispatch( loadedCards(data) )
        dispatch( uiFinishLoading() )
    }
}

const loadedCards = (data) => ({
    type: types.loadAllCards,
    payload: data
})


export const updateCard = ( updatingCard ) => {
    return async(dispatch) => {

        await updateDataFirestore(updatingCard)

        dispatch( finishUpdatingCard(updatingCard) )

    }
}

const finishUpdatingCard = (updatingCard) => ({
    type: types.updateCard,
    payload: updatingCard
})


export const addCard = ( files ) => {
    return async (dispatch) => {

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        for (let i = 0; i < Object.keys(files).length; i++) {

            const newCard = await uploadCloudinary(files[i])
    
            await postDataFirestore( newCard )
    
            dispatch( addNewCard( newCard ) )

        }


        dispatch( deselectNew() )
        
        Swal.close()

    }
}


const addNewCard = (newCard) => ({
    type: types.addCard,
    payload: newCard
})