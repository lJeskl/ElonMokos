import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './infoProduct.css';
import { getInfoProduct } from '../ApiCore';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

function InfoProduct(props) {
  const match = useRouteMatch();
  const [producto, setProducto] = useState({});
  const { cardListName, productName } = useParams();

  const editButton =
    props.loggedInStatus && props.isAdmin ? (
      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
    ) : (
      <></>
    );

  console.log(localStorage.getItem('myData'));
  useEffect(() => {
    const infoProduct = async () => {
      const res = await getInfoProduct(productName);
      setProducto(res.data);
      console.log(res);
      return res;
    };
    infoProduct();
  }, []);
  const {
    imagen,
    descripcion,
    precio,
    porcentaje,
    precio_con_descuento,
    ingredientes,
    acompañamientos,
    otros,
    tiempo,
    iva,
    stock,
  } = producto;

  let listInfo = (typeInfo) => {
    if (!(typeInfo === undefined))
      return typeInfo.map((typeInfoItem) => <ul>{typeInfoItem}</ul>);
  };

  return (
    <div className="info_container">
      <h2 className="title">{productName}</h2>
      <Link to={`${match.url}/editProduct`}>{editButton}</Link>
      <br />
      <img className="product-image" alt="" src={imagen} />
      <p className="info-paragraph">
        Descripción: {descripcion}
        <br />
        precio: ${precio}
        <br />
        Porcentaje de descuento: {porcentaje} %
        <br />
        precio con descuento: ${precio_con_descuento}
        <br />
        Iva: {iva}
        <br />
        Tiempo: {tiempo}
      </p>
      Ingredientes: {listInfo(ingredientes)}
      <br />
      Acompañamientos: {listInfo(acompañamientos)}
      <br />
      Otros: {listInfo(otros)}
      <br />
      stock: {stock}
    </div>
  );
}

export default InfoProduct;
