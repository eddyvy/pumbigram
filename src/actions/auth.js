import Swal from 'sweetalert2'

import { types } from "../types/types";
import { firebase } from '../firebase/firebase-config'


export const loginFirebase = ( email, password ) => {
    return (dispatch) => {
        
        dispatch( authStartLoading() )

        return firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {

                dispatch( login( user.uid, user.email ) )
                dispatch( authFinishLoading() )

            })
            .catch( e => {

                dispatch( authFinishLoading() )
                Swal.fire('Error', e.message, 'error')

            })

        
    }
}


export const login = (uid, email) => ({
    type: types.login,
    payload: {
        uid,
        email
    }
})


export const logoutFirebase = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut()

        dispatch( logout() )
    }
}


export const logout = () => ({
    type: types.logout
})


const authStartLoading = () => ({
    type: types.authStartLoading
})


const authFinishLoading = () => ({
    type: types.authFinishLoading
})