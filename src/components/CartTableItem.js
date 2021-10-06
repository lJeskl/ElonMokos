import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import CustomButtonGroup from './CustomButtonGroup';
import Image from 'react-bootstrap/Image';

function CartTableItem(props) {
  console.log(props.quantity);
  const [quantity, setquantity] = useState(props.quantity);
  const handleZero = () => {
    let i = 0;
    let aux = JSON.parse(localStorage.getItem('productList'));
    console.log(aux);
    aux.map((product) => {
      if (product.name === props.name) {
        aux.splice(i, 1);
        props.setCartItems(props.cartItems - product.quantity);
        console.log(aux);
        props.setProductos(aux);
        localStorage.setItem('productList', JSON.stringify(aux));
      }
      i++;
    });
  };
  return (
    <tr className="text-center">
      <td className="align-middle">
        <FiTrash2
          className="mr-2 shadow-sm"
          size="1.2em"
          onClick={handleZero}
        />
      </td>
      <td className="align-middle">
        <Image style={{ height: 110, width: 110 }} src={props.src} rounded />
      </td>
      <td className="align-middle">{props.name}</td>
      <td className="align-middle">${props.price}</td>
      <td className="align-middle">
        <CustomButtonGroup
          name={props.name}
          src={props.src}
          price={props.price}
          quantity={quantity}
          setquantity={setquantity}
          cartItems={props.cartItems}
          setCartItems={props.setCartItems}
          setProductos={props.setProductos}
          cbtype={'cartItems'}
          setTotal={props.setTotal}
          total={props.total}
        />
      </td>
      <td className="align-middle">${props.price * props.quantity}</td>
    </tr>
  );
}

export default CartTableItem;
