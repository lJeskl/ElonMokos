import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './infoProduct.css';
import { getInfoProduct } from '../ApiCore';

function InfoProduct() {
  const [prueba, setPrueba] = useState({});
  const { cardListName, productName } = useParams();

  useEffect(() => {
    const infoProduct = async () => {
      const res = await getInfoProduct(productName);
      setPrueba(res.data);
      console.log(res);
      return res;
    };
    infoProduct();
  }, []);
  console.log(prueba);
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
  } = prueba;

  let listInfo = (typeInfo) => {
    if (!(typeInfo === undefined))
      return typeInfo.map((typeInfoItem) => <ul>{typeInfoItem}</ul>);
  };

  return (
    <div className="info_container">
      <h2 className="title">{productName}</h2>
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
      </p>
      Ingredientes: {listInfo(ingredientes)}
      <br />
      Acompañamientos: {listInfo(acompañamientos)}
      <br />
      Otros: {listInfo(otros)}
    </div>
  );
}

export default InfoProduct;
