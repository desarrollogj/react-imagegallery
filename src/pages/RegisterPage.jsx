import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm'
import { useAuthStore } from '../hooks/useAuthStore';
import { ErrorLabel } from '../components/ErrorLabel'

const registerFormFields = {
  registerName: '',
  registerSurname: '',
  registerEmail: '',
  registerPassword: '',
  confirmPassword: '',
}

const formValidations = {
  registerName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
  registerSurname: [(value) => value.length >= 1, 'El apellido es obligatorio'],
  registerEmail: [(value) => value.includes('@'), 'El correo debe de tener un @'],
  registerPassword: [(value) => value.length >= 6, 'La contraseña debe de tener más de 6 letras'],
  confirmPassword: [(value) => value.length >= 6, 'La confirmación de la contraseña debe de tener más de 6 letras'],
}

export const RegisterPage = () => {
  const { startRegister } = useAuthStore()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { registerName, registerSurname, registerEmail, registerPassword, confirmPassword, onInputChange: onRegisterInputChange, isFormValid, registerNameValid, registerSurnameValid, registerEmailValid, registerPasswordValid, confirmPasswordValid } = useForm(registerFormFields, formValidations)

  const navigate = useNavigate()

  const onSubmitRegister = (event) => {
    event.preventDefault()
    setFormSubmitted(true)

    if (!isFormValid) return

    // Validations
    if (confirmPassword != registerPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return
    }

    startRegister({
      name: registerName,
      surname: registerSurname,
      email: registerEmail,
      password: registerPassword,
      confirmPassword: confirmPassword
    })
    navigate('/')
  }

  useEffect(() => {
    document.title = "Registro de usuario"
  }, [])

  return (
    <section className='pageContainer__register mainPage'>
      <form className='registerForm' onSubmit={onSubmitRegister}>
        <MDBRow className='mb-4'>
          <MDBCol>
            <ErrorLabel text={registerNameValid} state={!!registerNameValid && formSubmitted} />
            <MDBInput id='registerFormName' label='Nombre' name='registerName' value={registerName} onChange={onRegisterInputChange} />
          </MDBCol>
          <MDBCol>
            <ErrorLabel text={registerSurnameValid} state={!!registerSurnameValid && formSubmitted} />
            <MDBInput id='registerFormSurname' label='Apellido' name='registerSurname' value={registerSurname} onChange={onRegisterInputChange} />
          </MDBCol>
        </MDBRow>
        <ErrorLabel text={registerEmailValid} state={!!registerEmailValid && formSubmitted} />
        <MDBInput className='mb-4 fondoBlanco' type='email' id='registerEmail' label='Ingrese su mail' name='registerEmail' value={registerEmail} onChange={onRegisterInputChange} />
        <ErrorLabel text={registerPasswordValid} state={!!registerPasswordValid && formSubmitted} />
        <MDBInput className='mb-4 fondoBlanco' type='password' id='registerFormPassword' label='Ingrese su contraseña' name='registerPassword' value={registerPassword} onChange={onRegisterInputChange} />
        <ErrorLabel text={confirmPasswordValid} state={!!confirmPasswordValid && formSubmitted} />
        <MDBInput className='mb-4 fondoBlanco' type='password' id='registerFormConfirm' label='Confirme su contraseña' name='confirmPassword' value={confirmPassword} onChange={onRegisterInputChange}
        />
        <MDBBtn type='submit' className='mb-4' block>
          Registrarse
        </MDBBtn>
        <p className="mt-2">¿Ya te registraste? <Link to="/auth/login">Inicia sesión</Link></p>
      </form>
    </section>
  )
}