import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { LocalSee } from '@material-ui/icons';
import { sendVenta } from '../ApiCore';

function CartTotalsCheckout(props) {
  const sendData = async () => {
    window.alert(props.orden);
    console.log(props.orden);
    let response = await sendVenta(props.orden);
    console.log(response);
    //localStorage.setItem('productList', JSON.stringify([]));
  };
  return (
    <div>
      <div>
        <h4 className="text-uppercase my-auto">Cart Totals</h4>
        <Card className="mt-3">
          <Card.Header className="pl-2 font-weight-bold">
            {props.total} Productos
          </Card.Header>
          <Card.Body className="d-flex justify-content-between p-2 mt-3">
            <Card.Text>Precio de los Productos</Card.Text>
            <Card.Text>${props.totalPrice}</Card.Text>
          </Card.Body>

          <Card.Footer>
            <Button
              variant="warning"
              block
              disabled={props.disabled}
              onClick={sendData}
            >
              ORDENAR
            </Button>
            <hr />

            <h6 className="mt-3">
              Nosotros Aceptamos:
              <Image
                className="img-thumbnail mt-1"
                src="https://assets.asosservices.com/asos-finance/images/marketing/single.png"
                alt="payment options"
              />
            </h6>
            <p style={{ fontSize: '0.8em' }}>
              Tienes un codigo de cupon? Agregalo en el siguiente paso
            </p>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default CartTotalsCheckout;
