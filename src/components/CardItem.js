import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody } from 'reactstrap';
import { MDBCloseIcon, MDB } from 'mdbreact';
import { deleteProduct, deleteCategoria } from '../ApiCore';

function CardItem(props) {
  const remove = async () => {
    if (
      window.confirm(
        `Está a punto de eliminar ${props.label} ¿Desea continuar?`
      )
    ) {
      if (props.cardtype === 'Categoria') {
        await deleteCategoria(props.label);
        props.getCards({});
      } else {
        await deleteProduct(props.label);
        props.getCards({});
      }
    }

    //props.setCards(props.cards.filter((card) => card !== props.label));
  };
  const deleteButton = props.eliminarProduct ? (
    <MDBCloseIcon
      className="btn-close-icon"
      onClick={() => {
        console.log('Holas');
        remove();
      }}
    />
  ) : (
    <></>
  );
  return (
    <div>
      <Card className="cards__item" key={props.keyy}>
        <Link className="cards__item__link" to={props.path}>
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <CardImg
              className="cards__item__img"
              alt="Travel Image"
              src={props.src}
            />
          </figure>
          <CardBody className="cards__item__info">
            <h5 className="cards__item__text">{props.text}</h5>
          </CardBody>
        </Link>
        {deleteButton}
      </Card>
    </div>
  );
}

export default CardItem;
