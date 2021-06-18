import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deselectGridView, selectGridView, selectNew } from '../../actions/ui'
import { Navbar } from '../home/Navbar'
import { CardsList } from '../home/CardsList'
import { NewCard } from '../home/NewCard'


export const HomeScreen = () => {
    
    const dispatch = useDispatch()
    const { selectedNew, gridView } = useSelector(state => state.ui)

    const handleView = (e) => {
        e.preventDefault()
        if ( gridView ) {
            dispatch( deselectGridView() )
        } else {
            dispatch( selectGridView() )
        }
    }

    const handleAddCard = () => {
        dispatch( selectNew() )
    }
    

    return (
        <div>
            <Navbar />
    
            {
                ( selectedNew )
                ? <NewCard />
                : ( <>
                        <CardsList />
                        <button
                            className="btn btn-primary rounded-circle position-fixed bottom-0 start-0 m-5"
                            style={{
                                height: '65px',
                                width: '65px',
                                backgroundColor: '#6610f2',
                                borderColor: '#6610f2'
                            }}
                            onClick={ handleView }
                        >
                            {
                                ( gridView )
                                ? <i className="far fa-square" style={{ fontSize: '2rem' }}></i>
                                : <i className="fas fa-th" style={{ fontSize: '2rem' }}></i>
                            }

                        </button>
                        <button
                            className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-5"
                            style={{
                                height: '65px',
                                width: '65px',
                                backgroundColor: '#6610f2',
                                borderColor: '#6610f2'
                            }}
                            onClick={ handleAddCard }
                        >
                            <i className="fas fa-plus fa-2x" ></i>
                        </button>
                        <footer className="footer p-5 m-5 d-flex justify-content-center">
                            <h3>PumbiGram <i className="far fa-heart me-2"></i></h3>
                        </footer>
                    </>
                )
            }

        </div>
    )
}
