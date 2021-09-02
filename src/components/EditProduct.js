import React, { useEffect, useState } from 'react';
import { getInfoProduct, editProduct, getDetalles } from '../ApiCore';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, Input, Col, Container, Row, ButtonToggle } from 'reactstrap';
import { MDBCloseIcon } from 'mdbreact';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './EditProduct.css';

function EditProduct(props) {
  const match = useRouteMatch();

  const [producto, setProducto] = useState({});
  const [descuentosProducto, setDescuentosProducto] = useState();
  const [fechaInicial, setFechaInicial] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(new Date());
  const [porcentajeProducto, setPorcentajeProducto] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const [renderDescuento, setRenderDescuento] = useState(false);
  const [ingrediente, setIngrediente] = useState([]);
  const [ingredientesList, setIngredientesList] = useState([]);
  const [acompanamientosList, setacompanamientosList] = useState([]);
  const [característicasImportantesList, setCaracterísticasImportantesList] =
    useState([]);

  useEffect(() => {
    const infoProduct = async () => {
      const res = await getInfoProduct(match.params.productName);
      console.log(res);
      setProducto(res.data);
      setDescuentosProducto(res.data.descuentos);

      return res;
    };

    const Detalles = async (tipoDetalle, detalle) => {
      let res = await getDetalles(tipoDetalle, detalle);
      if (tipoDetalle === 'Ingredientes') {
        setIngredientesList(res.data);
      }
      if (tipoDetalle === 'Acompañamientos') {
        setacompanamientosList(res.data);
      }
      if (tipoDetalle === 'Caracteristicas importantes') {
        setCaracterísticasImportantesList(res.data);
      }

      return res;
    };

    Detalles('Ingredientes', producto.ingrediente);

    Detalles('Acompañamientos', producto.acompanamiento);

    Detalles('Caracteristicas importantes', producto.caracteristica);

    if (Object.keys(producto).length === 0) {
      infoProduct();
    }

    console.log('HOLA');
  }, [producto.ingrediente, producto.acompanamiento, producto.caracteristica]);

  const handleSubmitOnChange = (event) => {
    console.log(event.target.value);

    setProducto({
      ...producto,
      [event.target.name]: event.target.value,
    });
  };

  const handlePressedEnter = (event) => {
    if (event.key === 'Enter') {
      if (event.target.name === 'ingrediente') {
        setProducto({
          ...producto,
          ingredientes: [...producto.ingredientes, event.target.value],
        });
      }
      if (event.target.name === 'acompanamiento') {
        setProducto({
          ...producto,
          acompanamientos: [...producto.acompanamientos, event.target.value],
        });
      }
      if (event.target.name === 'caracteristica') {
        setProducto({
          ...producto,
          caracteristicas: [...producto.caracteristicas, event.target.value],
        });
      }
    }
  };

  console.log(match.params);
  console.log(match.url);
  const handleOnCLose = (event, typeList) => {
    let itemName = event.target.parentElement.name;
    console.log(event.target);
    if (typeList === 'ingrediente') {
      setProducto({
        ...producto,
        ingredientes: producto.ingredientes.filter(
          (ingrediente) => ingrediente !== itemName
        ),
      });
    }
    if (typeList === 'acompanamiento') {
      setProducto({
        ...producto,
        acompañamientos: producto.acompañamientos.filter(
          (acompanamiento) => acompanamiento !== itemName
        ),
      });
    }
    if (typeList === 'caracteristica') {
      setProducto({
        ...producto,
        otros: producto.otros.filter(
          (caracteristica) => caracteristica !== itemName
        ),
      });
    }
  };

  const sendData = async () => {
    const productoFinal = {
      uuid: producto.uuid,
      productName: producto.nombre,
      categoria: producto.categoria,
      codigo: producto.codigo,
      descripcionProduct: producto.descripcion,
      urlimg: producto.imagen,
      costoProduccion: producto.costo,
      ganancia: producto.ganancia,
      ingredientes: producto.ingredientes,
      acompanamientos: producto.acompañamientos,
      caracteristicas: producto.otros,
      tiempo: producto.tiempo[0],
      descuentos: producto.descuentos,
      stock: producto.stock,
      iva: producto.iva,
    };
    await editProduct(productoFinal);
    setDisableButton(false);
    window.alert('Información de producto Actualizada');
    window.location.href = `/products/${producto.categoria}/${producto.nombre}`;
  };

  const formatDate = (anio, mes, dia) => {
    mes = mes < 10 ? (mes = `0${mes}`) : mes;
    dia = dia < 10 ? (dia = `0${dia}`) : dia;

    return `${anio}-${mes}-${dia}`;
  };

  const Descuentos = (porcentajeProduct, fechainicial, fechafinal, index) =>
    renderDescuento ? (
      <>
        <div>
          <label>Fecha Inicial </label>
        </div>

        <DatePicker
          selected={fechaInicial}
          dateFormat="dd/MM/yyyy"
          onChange={(date, e) => {
            setFechaInicial(date);
            var dia = date.getDate();
            var mes = date.getMonth() + 1;
            var anio = date.getFullYear();
            if (mes < 10) {
              mes = `0${mes}`;
            }
            if (dia < 10) {
              dia = `0${dia}`;
            }
            console.log(fechaInicial);
          }}
        />
        <div>
          <label>Fecha Final </label>
        </div>

        <DatePicker
          selected={fechaFinal}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setFechaFinal(date);
            var dia = date.getDate();
            var mes = date.getMonth() + 1;
            var anio = date.getFullYear();
            if (mes < 10) {
              mes = `0${mes}`;
            }
            if (dia < 10) {
              dia = `0${dia}`;
            }
          }}
        />
        <br />
        <label>Porcentaje Descuento</label>
        <Input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Ingrese el porcentaje de descuento"
          name="porcentaje"
          defaultValue={porcentajeProduct}
          onChange={(e) => setPorcentajeProducto(e.target.value)}
        />
        <br />
        <button
          type="button"
          class="btn btn-light"
          data-mdb-ripple-color="dark"
          onClick={() => {
            var auxDescuentos = producto.descuentos;
            auxDescuentos[index - 1] = {
              fecha_inicial: formatDate(
                fechaInicial.getUTCFullYear(),
                fechaInicial.getUTCMonth() + 1,
                fechaInicial.getUTCDate()
              ),
              fecha_final: formatDate(
                fechaFinal.getUTCFullYear(),
                fechaFinal.getUTCMonth() + 1,
                fechaFinal.getUTCDate()
              ),
              porcentaje: porcentajeProducto,
            };
            console.log(auxDescuentos);
            setProducto({ ...producto, descuentos: auxDescuentos });
          }}
        >
          Agregar
        </button>
      </>
    ) : (
      <></>
    );

  const addItemList = (tipoLista, item) => {
    if (tipoLista === 'ingredientes') {
      if (!producto.ingredientes.some((ingrediente) => ingrediente === item))
        setProducto({
          ...producto,
          ingredientes: [...producto.ingredientes, item],
        });
    }
    if (tipoLista === 'acompañamientos') {
      if (
        !producto.acompañamientos.some(
          (acompanamiento) => acompanamiento === item
        )
      )
        setProducto({
          ...producto,
          acompañamientos: [...producto.acompañamientos, item],
        });
    }
    if (tipoLista === 'caracteristicas') {
      if (!producto.otros.some((caracteristica) => caracteristica === item))
        setProducto({
          ...producto,
          otros: [...producto.otros, item],
        });
    }
  };

  let drawList = (tipoLista, lista) =>
    !(lista === undefined) ? (
      lista.map((item) => (
        <Col sm="4">
          <Button color="warning" onClick={() => addItemList(tipoLista, item)}>
            {item}
          </Button>
          <br />
          <br />
        </Col>
      ))
    ) : (
      <></>
    );

  let drawItemsProduct = (tipoLista) => {
    if (Object.keys(producto).length !== 0) {
      if (tipoLista === 'ingredientes') {
        return producto.ingredientes.map((ingrediente) => (
          <div>
            <Button color="warning" className="mr-0">
              {ingrediente}
            </Button>
            <MDBCloseIcon
              className="btn-close-icon"
              onClick={(event) => handleOnCLose(event, 'ingrediente')}
              name={ingrediente}
            />

            <br />
          </div>
        ));
      }
      if (tipoLista === 'acompanamientos') {
        return producto.acompañamientos.map((acompanamiento) => (
          <div>
            <Button color="warning" className="mr-0">
              {acompanamiento}
            </Button>
            <MDBCloseIcon
              className="btn-close-icon"
              onClick={(event) => handleOnCLose(event, 'acompanamiento')}
              name={acompanamiento}
            />

            <br />
          </div>
        ));
      }
      if (tipoLista === 'caracteristicas') {
        return producto.otros.map((caracteristica) => (
          <div>
            <Button color="warning" className="mr-0">
              {caracteristica}
            </Button>
            <MDBCloseIcon
              className="btn-close-icon"
              onClick={(event) => handleOnCLose(event, 'caracteristica')}
              name={caracteristica}
            />

            <br />
          </div>
        ));
      }
      if (tipoLista === 'descuentos') {
        return producto.descuentos.map((descuento, index) => {
          index += 1;
          const fechaInicial = new Date(descuento.fecha_inicial);
          const fechaFinal = new Date(descuento.fecha_final);
          console.log(index);
          return (
            <div>
              <Button
                color="warning"
                className="mr-0"
                onClick={() => {
                  setRenderDescuento(!renderDescuento);
                  setFechaInicial(
                    new Date(
                      fechaInicial.getUTCFullYear(),
                      fechaInicial.getUTCMonth(),
                      fechaInicial.getUTCDate()
                    )
                  );
                  setFechaFinal(
                    new Date(
                      fechaFinal.getUTCFullYear(),
                      fechaFinal.getUTCMonth(),
                      fechaFinal.getUTCDate()
                    )
                  );
                }}
              >
                {`${descuento.porcentaje}% ${fechaInicial.toLocaleString(
                  'default',
                  { month: 'long' }
                )}/${fechaInicial.getUTCDate()}`}
              </Button>
              <MDBCloseIcon
                className="btn-close-icon"
                onClick={(event) => handleOnCLose(event, 'descuento')}
                name={descuento}
              />

              <br />
              {Descuentos(
                descuento.porcentaje,
                new Date(
                  fechaInicial.getUTCFullYear(),
                  fechaInicial.getUTCMonth(),
                  fechaInicial.getUTCDate()
                ),
                descuento.fecha_final,
                index
              )}
            </div>
          );
        });
      }
    }
  };

  console.log(producto);
  const productForm =
    props.loggedInStatus && props.isAdmin ? (
      <div>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="form-group">
            <label>Product Name</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese el nombre del producto"
              name="nombre"
              defaultValue={match.params.productName}
              onChange={handleSubmitOnChange}
            />
          </div>
          <div className="form-group">
            <label>Codigo producto</label>
            <Input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese el nombre del producto"
              name="codigo"
              defaultValue={producto.codigo}
              onChange={handleSubmitOnChange}
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <Input
              type="textarea"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese una descripción"
              name="descripcion"
              defaultValue={producto.descripcion}
              onChange={handleSubmitOnChange}
            />
          </div>
          <div className="form-group">
            <label>imagen(url)</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese url de la imagen"
              name="imagen"
              defaultValue={producto.imagen}
              onChange={handleSubmitOnChange}
            />
          </div>

          <div className="form-group">
            <h6>Costo de producción</h6>
            <Input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese el precio del producto"
              name="costo"
              defaultValue={producto.costo}
              onChange={handleSubmitOnChange}
            />
          </div>
          <div className="form-group">
            <label>Ganancia</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese un porcentaje de descuento"
              name="ganancia"
              defaultValue={producto.ganancia}
              onChange={handleSubmitOnChange}
            />
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Agregar ingrediente:</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="ingrediente"
              onChange={handleSubmitOnChange}
              onKeyDown={handlePressedEnter}
            />
          </div>
          <br />
          <Container>
            <Row>{drawList('ingredientes', ingredientesList)}</Row>
          </Container>
          <br />
          <br />
          <div>
            <label>ingredientes del producto:</label>
          </div>
          <div>{drawItemsProduct('ingredientes')}</div>
          <div className="form-group">
            <label>Agregar acompanamientos:</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese un acompanamiento"
              name="acompanamiento"
              onChange={handleSubmitOnChange}
              onKeyDown={handlePressedEnter}
            />
          </div>
          <Container>
            <Row>{drawList('acompañamientos', acompanamientosList)}</Row>
          </Container>
          <div>
            <label>Acompañamientos del producto:</label>
          </div>
          <div>{drawItemsProduct('acompanamientos')}</div>

          <div>
            <label>Agregar característica importante:</label>
          </div>
          <Input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Ingrese una característica Importante del producto"
            name="caracteristica"
            onChange={handleSubmitOnChange}
            onKeyDown={handlePressedEnter}
          />
          <br />
          <Container>
            <Row>
              {drawList('caracteristicas', característicasImportantesList)}
            </Row>
          </Container>
          <div>
            <label>Características Importantes:</label>
          </div>
          <div>{drawItemsProduct('caracteristicas')}</div>
          <div className="form-group">
            <label>Tiempo</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese el tiempo de preparación del producto"
              name="tiempo"
              defaultValue={producto.tiempo}
              onChange={handleSubmitOnChange}
            />
          </div>

          <div className="form-group">
            <label>Descuentos</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese el tiempo de preparación del producto"
              name="descuento"
            />
          </div>
          <div>{drawItemsProduct('descuentos')}</div>
          <div className="form-group">
            <label>Iva</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese el tiempo de preparación del producto"
              name="iva"
              defaultValue={producto.iva}
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
      //props.history.push('/')
      <>
        <Link to="/">
          <Button>IR AL INICIO</Button>
        </Link>
      </>
    );
  return (
    <div>
      <h2>
        Aquí se modifica la info de el producto {match.params.productName} que
        hace parte de la categoria {match.params.cardListName}
      </h2>
      {productForm}
    </div>
  );
}
export default EditProduct;
