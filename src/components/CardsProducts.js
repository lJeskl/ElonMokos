import React, { useEffect } from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { useRouteMatch } from 'react-router';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function CardsProducts(props) {
  const { url } = useRouteMatch();
  useEffect(() => {
    props.getCards({});
    props.setCardUrl(url);
  }, []);
  console.log(props.cardListName);

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
      <h1>{props.cardListName}</h1>
      <br />
      <Link to={`${url}/addProduct`}> {addButton}</Link>
      <br />
      <br />
      <Container>
        <Row>{props.categoriaCard}</Row>
      </Container>
    </div>
  );
}

export default CardsProducts;
