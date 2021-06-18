import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { firebase } from '../firebase/firebase-config'
import { login } from '../actions/auth'
import { uiFinishLoading, uiStartLoading } from '../actions/ui'
import { loadAllCards } from '../actions/card'

import { LoadingScreen } from '../components/screens/LoadingScreen'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { LoginScreen } from '../components/screens/LoginScreen'
import { HomeScreen } from '../components/screens/HomeScreen'


export const AppRouter = () => {

    const dispatch = useDispatch()

    const { logged } = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.ui)

    useEffect( () => {

        dispatch( uiStartLoading() )

        firebase.auth().onAuthStateChanged( (user) => {
            if ( user?.uid ) {
                dispatch( login( user.uid, user.email ) )
                dispatch( loadAllCards() )
            } else {
                dispatch( uiFinishLoading() )
            }
        })

        

    }, [dispatch])


    return (
        ( loading )
        ? ( <LoadingScreen /> )
        : (
            <Router>
                <div>
                    <Switch>
                        <PublicRoute 
                            isAuthenticated={ logged }
                            path="/login"
                            component={ LoginScreen }
                        />
                        <PrivateRoute
                            exact
                            isAuthenticated={ logged }
                            path="/"
                            component={ HomeScreen }
                        />
                        <Redirect to='/' />
                    </Switch>
                </div>
            </Router>
        )
    )
}
