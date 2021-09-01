import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../Google-login-button.css';
import axios from 'axios';
import { addUser, checkLogin, getUsuarios } from '../../ApiCore';
import { GoogleLogout, GoogleLogin } from 'react-google-login';
import { withRouter } from 'react-router-dom';

function Login(props) {
  const respuestaGoogle = async (respuesta) => {
    props.setToken(respuesta.tokenId);
    console.log(respuesta);

    const data = {
      tokenId: respuesta.tokenId,
    };
    //addUser(data);
    if (!props.signUp) {
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
    } else {
      console.log('SIUUUUUUUUUUUUUUUU SignUP');
      await props.setUserData({
        email: respuesta.profileObj.email,
        nombres: respuesta.profileObj.givenName,
        apellidos: respuesta.profileObj.familyName,
        token: respuesta.tokenId,
      });
      props.history.push('/signUp');
    }
  };

  const respuestaErrorGoogle = (respuesta) => {
    console.log(respuesta);
  };

  const logout = () => {
    props.setUserData({ email: '', nombres: '', apellidos: '' });
    props.setToken('');
    props.handleLogOut();
    console.log('Sesión cerrada');
  };

  async function getUsers() {
    let response = await getUsuarios();
    //console.log(response.data);
    return response;
  }

  const LoginLogoutButton =
    props.loggedInStatus === true ? (
      !props.signUp ? (
        <GoogleLogout
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID_LOGOUT}`}
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
        <></>
      )
    ) : props.signUp ? (
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID_LOGIN}`}
        buttonText="SignUp"
        onSuccess={respuestaGoogle}
        onFailure={respuestaErrorGoogle}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <button
            className="Google-login-button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            SignUp
          </button>
        )}
      />
    ) : (
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID_LOGIN}`}
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

export default withRouter(Login);
