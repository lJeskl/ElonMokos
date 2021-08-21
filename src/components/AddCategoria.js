import React, { useEffect, useState } from 'react';

import { Button, Input } from 'reactstrap';
import { addCategoria } from '../ApiCore';

function AddCategoria(props) {
  const [categoria, setCategoria] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
  });
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmitOnChange = (event) => {
    console.log(event.target.value);

    setCategoria({
      ...categoria,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async () => {
    console.log(await addCategoria(categoria));
    setDisableButton(false);
  };

  useEffect(() => {}, []);

  const addCategoriaForm =
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
  return <div>{addCategoriaForm}</div>;
}

export default AddCategoria;
