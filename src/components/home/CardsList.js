import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Card } from './Card'


export const CardsList = () => {

    const { cards } = useSelector(state => state.card)
    const { gridView } = useSelector(state => state.ui)

    const [styleGridView, setStyleGridView] = useState('')

    useEffect(() => {
        
        if ( gridView ) {
            setStyleGridView('d-flex flex-wrap justify-content-start animate__animated animate__lightSpeedInRight')
        } else {
            setStyleGridView('')
        }


    }, [setStyleGridView, gridView])


    return (
        <div
            className={ styleGridView }
        >
            {
                cards.map( ({ id, url, date, title, body, typeMedia }) => (
                    <Card
                        key={ id }
                        id={ id }
                        url={ url }
                        date={ date }
                        title={ title }
                        body={ body }
                        typeMedia={ typeMedia }
                    ></Card>
                ))
            }

        </div>
        
    )
}
