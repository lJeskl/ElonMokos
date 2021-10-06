import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CartTotalsCheckout from './CartTotalsCheckout';

function Checkout(props) {
  const [orden, setOrden] = useState({
    sedeDireccion: '',
    fraccion: false,
    adminEmail: props.userData.email,
    clienteEmail: '',
    productos: JSON.parse(localStorage.getItem('productList')).map(
      (producto) => ({ nombre: producto.name, cantidad: producto.quantity })
    ),
    pago: [
      {
        metodoDePago: 'efectivo',
        numeroTarjeta: '',
        monto: 0,
      },
      {
        metodoDePago: 'credito',
        numeroTarjeta: '',
        monto: 0,
      },
    ],
  });

  const metodoPago = ['efectivo', 'debito', 'credito', 'corriente'];
  console.log(orden);
  console.log(orden.adminEmail);

  const checkout = (
    <Row>
      <Col xs={12} lg={8}>
        <h4 className="text-uppercase mr-2 my-auto">My Cart</h4>

        <Card className="mt-3">
          <Card.Header>CORREO</Card.Header>
          <Card.Body>
            <Card.Text>{props.userData.email}</Card.Text>
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Header>PAGO</Card.Header>
          <Card.Body>
            <Card.Title>NOMBRE USUARIO</Card.Title>
            <Card.Text>
              {props.userData.nombres} {props.userData.apellidos}
            </Card.Text>
            <Card.Title>SEDE</Card.Title>
            <Form.Control
              onChange={(e) => {
                setOrden({
                  ...orden,
                  adminEmail: props.userData.email,
                  sedeDireccion: e.target.value,
                });
              }}
              placeholder="Dericción de la sede"
              required
            />
            <Card.Title>CORREO CLIENTE</Card.Title>
            <Form.Control
              onChange={(e) => {
                setOrden({
                  ...orden,
                  clienteEmail: e.target.value,
                });
              }}
              placeholder="Correo del cliente"
              required
            />
            <hr />
            <Card.Title>METODO DE PAGO</Card.Title>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                name="fraccion"
                onClick={() => {
                  setOrden({
                    ...orden,
                    fraccion: !orden.fraccion,
                  });
                  if (!orden.fraccion) {
                    let m = orden.pago[0];
                    m.monto = JSON.parse(localStorage.getItem('total'));
                    setOrden({
                      ...orden,
                      pago: [
                        m,

                        {
                          metodoDePago: 'credito',
                          numeroTarjeta: '',
                          monto: 0,
                        },
                      ],
                    });
                  }
                }}
              />
              <label class="form-check-label" for="exampleCheck1">
                Fraccionar
              </label>
            </div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orden.pago[0].metodoDePago}
              displayEmpty="Hola"
              name="monto"
              onChange={(e) => {
                let m = orden.pago[0];
                m.metodoDePago = e.target.value;
                setOrden({
                  ...orden,
                  pago: [m, orden.pago[1]],
                });
              }}
            >
              {metodoPago.map((pago) => {
                return <MenuItem value={pago}>{pago}</MenuItem>;
              })}
            </Select>
            {orden.pago[0].metodoDePago !== 'Efectivo' ? (
              <Form className="my-4">
                <Form.Group controlId="cardNum">
                  <Form.Label>Numero de la Tarjeta</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      let m = orden.pago[0];
                      m.numeroTarjeta = e.target.value;
                      setOrden({
                        ...orden,
                        pago: [m, orden.pago[1]],
                      });
                    }}
                    type="number"
                    placeholder="Card Number"
                    required
                    name="numeroTarjeta"
                  />
                </Form.Group>
              </Form>
            ) : (
              <></>
            )}
            {orden.fraccion ? (
              <div>
                <Form.Label>Monto</Form.Label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Ingrese el monto a pagar por este método"
                  name="monto1"
                  onChange={(e) => {
                    let m = orden.pago[0];
                    m.monto = parseInt(e.target.value);
                    setOrden({
                      ...orden,
                      pago: [m, orden.pago[1]],
                    });
                  }}
                />
              </div>
            ) : (
              <></>
            )}

            {orden.fraccion ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={orden.pago[1].metodoDePago}
                displayEmpty="Hola"
                name="monto"
                onChange={(e) => {
                  let m = orden.pago[1];
                  m.metodoDePago = e.target.value;
                  setOrden({
                    ...orden,
                    pago: [orden.pago[0], m],
                  });
                }}
              >
                {metodoPago.map((pago) => {
                  return <MenuItem value={pago}>{pago}</MenuItem>;
                })}
              </Select>
            ) : (
              <></>
            )}

            {orden.pago[1].metodoDePago !== 'Efectivo' && orden.fraccion ? (
              <Form className="my-4">
                <Form.Group controlId="cardNum">
                  <Form.Label>Numero de la Tarjeta</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      let m = orden.pago[1];
                      m.numeroTarjeta = e.target.value;
                      setOrden({
                        ...orden,
                        pago: [orden.pago[0], m],
                      });
                    }}
                    type="number"
                    placeholder="Card Number"
                    required
                    name="numeroTarjeta"
                  />
                </Form.Group>
              </Form>
            ) : (
              <></>
            )}
            {orden.fraccion ? (
              <div>
                <Form.Label>Monto</Form.Label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Ingrese el monto a pagar por este método"
                  name="monto1"
                  onChange={(e) => {
                    let m = orden.pago[1];
                    m.monto = parseInt(e.target.value);
                    setOrden({
                      ...orden,
                      pago: [orden.pago[0], m],
                    });
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </Card.Body>
        </Card>
      </Col>
      <Col className="ml-lg-5 pl-lg-2 mt-4 mt-lg-0" xs={12} lg={3}>
        <CartTotalsCheckout
          disabled={false}
          buttonText="Checkout"
          totalPrice={JSON.parse(localStorage.getItem('total'))}
          userData={props.userData}
          orden={orden}
        />
      </Col>
    </Row>
  );

  const needToLogin = (
    <div className="text-center">
      <h2>Debes Registrarte o Iniciar Sesión para proceder al checkout</h2>
      <Link to="/">
        <Button variant="warning" className="mt-4">
          HOME
        </Button>
      </Link>
    </div>
  );

  return <div>{props.loggedInStatus === true ? checkout : needToLogin}</div>;
}

export default Checkout;
