import React from 'react';
import CardsCategorias from '../CardsCategorias';
import '../../App.css';
import Footer from '../Footer';
import CardsWrapper from '../CardsWrapper'
import Menu1 from './Menu1'

export default function Products() {
  return (
    <>
      <CardsWrapper render={(cards, getCards, categoriaCard,cardListName, setNameLista)=>{
                return <CardsCategorias cards={cards} getCards={getCards} categoriaCard={categoriaCard} cardListName={cardListName} setNameLista={setNameLista}/>
            }}/>
      <Footer/>
    </>
  );
}
