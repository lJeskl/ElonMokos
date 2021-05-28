import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Col, Container, Row, ButtonToggle } from 'reactstrap';
import { getDetalles, sendProduct } from '../ApiCore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function AddProduct(props) {
  const [product, setProduct] = useState({
    productName: '',
    descripcionProduct: '',
    urlimg: '',
    costoProduccion: '',
    ganancia: '',
    ingrediente: '',
    ingredientes: [],
    acompanamiento: '',
    acompanamientos: [],
    caracteristica: '',
    caracteristicas: [],
    descuento: '',
    fechaInicial: '',
    fechaFinal: '',
    stock: '',
    iva: '',
  });
  const [fechaInicial, setFechaInicial] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [ingredientesList, setIngredientesList] = useState([]);
  const [acompanamientosList, setacompanamientosList] = useState([]);
  const [característicasImportantesList, setCaracterísticasImportantesList] =
    useState({});
  const [renderDescuento, setRenderDescuento] = useState(false);
  const [renderIVA, setRenderIVA] = useState(false);

  useEffect(() => {
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
    Detalles('Ingredientes', product.ingrediente);
    Detalles('Acompañamientos', product.acompanamiento);
    Detalles('Caracteristicas importantes', product.caracteristica);
  }, [product.ingrediente, product.acompanamiento, product.caracteristica]);

  console.log(característicasImportantesList);

  const handleSubmitOnChange = (event) => {
    console.log(event.target.value);
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handlePressedEnter = (event) => {
    if (event.key === 'Enter') {
      console.log(':DDDDDDDDDD');
    }
  };

  const sendData = (event) => {
    event.preventDefault();

    sendProduct(product);
  };

  const Descuento = renderDescuento ? (
    <div className="form-group">
      <label>Agregue un Descuento:</label>
      <Input
        type="text"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Ingrese porcentaje de descuento"
        name="descuento"
        onChange={handleSubmitOnChange}
      />
      <div>
        <label>Fecha Inicial </label>
      </div>

      <DatePicker
        selected={fechaInicial}
        onChange={(date) => {
          setFechaInicial(date);
          setProduct({
            ...product,
            fechaInicial: `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`,
          });
        }}
      />
      <div>
        <label>Fecha Final </label>
      </div>

      <DatePicker
        selected={fechaFinal}
        onChange={(date) => {
          setFechaFinal(date);
          setProduct({
            ...product,
            fechaFinal: `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`,
          });
        }}
      />
    </div>
  ) : (
    <></>
  );

  const IVA = renderIVA ? (
    <div className="form-group">
      <label>Agregue un Valor personalizado de IVA:</label>
      <Input
        type="text"
        className="form-control"
        id="exampleInputPassword1"
        placeholder="Ingrese porcentaje de descuento"
        name="iva"
        onChange={handleSubmitOnChange}
      />
    </div>
  ) : (
    <></>
  );

  //===============================

  const addItemList = (tipoLista, item) => {
    if (tipoLista === 'ingredientes') {
      if (!product.ingredientes.some((ingrediente) => ingrediente === item))
        setProduct({
          ...product,
          ingredientes: [...product.ingredientes, item],
        });
    }
    if (tipoLista === 'acompañamientos') {
      if (
        !product.acompanamientos.some(
          (acompanamiento) => acompanamiento === item
        )
      )
        setProduct({
          ...product,
          acompanamientos: [...product.acompanamientos, item],
        });
    }
    if (tipoLista === 'caracteristicas') {
      if (
        !product.caracteristicas.some(
          (caracteristica) => caracteristica === item
        )
      )
        setProduct({
          ...product,
          caracteristicas: [...product.caracteristicas, item],
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
    if (tipoLista === 'ingredientes') {
      return product.ingredientes.map((ingrediente) => (
        <div>
          {ingrediente}
          <br />
        </div>
      ));
    }
    if (tipoLista === 'acompañamientos') {
      return product.acompanamientos.map((acompanamiento) => (
        <div>
          {acompanamiento}
          <br />
        </div>
      ));
    }
    if (tipoLista === 'caracteristicas') {
      return product.caracteristicas.map((caracteristica) => (
        <div>
          {caracteristica}
          <br />
        </div>
      ));
    }
  };

  //==============================
  const addProductForm =
    props.loggedInStatus && props.isAdmin ? (
      <div>
        <form onSubmit={sendData}>
          <div className="form-group">
            <label>Product Name</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese el nombre del producto"
              name="productName"
              onChange={handleSubmitOnChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <Input
              type="textarea"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese una descripción"
              name="descripcionProduct"
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
              name="urlimg"
              onChange={handleSubmitOnChange}
            />
          </div>
          <div className="form-group">
            <label>Costo de producción</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese el precio del producto"
              name="costoProduccion"
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
          <Button outline color="danger" type="submit">
            Agregar
          </Button>
          <div>
            <label>ingredientes del producto:</label>
          </div>
          <div>{drawItemsProduct('ingredientes')}</div>
          <div className="form-group">
            <label>acompanamientos:</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese un acompanamiento"
              name="acompanamiento"
              onChange={handleSubmitOnChange}
            />
          </div>
          <br />
          <Container>
            <Row>{drawList('acompañamientos', acompanamientosList)}</Row>
          </Container>
          <div>
            <label>acompanamientos del producto:</label>
          </div>
          <div>{drawItemsProduct('acompañamientos')}</div>
          <div className="form-group">
            <label>Caracteristicas Importantes:</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese un acompanamiento"
              name="caracteristica"
              onChange={handleSubmitOnChange}
            />
          </div>
          <br />
          <Container>
            <Row>
              {drawList('caracteristicas', característicasImportantesList)}
            </Row>
          </Container>
          <div>
            <label>Características importantes del producto:</label>
          </div>
          <div>{drawItemsProduct('caracteristicas')}</div>
          <div>
            <ButtonToggle
              color="warning"
              onClick={() => setRenderDescuento(!renderDescuento)}
            >
              Descuentos
            </ButtonToggle>
          </div>
          <div>{Descuento}</div>
          <div>
            <br />
            <label>Stock:</label>
          </div>
          <div>
            <Input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingrese un acompanamiento"
              name="stock"
              onChange={handleSubmitOnChange}
            />
          </div>
          <div>
            <ButtonToggle
              color="warning"
              onClick={() => setRenderIVA(!renderIVA)}
            >
              IVA
            </ButtonToggle>
          </div>
          <div>{IVA}</div>
          <br />
          <br />
          <Button color="danger" type="submit" className="btn btn-primary">
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
  return <>{addProductForm}</>;
}

export default AddProduct;
