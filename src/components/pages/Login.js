import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../Google-login-button.css';
import axios from 'axios';
import { addUser, checkLogin, getUsuarios } from '../../ApiCore';
import { GoogleLogout, GoogleLogin } from 'react-google-login';

export default function Login(props) {
  const [token, setToken] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const respuestaGoogle = async (respuesta) => {
    setToken(respuesta.tokenId);
    setUser(respuesta.profileObj);

    const data = {
      tokenId: respuesta.tokenId,
    };
    let loggedin = await checkLogin(data);
    console.log(loggedin);
    if (loggedin.existe) {
      console.log('Login Existoso!');
      await props.setLoggedInStatus(true);
      if (loggedin.admin) {
        await props.setIsAdmin(true);
      }
    } else {
      console.log('El usuario no existe');
    }
  };

  const respuestaErrorGoogle = (respuesta) => {
    console.log(respuesta);
  };

  const logout = () => {
    props.handleLogOut();
    console.log('Sesión cerrada');
  };

  async function getUsers() {
    let response = await getUsuarios();
    setUsers(response.data);
    //console.log(response.data);
    return response;
  }

  const LoginLogoutButton =
    props.loggedInStatus === true ? (
      <GoogleLogout
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
        render={(renderProps) => (
          <button
            className="Google-login-button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Logout
          </button>
        )}
      ></GoogleLogout>
    ) : (
      <GoogleLogin
        clientId="440158364737-j5qip3if0rofol8hjhdickps76mg9j4b.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={respuestaGoogle}
        onFailure={respuestaErrorGoogle}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <button
            className="Google-login-button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Login
          </button>
        )}
      />
    );

  return <>{LoginLogoutButton}</>;
}
