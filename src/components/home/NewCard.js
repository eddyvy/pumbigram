import React from 'react'
import { useDispatch } from 'react-redux'
import { addCard } from '../../actions/card'
import { deselectNew } from '../../actions/ui'

export const NewCard = () => {

    const dispatch = useDispatch()

    const handleDeselect = () => {
        dispatch( deselectNew() )
    }

    const handleFileClick = () => {
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        if ( files ) {
            dispatch( addCard(files) )
        }
    }

    return (
        <div
            className="position-fixed top-0 animate__animated animate__fadeIn animate__faster"
            style={{
                backgroundColor: "rgb(255, 255, 255, 0.8)",
                width: "100vw",
                height: "100vh"
            }}
        >
            <div 
                className="container position-absolute top-50 start-50 translate-middle d-flex justify-content-between flex-column align-items-center"
                style={{
                    height: '80vh',
                    width: '70vw'
                }}
            >
                <div className="text-center mt-4">
                    <h3>Upload a new image or video !</h3>
                </div>
                <input
                    id="fileSelector"
                    type="file"
                    multiple
                    name="file"
                    style={{ display: 'none' }}
                    onChange={ handleFileChange }
                />
                <button
                    className="btn btn-light me-4"
                    onClick={ handleFileClick }
                    style={{ backgroundColor: '#6610f2', color: 'white' }}
                >
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span> Upload File</span>
                </button>
                <div className="me-4 align-self-end">
                    <button
                        className="btn btn-lg me-4"
                        onClick={ handleDeselect }
                        style={{ backgroundColor: '#6610f2', color: 'white' }}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}
