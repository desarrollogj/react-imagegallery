import {
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm'
import { useAuthStore } from '../hooks/useAuthStore'
import { InputLabel } from '../components/InputLabel'
import { ErrorLabel } from '../components/ErrorLabel';

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

const formValidations = {
  loginEmail: [(value) => value.length >= 0 && value.includes('@'), 'El correo no debe estar vacío y debe de tener un @'],
  loginPassword: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 letras'],
}

export const LoginPage = () => {
  const { startLogin } = useAuthStore()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange, isFormValid, loginEmailValid, loginPasswordValid } = useForm(loginFormFields, formValidations)

  const navigate = useNavigate()

  const loginSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)

    if (!isFormValid) return

    startLogin({
      email: loginEmail,
      password: loginPassword
    })

    navigate('/')
  }

  useEffect(() => {
    document.title = "Login"
  }, [])

  return (
    <section className='pageContainer__login mainPage'>
      <form className='loginForm' onSubmit={loginSubmit}>
        <InputLabel text="Nombre de usuario"></InputLabel>
        <ErrorLabel text={loginEmailValid} state={!!loginEmailValid && formSubmitted} />
        <MDBInput className='mb-4 fondoBlanco' type='email' id='loginFormEmail' label='Ingrese su mail' name='loginEmail' value={loginEmail} onChange={onLoginInputChange} />
        <InputLabel text="Contraseña"></InputLabel>
        <ErrorLabel text={loginPasswordValid} state={!!loginPasswordValid && formSubmitted} />
        <MDBInput className='mb-4 fondoBlanco' type='password' id='loginFormPassword' label='Ingrese su contraseña' name='loginPassword' value={loginPassword} onChange={onLoginInputChange} />
        <p className='login__inputText'>(<span>*</span>) Campos obligatorios</p>
        <MDBBtn type='submit' block>
          Iniciar Sesión
        </MDBBtn>
      </form>
    </section>
  )
}