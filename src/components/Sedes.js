import React, { useEffect, useState } from 'react';
import { getSedes } from '../ApiCore';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

function Sedes() {
  const match = useRouteMatch();
  const [sedesList, setSedesList] = useState([]);
  useEffect(() => {
    const sedes = async () => {
      let res = await getSedes();
      console.log(res);
      setSedesList(res.data);
    };
    sedes();
  }, []);
  console.log(sedesList);
  //console.log(sedesList.map((sede) => <li>{sede.direccion}</li>));
  return (
    <div>
      <Table className="mt-3" responsive>
        <thead>
          <tr className="text-center">
            <th>Abierto</th>
            <th>Dirección</th>
            <th>Imagen</th>
            <th>Telefono</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sedesList.map((sede) => (
            <tr className="text-center">
              <td className="align-middle">{sede.abierto ? 'Sí' : 'No'}</td>
              <td className="align-middle">{sede.direccion}</td>
              <td className="align-middle">
                <Image
                  style={{ height: 110, width: 110 }}
                  src={sede.imagen}
                  rounded
                />
              </td>
              <td className="align-middle">celular: {sede.telefono}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Sedes;
