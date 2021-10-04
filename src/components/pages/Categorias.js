import React, { useEffect } from 'react';
import CardsCategorias from '../CardsCategorias';
import '../../App.css';
import Footer from '../Footer';
import CardsWrapper from '../CardsWrapper';

export default function Categorias(props) {
  useEffect(() => {
    //props.setCounter(props.counter + 1);
  }, []);

  console.log(props.counter);
  return (
    <>
      <CardsWrapper
        render={(
          cards,
          setCards,
          getCards,
          categoriaCard,
          cardListName,
          setNameLista,
          setCardUrl,
          url,
          setUrl
        ) => {
          return (
            <CardsCategorias
              cards={cards}
              setCards={setCards}
              getCards={getCards}
              categoriaCard={categoriaCard}
              cardListName={cardListName}
              setNameLista={setNameLista}
              setCardUrl={setCardUrl}
              url={url}
              setUrl={setUrl}
              handleLogin={props.handleLogin}
              handleLogOut={props.handleLogOut}
              loggedInStatus={props.loggedInStatus}
              setLoggedInStatus={props.setLoggedInStatus}
              isAdmin={props.isAdmin}
              setIsAdmin={props.setIsAdmin}
              token={props.token}
            />
          );
        }}
      />
      {/* <Footer /> */}
    </>
  );
}
