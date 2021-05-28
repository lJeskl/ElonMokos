import React from "react";
import CardsCategorias from "../CardsCategorias";
import "../../App.css";
import Footer from "../Footer";
import CardsWrapper from "../CardsWrapper";

export default function Categorias() {
  return (
    <>
      <CardsWrapper
        render={(
          cards,
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
              getCards={getCards}
              categoriaCard={categoriaCard}
              cardListName={cardListName}
              setNameLista={setNameLista}
              setCardUrl={setCardUrl}
              url={url}
              setUrl={setUrl}
            />
          );
        }}
      />
      <Footer />
    </>
  );
}
