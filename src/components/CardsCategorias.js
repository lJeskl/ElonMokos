import React, { useEffect } from 'react';
import './Cards.css';
import { Container, Row } from 'reactstrap';
import { useRouteMatch } from 'react-router';

function Cards(props) {
  const { url } = useRouteMatch();
  let nameLista = () => props.setNameLista('Categorías');
  let getCards = () => props.getCards({ cardtype: 'categoria' });
  let cardUrl = () => props.setCardUrl(url);

  useEffect(() => {
    getCards();
    cardUrl();
    nameLista();
  }, []);

  return (
    <div className="cards">
      <h1>{props.cardListName}</h1>
      <br />
      <Container>
        <Row>{props.categoriaCard}</Row>
      </Container>
    </div>
  );
}

export default Cards;
