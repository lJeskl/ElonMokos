import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import CartTableItem from './CartTableItem';
function Cart(props) {
  const full = (
    <Row>
      <Col xs={12} lg={8}>
        <div className="d-flex">
          <h4 className="text-uppercase mr-2 my-auto">Mi Carrito</h4>
          <p className="my-auto">({props.cartItems} Productos)</p>
        </div>
        <Table className="mt-3" responsive>
          <thead>
            <tr className="text-center">
              <th />
              <th>Image</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(localStorage.getItem('productList')).map((product) => (
              <CartTableItem
                src={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                setCartItems={props.setCartItems}
              />
            ))}
          </tbody>
        </Table>
      </Col>

      <Col className="ml-lg-5 pl-lg-2 mt-4 mt-lg-0" xs={12} lg={3}></Col>
    </Row>
  );
  const empty = (
    <div className="text-center">
      <h2>El carrito se encuentra vacío...</h2>
      <Link to="delivery">
        <Button variant="warning" className="mt-4">
          Back to Deliveries
        </Button>
      </Link>
    </div>
  );
  console.log(props.cartItems);
  return <div>{props.cartItems > 0 ? full : empty}</div>;
}

export default Cart;
