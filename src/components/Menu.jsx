import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBIcon,
  MDBCollapse,
  MDBNavbarItem
} from 'mdb-react-ui-kit';
import { UserContext } from '../context/UserContext';

export const Menu = () => {
  const { user } = useContext(UserContext)
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
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <Link className='menu__link' to='/'>Gallery </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link className='menu__link' to='/image'>Ver Imagen</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link className='menu__link' to='/auth/register'>Registrarse</Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link className='menu__link' to='/auth/login'>Iniciar Sesión</Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}