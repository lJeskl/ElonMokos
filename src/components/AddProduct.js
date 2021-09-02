import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button, Input, Col, Container, Row, ButtonToggle } from 'reactstrap';
import { getDetalles, sendProduct } from '../ApiCore';
import DatePicker from 'react-datepicker';
import { MDBCloseIcon } from 'mdbreact';
import 'react-datepicker/dist/react-datepicker.css';
import './AddProduct.css';
function AddProduct(props) {
  //Guarda la url Actual
  const match = useRouteMatch();
  const nombreCategoria = match.params.cardListName;
  const [product, setProduct] = useState({
    productName: '',
    categoria: nombreCategoria,
    codigo: '',
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
    tiempo: '',
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
    useState([]);
  const [renderDescuento, setRenderDescuento] = useState(false);
  const [renderIVA, setRenderIVA] = useState(false);
  const [respuestaServer, setRespuestaServer] = useState({ status: 500 });

  //Petición a la base de datos de los ingredientes, acompañamientos y las caracteristicas importantes, según lo que halla escrito el usuario en el respectivo campo
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
    if (product.ingrediente !== '') {
      Detalles('Ingredientes', product.ingrediente);
    }
    if (product.acompanamiento !== '') {
      Detalles('Acompañamientos', product.acompanamiento);
    }
    if (product.caracteristica !== '') {
      Detalles('Caracteristicas importantes', product.caracteristica);
    }
  }, [product.ingrediente, product.acompanamiento, product.caracteristica]);

  //HANDLERS

  //Modifica los campos del objeto product, a medida que el usuario escribe el input
  const handleSubmitOnChange = (event) => {
    console.log(event.target.value);

    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  //Cuando el usuario presiona Enter en los campos de ingrediente, acompañamiento o características, agrega a la respectiva lista lo que haya escrito en el campo
  const handlePressedEnter = (event) => {
    if (event.key === 'Enter') {
      if (event.target.name === 'ingrediente') {
        setProduct({
          ...product,
          ingredientes: [...product.ingredientes, event.target.value],
        });
      }
      if (event.target.name === 'acompanamiento') {
        setProduct({
          ...product,
          acompanamientos: [...product.acompanamientos, event.target.value],
        });
      }
      if (event.target.name === 'caracteristica') {
        setProduct({
          ...product,
          caracteristicas: [...product.caracteristicas, event.target.value],
        });
      }
    }
  };
  //Elimina la tarjeta del ingrediente, acompañamiento o caracteristica, al presionar la x
  const handleOnCLose = (event, typeList) => {
    let itemName = event.target.parentElement.name;
    console.log(event.target);
    if (typeList === 'ingrediente') {
      setProduct({
        ...product,
        ingredientes: product.ingredientes.filter(
          (ingrediente) => ingrediente !== itemName
        ),
      });
    }
    if (typeList === 'acompanamiento') {
      setProduct({
        ...product,
        acompanamientos: product.acompanamientos.filter(
          (acompanamiento) => acompanamiento !== itemName
        ),
      });
    }
    if (typeList === 'caracteristica') {
      setProduct({
        ...product,
        caracteristicas: product.caracteristicas.filter(
          (caracteristica) => caracteristica !== itemName
        ),
      });
    }
  };

  const validateSubmitData = (product) => {
    if (!Number(parseInt(product.codigo))) {
      console.log(
        'El valor ingresado en CODIGO es incorrecto (Este campo no puede estar vacío y debe contener solo números [0-9])'
      );
    } else {
      console.log(':D');
    }
    if (product.productName === '') {
      console.log('El campo del Nombre del producto no debe estar vacío');
    }
    if (product.descripcionProduct === '') {
      console.log('El campo de la Descripción no debe estar vacío');
    }
  };

  //Envía los datos del formulario al back
  const sendData = async () => {
    const productFinal = {
      productName: product.productName,
      categoria: product.categoria,
      codigo: product.codigo,
      descripcionProduct: product.descripcionProduct,
      urlimg: product.urlimg,
      costoProduccion: product.costoProduccion,
      ganancia: product.ganancia,
      ingredientes: product.ingredientes,
      acompanamientos: product.acompanamientos,
      caracteristicas: product.caracteristicas,
      tiempo: product.tiempo,
      descuento: product.descuento,
      fecha_inicial: product.fechaInicial,
      fecha_final: product.fechaFinal,
      stock: product.stock,
      iva: product.iva,
    };
    validateSubmitData(productFinal);
    setRespuestaServer(await sendProduct(productFinal));
    if (respuestaServer.status === 500) {
      window.location.href = `/products/${product.categoria}`;
    }
  };

  //COMPONENTES CONDICIONALES
  const errorDeCampoProductNAme =
    respuestaServer.status !== 500 ? (
      <small className="form-text text-danger">{`${respuestaServer.data.productName}*`}</small>
    ) : (
      <></>
    );

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
        dateFormat="dd/MM/yyyy"
        onChange={(date) => {
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

          setProduct({
            ...product,
            fechaInicial: `${anio}-${mes}-${dia}`,
          });
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

          setProduct({
            ...product,
            fechaFinal: `${anio}-${mes}-${dia}`,
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

  //Agregar un elemento a la lista correspondiente, en el caso que no exista
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
    if (tipoLista === 'acompañamientos') {
      return product.acompanamientos.map((acompanamiento) => (
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
      return product.caracteristicas.map((caracteristica) => (
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
  };

  //==============================
  const addProductForm =
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
              name="productName"
              onChange={handleSubmitOnChange}
            />
            {errorDeCampoProductNAme}
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
              onKeyDown={handlePressedEnter}
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
              onKeyDown={handlePressedEnter}
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
            <br />
            <label>Tiempo:</label>
            <Input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Ingrese el Tiempo"
              name="tiempo"
              onChange={handleSubmitOnChange}
            />
          </div>
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
