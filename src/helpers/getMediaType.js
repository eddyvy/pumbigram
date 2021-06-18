

export const getMediaType = ( url ) => {

    const urlSplit = url.split('.')

    const format = urlSplit[ urlSplit.length - 1 ]

    console.log( format )

    if ( format === ('jpg' || 'jpeg' || 'png' || 'gif' || 'tiff' || 'psd' || 'bmp' || 'svg')) {
        return 'image'
    } else if ( format === ('mp4' || 'avi' || 'mkv' || 'flv' || 'mov' || 'wmv' || 'divx' || 'h264' || 'rm')) {
        return 'video'
    } else {
        return ''
    }


}