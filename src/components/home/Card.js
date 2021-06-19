import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

import { deleteCard, updateCard } from '../../actions/card'
import { deselectGridView } from '../../actions/ui'


const styleMedia = {
    width: 'auto',
    height: 'auto',
    maxWidth: '90vw',
    maxHeight: '70vh',
}

export const Card = ({ id, url = '', title = '', body = '', date= '', typeMedia = 'image' }) => {

    
    const dispatch = useDispatch()
    const { cards } = useSelector(state => state.card)
    const { gridView } = useSelector(state => state.ui)
    const { user } = useSelector(state => state.auth)
    
    const isGuest = (user.email === 'guest@guest.com') ? true : false

    const messageOfDenial = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops... :(',
            text: 'Guests can not do this !'
        }) 
    }  
    
    const [styleGridView, setStyleGridView] = useState( [ {}, styleMedia ] )
    
    const cardSelected = cards.find( (card) => card.id === id )
    const cardRef = useRef(null)



    useEffect(() => {
        
        if ( gridView ) {
            setStyleGridView([{
                height: '100px',
                width: '150px'
            },{
                width: 'auto',
                height: 'auto',
                maxHeight: '100px',
                maxWidth: '150px'
            }])
        } else {
            setStyleGridView([ {}, styleMedia ])
        }


    }, [setStyleGridView, gridView ])



    const [formValues, setformValues] = useState({
        actualTitle: title,
        actualBody: body
    })

    const { actualTitle, actualBody } = formValues

    
    const handleInputChange = ({ target }) => {
        
        setformValues({
            ...formValues,
            [ target.name ]: target.value
        })
        
    }

    const handleUpdateCardInfo = (e) => {
        e.preventDefault()

        if ( isGuest ) {
            messageOfDenial()
            return
        }


        const updatingCard = {
            ...cardSelected,
            title: actualTitle,
            body: actualBody
        }

        dispatch( updateCard( updatingCard ) )

    }

    const handleCardClick = () => {
        
        const id = cardRef.current.id

        if ( gridView ) {
            dispatch( deselectGridView() )
            cardRef.current.scrollIntoView()
            setTimeout(() => {
                document.getElementById(id).scrollIntoView()
            }, 350);
        }
    }

    const handleDelete = (e) => {

        e.preventDefault()

        if ( isGuest ) {
            messageOfDenial()
            return
        }
        
        dispatch( deleteCard( cardSelected ) )
    }


    return (
        ( !cardSelected.wantDelete )
        && (
            <div 
                className="container d-flex justify-content-evenly align-center mt-5"
                style={ styleGridView[0] }
                ref={ cardRef }
                id={ id }
                onClick={ handleCardClick }
            >
                <div className="card" style={{ width: '90vw', border: 'none' }}>

                    {
                        ( typeMedia === 'image' )
                        && (
                            <picture className="d-flex justify-content-center">
                                <img 
                                    className="card-img-top"
                                    src={ url }
                                    alt="card"
                                    style={ styleGridView[1] }
                                />
                            </picture>
                        )
                    }    
                    {
                        ( typeMedia === 'video' )
                        && (
                            <div className="embed-responsive embed-responsive-16by9 d-flex justify-content-center">
                                <video
                                    className="embed-responsive-item"
                                    src={ url }
                                    sandbox=""
                                    autoPlay="allowed"
                                    muted="muted"
                                    style={ styleGridView[1] }
                                    controls
                                ></video>
                            </div>
                        )
                    }
                    {
                        ( !gridView )
                        && (
                            <form 
                                className="card-body text-center"
                                onSubmit={ handleUpdateCardInfo }
                            >
                                <small>{ date }</small>
                                <input
                                    type="text"
                                    placeholder="Write the title !"
                                    className="h3 input-group text-center border-none mb-2 mt-2 p-2"
                                    autoComplete="off"
                                    name="actualTitle"
                                    value={ actualTitle }
                                    onChange={ handleInputChange }
                                    style={{ border: 'none' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Comment here !"
                                    className="form-control text-center p-2"
                                    autoComplete="off"
                                    name="actualBody"
                                    value={ actualBody }
                                    onChange={ handleInputChange }
                                    style={{ border: 'none' }}
                                >
                                </input>
                                <button 
                                    className="btn btn-light mt-2 me-2"
                                    style={{ backgroundColor: '#6610f2', color: 'white'}}
                                    type="submit"
                                >
                                    Save
                                    <i className="fas fa-sd-card ms-2 fa-lg"></i>
                                </button>
                                <button 
                                    className="btn btn-danger mt-2 ms-2"
                                    onClick={ handleDelete }
                                >
                                    Delete
                                    <i className="fas fa-eraser ms-2 fa-lg"></i>
                                </button>
                            </form>       
                        )
                    }
                </div>
            </div>
        )
    )
}
