import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import CartTableItem from './CartTableItem';
import CartTotalsCart from './CartTotalsCart';
function Cart(props) {
  const [productos, setProductos] = useState(
    JSON.parse(localStorage.getItem('productList'))
  );
  const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')));

  console.log(productos);
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
            {productos.map((product) => (
              <CartTableItem
                src={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                setCartItems={props.setCartItems}
                cartItems={props.cartItems}
                setProductos={setProductos}
                setTotal={setTotal}
                total={total}
              />
            ))}
          </tbody>
        </Table>
      </Col>

      <Col className="ml-lg-5 pl-lg-2 mt-4 mt-lg-0" xs={12} lg={3}>
        <CartTotalsCart
          disabled={false}
          buttonText="Checkout"
          totalPrice={total}
          userData={props.userData}
        />
      </Col>
    </Row>
  );
  const empty = (
    <div className="text-center">
      <h2>El carrito se encuentra vacío...</h2>
      <Link to="/products">
        <Button variant="warning" className="mt-4">
          Volver a entregas
        </Button>
      </Link>
    </div>
  );
  console.log(props.cartItems);
  return <div>{props.cartItems > 0 ? full : empty}</div>;
}

export default Cart;
