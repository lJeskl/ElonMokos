import React, {useState} from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Col } from 'reactstrap';
import {getCategoria, getProducts} from '../ApiCore'



function CardsWrapper(props) {

    const [cards, setCards]= useState([]);
    const [cardListName, setCardListName] = useState('');

    const setNameLista = (nombre) =>{
        setCardListName(nombre);
    };

    const [urlid,seturlid]=useState("");
    const setrutaid = ()=>(seturlid(props.match.params.cardListName));

    const getCards = async ({cardtype}) => {
      if(cardtype=='categoria'){
      let response = await getCategoria();
      setCards(response.data);
      return response;
      }else{
        let response = await getProducts(props.match.params.cardListName);
        setCards(response.data);
        return response;
      }
    };

    let categoriaCard=cards.map((card)=>(
            
        <Col sm="4">
          <CardItem 
            src={card.imagen}
            text={card.descripcion}
            label={card.nombre}
            keyy={card.nombre}
          path={'/productos/' + card.nombre}
        />
        <br/>
        </Col>
    ));

    return (
        <div>
            {props.render(cards, getCards, categoriaCard, cardListName, setNameLista, urlid, setrutaid)}
        </div>
    );
}

export default CardsWrapper;
