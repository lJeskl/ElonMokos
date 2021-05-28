import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody } from 'reactstrap';

function CardItem(props) {
  return (
    <div>
      <Card className='cards__item' key={props.keyy}>
        <Link className='cards__item__link'  to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <CardImg
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <CardBody className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </CardBody>
        </Link>
      </Card>
    </div>
  );
}

export default CardItem;
