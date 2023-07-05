import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { UserContext } from '../context/UserContext';

export const Menu = () => {
  const {user} = useContext(UserContext)
  const [showNavSecond, setShowNavSecond] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Bienvenido, {user.email}</MDBNavbarBrand>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavSecond(!showNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavSecond}>
          <MDBNavbarNav>
            <Link className='menu__link' to='/'>
             Gallery 
            </Link>
            <Link className='menu__link' to='/image'>
              Ver Imagen
            </Link>
            <Link className='menu__link' to='/auth/register'>
             Registrarse
            </Link>
            <Link className='menu__link' to='/auth/login'>
              Iniciar Sesión
            </Link>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}