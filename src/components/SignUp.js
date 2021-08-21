import React, { useState } from 'react';
import { Input } from 'reactstrap';

function SignUp(props) {
  const [userInfo, setUserInfo] = useState({});

  const userInfoForm = (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="form-group">
          <label>Nombre de usuario</label>
          <Input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingrese el nombre de la categoria"
            name="nombre"
          />
        </div>
      </form>
    </div>
  );
  const userForm = !props.loggedInStatus ? (
    <div>Hola!</div>
  ) : (
    props.history.push('/')
  );
  return <div>{userForm}</div>;
}

export default SignUp;
