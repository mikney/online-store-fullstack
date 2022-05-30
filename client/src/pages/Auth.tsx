import React, {FC, useContext, useState} from 'react';
import {Button, Container, Form, NavLink} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {Context} from "../index";
import axios, {AxiosError} from "axios";


const Auth: FC = () => {
  const {user} = useContext(Context)
  const navigate = useNavigate();
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [registrationError, setRegistrationError] = useState<string>('')

  async function btnHandler() {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        setRegistrationError('')
        if (!email.match('[a-zA-Z0-9.! #$%&\'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\. [a-zA-Z0-9-]+)*')) {
          return setEmailError(true)
        }
        setEmailError(false)
        if (!password.match("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}")) {
          return setPasswordError(true)
        }
        setPasswordError(false)
        data = await registration(email, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(SHOP_ROUTE)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError<{message: string}>
        setRegistrationError(error.response?.data.message + '')
      }
    }

  }

  return (
    <Container className={'d-flex'} style={{height: '90vh', justifyContent: "center", alignItems: "center"}}>
      <Form style={{minWidth: 300}}>
        <h1>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            pattern={'^[a-zA-Z0-9.! #$%&\'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\. [a-zA-Z0-9-]+)*$'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={'email'}
            type="email"
            placeholder="Enter email" />
          {emailError && <Form.Text className="text-muted">
            Неверный формат почты
          </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Папроль" />
          {passwordError && <Form.Text className="text-muted">
            Неверный формат пароля
          </Form.Text>}
          {registrationError && <Form.Text className="text-muted">
            {registrationError}
          </Form.Text>}
        </Form.Group>
        <div style={{marginBottom: 10}}>
          {isLogin ?
            <NavLink style={{paddingLeft: 0}} onClick={() => navigate(REGISTRATION_ROUTE)}>
              Регистрация
            </NavLink>
            :
            <NavLink style={{paddingLeft: 0}} onClick={() => navigate(LOGIN_ROUTE)}>
              Есть аккаунт? Ввойти
            </NavLink>
          }
        </div>
        <Button
          style={{width: '100%', }}
          variant="outline-dark"
          onClick={btnHandler}>
          Ввойти
        </Button>
      </Form>
    </Container>
  );
};

export default Auth;