import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutFirebase } from '../../actions/auth'

import icon from '../../assets/pumbi-icon.png'

export const Navbar = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch( logoutFirebase() )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#6610f2', color:'white'}}>
             <div className="container-fluid">
                <picture className="d-flex mb-1">
                    <img src={ icon } alt="logo icon" style={{maxHeight:'70px'}} />
                    <h3 className="align-self-center ms-3">
                        <i className="far fa-heart me-2"></i>
                        PumbiGram
                    </h3>
                </picture>
                <div className="ms-1 me-2 mt-1">
                    <button
                        className="btn btn-light btn-sm"
                        onClick={ handleLogout }
                    >
                        <i className="fas fa-door-open"></i>
                        <span> Logout</span>
                    </button>

                </div>
             </div>
        </nav>
    )
}
