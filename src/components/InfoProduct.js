import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './infoProduct.css';
import { getInfoProduct } from '../ApiCore';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from './Footer';

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
      return typeInfo.map((typeInfoItem) => (
        <span class="lista">{typeInfoItem}, </span>
      ));
  };

  return (
    <div className="info_container">
      <Link to={`${match.url}/editProduct`}>{editButton}</Link>
      <br />
      <img className="product-image" alt="" src={imagen} />
      <h2 className="title">{productName}</h2>
      <p className="info-paragraph">
        <span>Descripción:</span> {descripcion}
        <br />
        <span>Precio:</span> ${precio}
        <br />
        <span>Porcentaje de descuento:</span> {porcentaje} %
        <br />
        <span>Precio con descuento:</span> ${precio_con_descuento}
        <br />
        <span>IVA:</span> {iva}
        <br />
        <span>Tiempo:</span> {tiempo}
        <br />
        <span>Ingredientes:</span> {listInfo(ingredientes)}
        <br />
        <span>Acompañamientos:</span> {listInfo(acompañamientos)}
        <br />
        <span>Otros:</span> {listInfo(otros)}
        <br />
        <span>Stock:</span> {stock}
      </p>
    </div>
  );
}

export default InfoProduct;
