import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {UserAttributes} from "../interfaces/User";
import {observer} from "mobx-react-lite";


const NavBar = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate();

  const logout = () => {
    user.setUser({} as UserAttributes)
    user.setIsAuth(false)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container className='flex justify-content-between'>
        <Navbar.Brand style={{cursor: 'pointer'}} onClick={() => navigate(SHOP_ROUTE)}>Online Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse className='flex-grow-0' id="basic-navbar-nav">
          {user.isAuth ?
            <Nav className="ml-auto" style={{color: 'black'}}>
              <Button
                onClick={() => navigate(ADMIN_ROUTE)}
                variant='dark'
                className='m-lg-1'>
                Админ панель
              </Button>
              <Button
                onClick={logout}
                variant='dark'
                className='m-lg-1'>
                Выйти
              </Button>
            </Nav>
            :
            <Nav className="ml-auto" style={{color: 'black'}}>
              <Button onClick={() => navigate(LOGIN_ROUTE)} variant='dark' className='m-lg-1'>
                Войти
              </Button>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;