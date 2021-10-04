import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { Button, Input, Col, Container, Row, ButtonToggle } from 'reactstrap';
import { get1Categoria, editCategoria } from '../ApiCore';

function EditCategoria(props) {
  const match = useRouteMatch();
  const [categoria, setCategoria] = useState({});
  const [disableButton, setDisableButton] = useState(false);

  const sendData = async () => {
    const categoriaFinal = {
      uuid: categoria.numero,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      imagen: categoria.imagen,
    };

    if (
      categoria.nombre === '' ||
      categoria.descripcion === '' ||
      categoria.imagen === ''
    ) {
      window.alert('No deben haber campos vacíos en el formulario');
      setDisableButton(false);
    } else {
      let response = await editCategoria(categoriaFinal);
      console.log(response);

      if (response.status === 201) {
        window.alert(response.data);
        setDisableButton(false);
        window.location.href = '/products';
      } else {
        var respuesta = '';
        if (response.data.hasOwnProperty('nombre')) {
          respuesta = respuesta + 'Nombre: ' + response.data.nombre + '\n';
        }
        if (response.data.hasOwnProperty('imagen')) {
          respuesta = respuesta + 'Imagen: ' + response.data.nombre + '\n';
        }
        if (response.data.hasOwnProperty('descripcion')) {
          respuesta = respuesta + 'Descripcion: ' + response.data.nombre + '\n';
        }
        window.alert(respuesta);
        setDisableButton(false);
      }
    }
  };

  useEffect(() => {
    const infoCategoria = async () => {
      setCategoria(await get1Categoria(match.params.cardListName));
    };
    infoCategoria();
  }, []);

  console.log(categoria);
  const handleSubmitOnChange = (event) => {
    console.log(event.target.value);

    setCategoria({
      ...categoria,
      [event.target.name]: event.target.value,
    });
  };
  const editCategoriaForm =
    props.loggedInStatus && props.isAdmin ? (
      <div>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="form-group">
            <label>Categoria Name</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese el nombre de la categoria"
              name="nombre"
              defaultValue={categoria.nombre}
              onChange={handleSubmitOnChange}
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <Input
              type="textarea"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese Una descripción"
              name="descripcion"
              defaultValue={categoria.descripcion}
              onChange={handleSubmitOnChange}
            />
          </div>
          <div className="form-group">
            <label>URL imagen</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese url de la imagen"
              name="imagen"
              defaultValue={categoria.imagen}
              onChange={handleSubmitOnChange}
            />
          </div>
          <Button
            color="danger"
            type="submit"
            disabled={disableButton}
            className="btn btn-primary"
            onClick={() => {
              setDisableButton(true);
              sendData();
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    ) : (
      <>Adios</>
    );
  return <div>{editCategoriaForm}</div>;
}

export default EditCategoria;
