import React, {useEffect,useState} from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Container, Row, Col } from 'reactstrap';
import {getCategoria} from '../ApiCore'



function CardsWrapper(props) {

    const [cards, setCards]= useState([]);
    const [cardListName, setCardListName] = useState('');
    const [cardKey, setcardKey] = useState(0);

    const setNameLista = (nombre) =>{
        setCardListName(nombre);
    };

    const incKey = () =>{
        setcardKey(cardKey + 1);
    }

    const getCards = async () => {
      let response = await getCategoria();
      console.log('Hola')
      setCards(response.data);
      console.log(cards)
      return response;
    };

    let categoriaCard=cards.map(({nombre, imagen, descripcion})=>(
            
        <Col sm="4">
          <CardItem
            src={imagen}
            text={descripcion}
            label={nombre}
            keyy={incKey}
          path='/services'
        />
        <br/>
        </Col>
    ));

    return (
        <div>
            {props.render(cards, getCards, categoriaCard, cardListName, setNameLista)}
        </div>
    );
}

export default CardsWrapper;
