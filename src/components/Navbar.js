import React, { useState, useEffect } from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Login from './pages/Login';
import { Navbar, NavbarBrand } from 'reactstrap';

function Nav_bar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const reportes =
    props.loggedInStatus && props.isAdmin ? (
      <li className="nav-item">
        <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
          Reportes
        </Link>
      </li>
    ) : (
      <></>
    );

  const gestionUsuarios =
    props.loggedInStatus && props.isAdmin ? (
      <li className="nav-item">
        <Link
          to="/gestionUsuarios"
          className="nav-links"
          onClick={closeMobileMenu}
        >
          Usuarios
        </Link>
      </li>
    ) : (
      <></>
    );

  const loginButton = !props.loggedInStatus ? (
    <button className="Google-login-button">Login</button>
  ) : (
    <></>
  );

  const signUpButton = !props.loggedInStatus ? (
    <button
      className="Google-login-button"
      onClick={() => {
        if (
          window.confirm(
            'Para registrarse debe acceder con una cuenta de google'
          )
        ) {
        }
        console.log('HOla');
      }}
    >
      Sign Up
    </button>
  ) : (
    <></>
  );

  return (
    <>
      <Navbar className="navbar" sticky="top">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            ElonMokos
          </Link>
          {/* <NavbarBrand href="/">ElonMokos</NavbarBrand> */}
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {gestionUsuarios}
            {reportes}
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/Login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          </ul>
          {loginButton && (
            <Login
              handleLogin={props.handleLogin}
              handleLogOut={props.handleLogOut}
              loggedInStatus={props.loggedInStatus}
              setLoggedInStatus={props.setLoggedInStatus}
              isAdmin={props.isAdmin}
              setIsAdmin={props.setIsAdmin}
              token={props.token}
              setToken={props.setToken}
              signUp={false}
              userData={props.userData}
              setUserData={props.setUserData}
              login01={props.login01}
              setLogin01={props.setLogin01}
            ></Login>
          )}
          {signUpButton && (
            <Login
              handleLogin={props.handleLogin}
              handleLogOut={props.handleLogOut}
              loggedInStatus={props.loggedInStatus}
              setLoggedInStatus={props.setLoggedInStatus}
              isAdmin={props.isAdmin}
              setIsAdmin={props.setIsAdmin}
              token={props.token}
              setToken={props.setToken}
              signUp={true}
              userData={props.userData}
              setUserData={props.setUserData}
            ></Login>
          )}
          {/* <Link to="/signUp">{signUpButton}</Link> */}
        </div>
      </Navbar>
    </>
  );
}

export default Nav_bar;
