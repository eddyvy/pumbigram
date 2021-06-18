import React from 'react'

import { Navbar } from '../home/Navbar'

import icon from '../../assets/pumbi-icon.png'

export const LoadingScreen = () => {
    return (
        <>
            <Navbar />
            <div
                className="animate__animated animate__fadeIn animate__faster"
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '80vh',
                    justifyContent: 'center',
                    width: '100%'
                }}
            >
                <img
                    src={ icon }
                    alt="Loading icon"
                    className="animate__animated animate__bounce animate__infinite"
                    style={{
                        maxHeight: '150px'
                    }}
                />
                <br />
                <h1>Loading </h1>
            </div>
        </>
    )
}
