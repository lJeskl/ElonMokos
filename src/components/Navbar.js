import React, { useState, useEffect } from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Login from './pages/Login';
import { Navbar } from 'reactstrap';

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
  console.log(props.isAdmin);

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

  return (
    <>
      <Navbar className="navbar" sticky="top">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            ElonMokos
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
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
          {button && (
            <Login
              handleLogin={props.handleLogin}
              handleLogOut={props.handleLogOut}
              loggedInStatus={props.loggedInStatus}
              setLoggedInStatus={props.setLoggedInStatus}
              isAdmin={props.isAdmin}
              setIsAdmin={props.setIsAdmin}
            ></Login>
          )}
        </div>
      </Navbar>
    </>
  );
}

export default Nav_bar;
