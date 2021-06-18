import { getDataFromCloudinary } from "./manageDataFromCloudinary"
import { getDataFromFirestore, postDataFirestore } from "./manageDataFromFirestore"


export const updateCloudFire = async() => {

    try {
        // get cloudinary and firestore data
        const dataCloud = await getDataFromCloudinary()
        const dataFirestore = await getDataFromFirestore() 
    
        // get ids of firestore and cloudinary to compare
        const idsCloud = dataCloud.map( card => card.id )
        const idsFire = dataFirestore.map( card => card.id )
        
        // compare
        if ( JSON.stringify(idsFire.sort()) !== JSON.stringify(idsCloud.sort()) ) {
    
            // get ids of cloud and include in firestore
            const idsToAdd = idsCloud.filter( id => !idsFire.includes(id) )
    
            dataCloud.map( async(card) => {
                if ( idsToAdd.includes(card.id) ) {
    
                    await postDataFirestore( card )
    
                }
            } )
        }
        
    } catch (error) {
        console.log(error)
    }
}