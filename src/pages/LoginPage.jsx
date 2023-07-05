import {
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm'
import { UserContext } from '../context/UserContext'
import { InputLabel } from '../components/InputLabel'

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

export const LoginPage = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [invalidForm, setInvalidForm] = useState({
    invalidEmail: false,
    invalidPassword: false
  })
  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields)

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
        text: 'La contraseña tiene que tener como minimo 5 caracteres',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return
    }

    const data = {
      email: loginEmail,
      password: loginPassword
    }

    setUser(data)
    navigate('/')
  }

  return (
    <section className='pageContainer__login mainPage'>
      <form className='loginForm' onSubmit={loginSubmit}>
        <InputLabel text="Usuario" state={invalidForm.invalidEmail}></InputLabel>
        <MDBInput className='mb-4 fondoBlanco' type='email' id='form1Example1' label='Ingrese su mail' name='loginEmail' value={loginEmail} onChange={onLoginInputChange} />
        <InputLabel text="Contraseña" state={invalidForm.invalidPassword}></InputLabel>
        <MDBInput className='mb-4 fondoBlanco' type='password' id='form1Example2' label='Ingrese su contraseña' name='loginPassword' value={loginPassword} onChange={onLoginInputChange} />
        <p className='login__inputText'>(<span>*</span>) Los puntos son obligatorios</p>
        <MDBBtn type='submit' block>
          Iniciar Sesión
        </MDBBtn>
      </form>
    </section>
  )
}