import { getMediaType } from "./getMediaType"


const getImagesFromCloudinary = async() => {

    try {
        const imgResp = await fetch('https://res.cloudinary.com/dm3xhgvmt/image/list/pumbi.json')
        const imgData = await imgResp.json()

        const imgMapped = imgData.resources.map( obj => {
            return ({
                ...obj,
                typeMedia: 'image',
                url: `https://res.cloudinary.com/dm3xhgvmt/image/upload/v${obj.version}/${obj.public_id}.${obj.format}`
            })
        })

        return imgMapped
        
    } catch (error) {
        console.log('Error getting cloudinary images\n', error)

        return []
    }

}

const getVideosFromCloudinary = async() => {
    
    try {
        
        const vidResp = await fetch('https://res.cloudinary.com/dm3xhgvmt/video/list/pumbi.json')
        const vidData = await vidResp.json()
        
        const vidMapped = vidData.resources.map( obj => {
            return ({
                ...obj,
                typeMedia: 'video',
                url: `https://res.cloudinary.com/dm3xhgvmt/video/upload/v${obj.version}/${obj.public_id}.${obj.format}`
            })
        })

        return vidMapped

    } catch (error) {
        console.log('Error getting cloudinary videos\n', error)

        return []
    }

}

export const getDataFromCloudinary = async() => {

    try {
        
        const imgMapped = await getImagesFromCloudinary()

        const vidMapped = await getVideosFromCloudinary()

        
        // concat and map the data
        const data = imgMapped.concat(vidMapped)

        const dataMapped = data.map( ({ public_id, url, typeMedia, created_at }) => {
            return ({
                id: public_id,
                url,
                typeMedia,
                date: created_at,
                title: '',
                body: '',
                wantDelete: false
            })
        })
        
        return dataMapped
        
        
    } catch (error) {
        console.log(error)
    }
 
}


export const uploadCloudinary = async ( file ) => {

    try {
        const cloudUrl = 'https://api.cloudinary.com/v1_1/dm3xhgvmt/upload'
    
        const formData = new FormData()
        formData.append('upload_preset', 'eddy-valls')
        formData.append('file', file)
        formData.append('tags', 'pumbi')

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        })

        if ( resp.ok ) {
            const cloudResp = await resp.json()

            return ({
                id: cloudResp.public_id,
                url: cloudResp.secure_url,
                typeMedia: getMediaType( cloudResp.secure_url ),
                date: cloudResp.created_at,
                title: '',
                body: '',
                wantDelete: false
            })

        } else {
            return null
        }
        
    } catch (error) {
        console.log(error)
    }

}