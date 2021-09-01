import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DatePicker from 'react-datepicker';
import { Button } from 'reactstrap';
import { addUser, getTipoId } from '../ApiCore';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SignUp(props) {
  const [userInfo, setUserInfo] = useState({
    id: '',
    numeroid: '',
    fechaNacimiento: '',
    direccion: '',
    telefono: '',
  });
  const classes = useStyles();
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState('');
  const [tipoID, setTipoID] = useState({ data: [] });

  useEffect(() => {
    const getTipoDocumento = async () => {
      setTipoID(await getTipoId());
    };
    getTipoDocumento();
  }, []);

  console.log(tipoID);

  const handleOnChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async () => {
    const userInfoFinal = {
      nombres: props.userData.nombres,
      apellidos: props.userData.apellidos,
      tokenId: props.userData.token,
      id: userInfo.id,
      numeroid: userInfo.numeroid,
      fechaNacimiento: userInfo.fechaNacimiento,
      direccion: userInfo.direccion,
      telefono: userInfo.telefono,
    };
    console.log(userInfoFinal);

    if (
      userInfo.id === '' ||
      userInfo.numeroid === '' ||
      userInfo.fechaNacimiento === '' ||
      userInfo.direccion === '' ||
      userInfo.telefono === ''
    ) {
      window.alert('No deben haber campos vacíos en el formulario');
    } else {
      await addUser(userInfoFinal);

      window.alert('Usuario registrado');
      window.location.href = '/';
    }
  };
  const userForm = !props.loggedInStatus ? (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="form-group">
          <label>Correo</label>
          <Input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingrese el nombre de la categoria"
            name="email"
            defaultValue={props.userData.email}
            disabled={true}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Nombres</label>
          <Input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingrese el nombre de la categoria"
            name="nombres"
            defaultValue={props.userData.nombres}
            disabled={true}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Apellidos</label>
          <Input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingrese el nombre de la categoria"
            name="apellidos"
            defaultValue={props.userData.apellidos}
            disabled={true}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Tipo de Documento</label>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userInfo.id}
              name="id"
              onChange={handleOnChange}
            >
              {tipoID.data.map((id) => {
                console.log(id);
                return <MenuItem value={id}>{id}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div className="form-group">
          <label>Numero de Documento</label>
          <Input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingrese el nombre de la categoria"
            name="numeroid"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          <br />
          <DatePicker
            selected={fechaDeNacimiento}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
              setFechaDeNacimiento(date);
              var dia = date.getDate();
              var mes = date.getMonth() + 1;
              var anio = date.getFullYear();
              if (mes < 10) {
                mes = `0${mes}`;
              }
              if (dia < 10) {
                dia = `0${dia}`;
              }

              setUserInfo({
                ...userInfo,
                fechaNacimiento: `${dia}-${mes}-${anio}`,
              });
            }}
          />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <Input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingrese el nombre de la categoria"
            name="direccion"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Telefono</label>
          <Input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Ingrese el nombre de la categoria"
            name="telefono"
            onChange={handleOnChange}
          />
        </div>
        <br />
        <br />
        <Button
          color="danger"
          type="submit"
          className="btn btn-primary"
          onClick={() => sendData()}
        >
          Submit
        </Button>
      </form>
    </div>
  ) : (
    props.history.push('/')
  );
  return <div>{userForm}</div>;
}

export default SignUp;
