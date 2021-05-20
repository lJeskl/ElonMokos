import React, {useEffect,useState} from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { Container, Row, Col } from 'reactstrap';
import {getCategoria} from '../ApiCore'
import { useLocation } from "react-router-dom";



function CardsProducts(props) {

    let AuxListName=useLocation();
    

    useEffect(()=>{
        props.setNameLista(AuxListName.value);
        props.getCards({productName : AuxListName.value});     
    },[])

    console.log(AuxListName.value);

    //console.log(prueba.value)

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

export default CardsProducts
