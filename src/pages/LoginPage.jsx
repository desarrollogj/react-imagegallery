import {
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm'
import { useAuthStore } from '../hooks/useAuthStore'
import { InputLabel } from '../components/InputLabel'

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

export const LoginPage = () => {
  const { startLogin } = useAuthStore()
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields)
  const [invalidForm, setInvalidForm] = useState({
    invalidEmail: false,
    invalidPassword: false
  })
  const navigate = useNavigate()

  const loginSubmit = (event) => {
    event.preventDefault()
    if (loginEmail === "") {
      setInvalidForm({
        invalidMail: true,
        invalidPassword: false
      })
      return
    }

    if (loginPassword === "") {
      setInvalidForm({
        invalidMail: false,
        invalidPassword: true
      })
      return
    } else if (loginPassword.length < 5) {
      Swal.fire({
        title: 'Error!',
        text: 'La contraseña debe tener al menos 5 caracteres',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return
    }

    startLogin({
      email: loginEmail,
      password: loginPassword
    })

    navigate('/')
  }

  return (
    <section className='pageContainer__login mainPage'>
      <form className='loginForm' onSubmit={loginSubmit}>
        <InputLabel text="Nombre de usuario" state={invalidForm.invalidEmail}></InputLabel>
        <MDBInput className='mb-4 fondoBlanco' type='email' id='loginFormEmail' label='Ingrese su mail' name='loginEmail' value={loginEmail} onChange={onLoginInputChange} />
        <InputLabel text="Contraseña" state={invalidForm.invalidPassword}></InputLabel>
        <MDBInput className='mb-4 fondoBlanco' type='password' id='loginFormPassword' label='Ingrese su contraseña' name='loginPassword' value={loginPassword} onChange={onLoginInputChange} />
        <p className='login__inputText'>(<span>*</span>) Campos obligatorios</p>
        <MDBBtn type='submit' block>
          Iniciar Sesión
        </MDBBtn>
      </form>
    </section>
  )
}