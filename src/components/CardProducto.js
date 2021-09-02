import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { getCategoria, getProducts } from '../ApiCore';
import './Cards.css';
import CardItem from './CardItem';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function CardProducto(props) {
  const match = useRouteMatch();
  const [cards, setCards] = useState([]);
  const [cardListName, setCardListName] = useState('');
  const [url, setUrl] = useState('');
  const [eliminarProducts, setEliminarProducts] = useState(false);

  const addButton =
    props.loggedInStatus && props.isAdmin ? (
      <Fab className="add-button" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    ) : (
      <></>
    );

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

  const editButton =
    props.loggedInStatus && props.isAdmin ? (
      <Fab className="edit-button" color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
    ) : (
      <></>
    );

  const getCards = async ({ cardtype }) => {
    if (cardtype === 'categoria') {
      const response = await getCategoria();
      console.log(response);
      setCards(response);
      return response;
    } else {
      let response = await getProducts(match.params.cardListName);
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
          path={`${match.url}/${card.nombre}`}
          eliminarProduct={eliminarProduct}
          setCards={setCards}
          cards={cards}
          getCards={getCards}
        />
        <br />
      </Col>
    ));

  useEffect(() => {
    getCards({});
  }, [cards]);

  console.log(':DDDDDDDDDDDDDDDDDDD');
  console.log(cards);
  console.log(match);
  console.log(props.loggedInStatus);
  return (
    <div className="cards">
      <h1 class="display-1">{match.params.cardListName}</h1>
      <br />
      <Link to={`${match.url}/addProduct`}> {addButton}</Link>
      <br />
      {deleteButton}
      <br />
      <Link to={`${match.url}/editCategoria`}>{editButton}</Link>
      <br />
      <Container>
        <Row>{categoriaCard(eliminarProducts)}</Row>
      </Container>
    </div>
  );
}

export default CardProducto;
