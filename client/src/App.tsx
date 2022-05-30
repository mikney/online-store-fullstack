import React, {useContext, useEffect} from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {Context} from "./index";


function App() {
  const {user} = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      user.setIsAuth(true)
    }
  }, [])
  return (
    <Router>
      <NavBar />
      <AppRouter />
    </Router>
  );
}

export default App;
