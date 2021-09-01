import React from 'react';
import { useRouteMatch, useParams } from 'react-router';
import Footer from '../Footer';
import CardsWrapper from '../CardsWrapper';
import CardProducto from '../CardProducto';

function Products(props) {
  const match = useRouteMatch();
  const cardListName = useParams();
  console.log(cardListName);

  return (
    <>
      {/* <CardsWrapper
        match={match}
        nombreCategoria={cardListName}
        render={(
          cards,
          setCards,
          getCards,
          categoriaCard,
          setNameLista,
          cardListName,
          setCardUrl,
          url,
          setUrl
        ) => {
          return (
            <CardsProducts
              cards={cards}
              setCards={setCards}
              getCards={getCards}
              categoriaCard={categoriaCard}
              cardListName={cardListName}
              setNameLista={setNameLista}
              setCardUrl={setCardUrl}
              url={url}
              setUrl={setUrl}
              handleLogin={props.handleLogIn}
              handleLogOut={props.handleLogOut}
              loggedInStatus={props.loggedInStatus}
              setLoggedInStatus={props.setLoggedInStatus}
              isAdmin={props.isAdmin}
              setIsAdmin={props.setIsAdmin}
            />
          );
        }}
      /> */}
      <CardProducto
        loggedInStatus={props.loggedInStatus}
        isAdmin={props.isAdmin}
        token={props.token}
      />
      <Footer />
    </>
  );
}

export default Products;
