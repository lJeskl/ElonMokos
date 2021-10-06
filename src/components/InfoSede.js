import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { getSedes } from '../ApiCore';

function InfoSede() {
  const match = useRouteMatch();
  const [sedeInfo, setSedeInfo] = useState([
    {
      abierto: false,
      codigo: '12341',
      direccion: 'Cra 1 # 1 3',
      horario: [],
      imagen: '',
      nit: '',
      telefono: '',
    },
  ]);
  useEffect(() => {
    const sedes = async () => {
      let res = await getSedes();
      console.log(res);
      setSedeInfo(
        res.data.filter((sede) => sede.codigo === match.params.sedeid)
      );
    };
    sedes();
  }, []);
  console.log(sedeInfo[0]);
  return <div>{<h2>{sedeInfo[0].direccion}</h2>}</div>;
}

export default InfoSede;
