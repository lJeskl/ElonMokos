import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DatePicker from 'react-datepicker';
import { Button } from 'reactstrap';
import { getTipoId, getUsuario, getTipoUsuario, editUser } from '../ApiCore';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EditUser(props) {
  const [disableField, setDisableField] = useState(true);
  useEffect(() => {
    if (props.isAdmin) {
      setDisableField(false);
    }
    const getTipoDocumentoUserInfo = async () => {
      setTipoUsuario(await getTipoUsuario());
      setTipoID(await getTipoId());
      var info = await getUsuario(localStorage.getItem('userEmail'));
      setUserInfo(info.data);
      var birthday = new Date(info.data.nacimiento);
      setFechaDeNacimiento(
        new Date(
          birthday.getUTCFullYear(),
          birthday.getUTCMonth() + 1,
          birthday.getUTCDate()
        )
      );
    };
    getTipoDocumentoUserInfo();
  }, []);

  const [userInfo, setUserInfo] = useState({
    id: '',
    numeroid: '',
    fechaNacimiento: '',
    direccion: '',
    telefono: '',
  });
  const classes = useStyles();
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState(
    userInfo.nacimiento
  );
  const [tipoID, setTipoID] = useState({ data: [] });
  const [tipoUsuario, setTipoUsuario] = useState({ data: [] });

  console.log(userInfo);

  const handleOnChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async () => {
    const userInfoFinal = {
      nombres: userInfo.nombres,
      apellidos: userInfo.apellidos,
      direccion: userInfo.direccion,
      email: localStorage.getItem('userEmail'),
      fechaNacimiento: userInfo.nacimiento,
      telefono: userInfo.telefono,
      rol: userInfo.rol,
      id: userInfo.documento,
      numeroid: userInfo.documento_key,
    };

    console.log(userInfoFinal);

    await editUser(userInfoFinal);
    window.alert('Usuario actualizado');
    window.location.href = '/gestionUsuarios';
  };

  const editUserForm = (
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
            defaultValue={localStorage.getItem('userEmail')}
            disabled={disableField}
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
            defaultValue={userInfo.nombres}
            disabled={disableField}
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
            defaultValue={userInfo.apellidos}
            disabled={disableField}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Tipo de Usuario</label>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              {userInfo.rol}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userInfo.rol}
              displayEmpty="Hola"
              name="rol"
              disabled={disableField}
              onChange={handleOnChange}
            >
              {tipoUsuario.data.map((id) => {
                console.log(id);
                return <MenuItem value={id}>{id}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div className="form-group">
          <label>Tipo de Documento</label>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              {userInfo.documento}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userInfo.id}
              name="id"
              disabled={disableField}
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
            name="documento_key"
            defaultValue={userInfo.documento_key}
            disabled={disableField}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          <br />
          <DatePicker
            selected={fechaDeNacimiento}
            dateFormat="dd/MM/yyyy"
            disabled={disableField}
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
            defaultValue={userInfo.direccion}
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
            defaultValue={userInfo.telefono}
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
  );

  return <div>{editUserForm}</div>;
}

export default EditUser;
