import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';
import { Container, Row, Col } from 'reactstrap';
import { useRouteMatch } from 'react-router';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCategoria, getProducts } from '../ApiCore';
import CardItem from './CardItem';

function Cards(props) {
  const match = useRouteMatch();
  const [cards, setCards] = useState([]);

  let nameLista = () => props.setNameLista('Categorías');

  const [eliminarProducts, setEliminarProducts] = useState(false);

  const getCards = async () => {
    var response = await getCategoria(props.token);
    if (cards.length !== response.length) {
      console.log(response);
      setCards(response);
    }
    return response;
  };
  let categoriaCard = (eliminarProduct, cardtype) =>
    cards.map((card) => (
      <Col sm="4">
        <CardItem
          src={card.imagen}
          text={card.descripcion}
          label={card.nombre}
          keyy={card.nombre}
          path={`${match.url}/${card.nombre}`}
          eliminarProduct={eliminarProduct}
          cardtype={cardtype}
          setCards={setCards}
          cards={cards}
          getCards={getCards}
        />
        <br />
      </Col>
    ));

  useEffect(() => {
    getCards('categoria');
  }, [getCards, cards]);

  console.log(cards);
  const deleteButton =
    props.loggedInStatus && props.isAdmin ? (
      <Fab className="delete-button" color="secondary" aria-label="delete">
        <DeleteIcon
          onClick={() => {
            setEliminarProducts(!eliminarProducts);
            console.log(eliminarProducts);
          }}
        />
      </Fab>
    ) : (
      <></>
    );

  const addButton =
    props.loggedInStatus && props.isAdmin ? (
      <Fab className="add-button" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    ) : (
      <></>
    );

  return (
    <div className="cards">
      <h1>Categorías</h1>
      <br />
      <Link to={`${match.url}/AddCategoria`}>{addButton}</Link>
      <br />
      {deleteButton}
      <Container>
        <Row>{categoriaCard(eliminarProducts, 'Categoria')}</Row>
      </Container>
    </div>
  );
}

export default Cards;
