import { db } from "../firebase/firebase-config"


export const getDataFromFirestore = async () => {
    try {

        const dataFire = await db.collection('cards').orderBy("date", "desc").get()
        const dataFireStore = []

        dataFire.forEach(doc => {
            dataFireStore.push({
                ...doc.data(),
                fire_id: doc.id //adding the document id
            })
        })

        return dataFireStore
        
    } catch (error) {
        console.log(error)
    }
}


export const postDataFirestore = async (newCard) => {
    try {

        const doc = await db.collection('cards').add( newCard )

        return doc

    } catch (error) {
        console.log(error)
    }
}


export const updateDataFirestore = async (updatingCard) => {
    try {
        
        await db.doc(`cards/${ updatingCard.fire_id }`).update( updatingCard )

    } catch (error) {
        console.log(error)
    }
}