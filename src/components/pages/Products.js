import React from 'react';
import { useRouteMatch, useParams } from 'react-router';
import Footer from '../Footer';
import CardsWrapper from '../CardsWrapper';
import CardsProducts from '../CardsProducts';

function Products(props) {
  const match = useRouteMatch();
  const { cardListName } = useParams();
  return (
    <>
      <CardsWrapper
        match={match}
        cardListName={cardListName}
        render={(
          cards,
          getCards,
          categoriaCard,
          setNameLista,
          setCardUrl,
          url,
          setUrl
        ) => {
          return (
            <CardsProducts
              cards={cards}
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
      />
      <Footer />
    </>
  );
}

export default Products;
