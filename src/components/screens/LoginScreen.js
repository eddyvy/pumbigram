import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginFirebase } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'


export const LoginScreen = () => {

    const dispatch = useDispatch()
    const { loading: authLoading } = useSelector(state => state.auth)

    const [ formValues, handleInputChange ] = useForm({})

    const { email, password } = formValues

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch( loginFirebase(email, password) )
    }


    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="container login-container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-md-6 login-form-1">
                        <h1 className="display-1">Pumbigram</h1>
                        <br />
                        <form onSubmit={ handleSubmit } className="mt-2">
                            <div className="form-group mt-2">
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Correo"
                                    name="email"
                                    autoComplete="off"
                                    value={ email }
                                    onChange={ handleInputChange }
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name="password"
                                    autoComplete="off"
                                    value={ password }
                                    onChange={ handleInputChange }
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input 
                                    type="submit"
                                    className="btnSubmit btn btn-primary"
                                    value="Login"
                                    disabled={ authLoading }
                                />
                            </div>
                            <br />
                            <span>Need access? Contact me on </span>
                            <a href="mailto:edwardyue93@gmail.com">edwardyue93@gmail.com</a>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )
}
