import React, {useEffect} from 'react'
import CardsWrapper from '../CardsWrapper'
import { Container, Row, Col } from 'reactstrap';


const Menu1 = (props) => {

    //const prueba = async () => await ()
    
        useEffect(()=>{
            props.getCards()       
        },[])
    console.log(props.cards)

    

    //props.categoriaCard(props.cards);
    return (
        <div className='cards'>
            <h1>JEJEJE</h1>
             <Container >
                <Row >
                    {props.categoriaCard}
                </Row>
            </Container>
        </div>
    )
}

export default Menu1;