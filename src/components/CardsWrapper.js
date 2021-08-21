import React, { useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Col } from 'reactstrap';
import { getCategoria, getProducts } from '../ApiCore';

function CardsWrapper(props) {
  const [cards, setCards] = useState([]);
  const [cardListName, setCardListName] = useState('');
  const [url, setUrl] = useState('');

  const setCardUrl = (url) => {
    setUrl(url);
  };

  const setNameLista = (nombre) => {
    setCardListName(nombre);
  };

  const getCards = async ({ cardtype }) => {
    if (cardtype === 'categoria') {
      const response = await getCategoria();
      console.log(response);
      setCards(response);
      return response;
    } else {
      let response = await getProducts(props.match.params.cardListName);
      if (cards.length !== response.data.length) {
        setCards(response.data);
      }

      return response;
    }
  };

  let categoriaCard = (eliminarProduct) =>
    cards.map((card) => (
      <Col sm="4">
        <CardItem
          src={card.imagen}
          text={card.descripcion}
          label={card.nombre}
          keyy={card.nombre}
          path={`${url}/${card.nombre}`}
          eliminarProduct={eliminarProduct}
        />
        <br />
      </Col>
    ));

  return (
    <div>
      {props.render(
        cards,
        setCards,
        getCards,
        categoriaCard,
        cardListName,
        setNameLista,
        setCardUrl,
        url,
        setUrl
      )}
    </div>
  );
}

export default CardsWrapper;
