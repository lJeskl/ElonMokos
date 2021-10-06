import React from 'react';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function CustomButtonGroup(props) {
  var productList;
  if (localStorage.getItem('productList') === null) {
    localStorage.setItem('productList', JSON.stringify([]));
    productList = localStorage.getItem('productList');
  } else {
    productList = JSON.parse(localStorage.getItem('productList'));
  }
  var product;

  if (!productList.some((product) => product.name === props.name)) {
    product = productList.filter((product) => product.name === props.name);
  }

  const handleAdd = async () => {
    var index = 0;
    if (!productList.some((product) => product.name === props.name)) {
      localStorage.setItem(
        'productList',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('productList')),
          {
            name: props.name,
            image: props.src,
            price: props.price,
            quantity: props.quantity + 1,
          },
        ])
      );
      productList = JSON.parse(localStorage.getItem('productList'));
      //props.quantity += 1;
    } else {
      var auxproductList = JSON.parse(localStorage.getItem('productList'));
      JSON.parse(localStorage.getItem('productList')).some((product) => {
        if (product.name === props.name) {
          return true;
        }
        index += 1;
      });
      auxproductList[index].quantity += 1;
      localStorage.setItem('productList', JSON.stringify(auxproductList));
      props.setProductos(auxproductList);
    }
    props.setquantity(props.quantity + 1);
    props.setCartItems(props.cartItems + 1);
    if (props.cbtype === 'cartItems') {
      props.setTotal(props.total + props.price);
    }
    localStorage.setItem(
      'total',
      JSON.stringify(JSON.parse(localStorage.getItem('total')) + props.price)
    );
    //props.setTotal(props.total + props.quantity * props.price);
    //localStorage.setItem('productList', JSON.stringify(productList));
  };

  const handleSub = async () => {
    var index = 0;
    var auxproductList = JSON.parse(localStorage.getItem('productList'));
    JSON.parse(localStorage.getItem('productList')).some((product) => {
      if (product.name === props.name) {
        return true;
      }
      index += 1;
    });
    auxproductList[index].quantity -= 1;
    props.setquantity(props.quantity - 1);
    if (props.cbtype === 'cartItems') {
      props.setTotal(props.total - props.price);
    }
    localStorage.setItem(
      'total',
      JSON.stringify(JSON.parse(localStorage.getItem('total')) - props.price)
    );
    console.log(auxproductList.length);
    if (auxproductList[index].quantity === 0) {
      let aux = [];
      for (let i = index; index < auxproductList.length; i++) {
        if (i + 1 === auxproductList.length) {
          console.log('ENTRE :D');
          props.setCartItems(props.cartItems - 1);
          auxproductList.pop();
          props.setProductos(auxproductList);
          localStorage.setItem('productList', JSON.stringify(auxproductList));
          console.log(auxproductList);
          return 0;
        } else {
          let a = auxproductList[i + 1];
          console.log(a);
          auxproductList[i].name = a.name;
          auxproductList[i].image = a.image;
          auxproductList[i].price = a.price;
          auxproductList[i].quantity = a.quantity;
          console.log(a.quantity);
        }
      }
    } else {
      localStorage.setItem('productList', JSON.stringify(auxproductList));
      props.setProductos(auxproductList);
    }

    props.setquantity(props.quantity - 1);
    props.setCartItems(props.cartItems - 1);
  };

  const addCartElement = (
    <Button className="py-2" variant="outline-dark" onClick={handleAdd}>
      Agregar al carrito
    </Button>
  );
  const plusMinusElement = (
    <ButtonGroup className="w-100" variant="outline-dark">
      <Button variant="outline-dark" onClick={handleSub}>
        {' '}
        -{' '}
      </Button>
      <Button className="disabled" variant="outline-dark">
        {props.cbtype === 'cartItems'
          ? JSON.parse(localStorage.getItem('productList')).filter(
              (product) => product.name === props.name
            )[0].quantity
          : props.quantity}
      </Button>
      <Button className="py-2" variant="outline-dark" onClick={handleAdd}>
        {' '}
        +{' '}
      </Button>
    </ButtonGroup>
  );

  //   JSON.parse(localStorage.getItem('productList')).some((product) => {
  //     if (product.name === props.name) {
  //         return true;
  //       }
  //       index += 1;
  //   })

  return props.cbtype === 'cartItems'
    ? JSON.parse(localStorage.getItem('productList')).filter(
        (product) => product.name === props.name
      )[0].quantity === 0
      ? addCartElement
      : plusMinusElement
    : props.quantity === 0
    ? addCartElement
    : plusMinusElement;
}

export default CustomButtonGroup;
