import React, {useEffect,useState} from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Container, Row, Col } from 'reactstrap';
import {getCategoria} from '../ApiCore'


function Cards(props) {

    useEffect(()=>{
        props.setNameLista('Categorías');
        props.getCards()       
    },[])

    console.log(props.cards)

    return (
        <div className='cards'>
            <h1>{props.cardListName}</h1>
            <br/>
            <Container >
                <Row >
                    {props.categoriaCard}
                </Row>
            </Container>
        </div>
    )
}

export default Cards;
