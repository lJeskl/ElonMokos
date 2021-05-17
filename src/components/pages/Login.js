import React, {useState, useEffect} from 'react';
import '../../App.css';
import GoogleLogin from 'react-google-login'
import '../Google-login-button.css'
import axios from 'axios';
import {getUsuarios} from '../../ApiCore'
import { Usb } from '@material-ui/icons';

export default function Login() {

    const [token, setToken] = useState("");
    const [users, setUsers] = useState([]);

    const respuestaGoogle= (respuesta) => {
        setToken(respuesta.tokenId);     
        const data={
            tokenId:respuesta.tokenId
        }
        axios.post(`https://ds2project.herokuapp.com/login`,  data )
        .then(res => {
        console.log(data.tokenId);
        console.log(res.data);
      })   
    };

    const respuestaErrorGoogle= (respuesta) => {
        console.log(respuesta);        
    };

    async function getUsers() {
        let response = await getUsuarios();
        setUsers(response.data);
        return response;
      }

    useEffect(()=>{
        getUsers();
    },[])

    console.log(users);

  return (
  <>
  
    <GoogleLogin
    clientId="440158364737-j5qip3if0rofol8hjhdickps76mg9j4b.apps.googleusercontent.com"
    render={renderProps => (
        <button className= 'Google-login-button' onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
    )}
    buttonText="Loginnn"
    onSuccess={respuestaGoogle} 
    onFailure={respuestaErrorGoogle}
    isSignedIn={true}
    cookiePolicy={'single_host_origin'}/>
  </>
  

  
  );
}
