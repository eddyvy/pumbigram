import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router'

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    redirect = '/',
    ...rest
}) => {

    return (
        <Route {...rest}
            component={ (props) =>(
                ( isAuthenticated )
                    ? <Redirect to={ redirect } />
                    : <Component { ...props } />
            )}
        
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
    redirection: PropTypes.string
}
