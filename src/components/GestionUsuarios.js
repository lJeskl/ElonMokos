import React, { useEffect, useState } from 'react';
import { getUsuarios, deleteUsuario } from '../ApiCore';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';

function GestionUsuarios() {
  const match = useRouteMatch();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      var respuesta = await getUsuarios();
      if (users.length !== respuesta.data.length) {
        setUsers(respuesta.data);
      }
    };
    getUsers();
  }, [users]);

  const columns = [
    { field: 'id', headerName: 'Correo', width: 200 },
    {
      field: 'nombres',
      headerName: 'Nombres',
      width: 150,
      editable: true,
    },
    {
      field: 'apellidos',
      headerName: 'Apellidos',
      width: 150,
      editable: true,
    },
    {
      field: '',
      headerName: '',
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = async () => {
          localStorage.setItem('userEmail', params.id);
        };

        return (
          <Link to={`${match.url}/editarUsuario`}>
            <Button color="warning" onClick={onClick}>
              Editar
            </Button>
          </Link>
        );
      },
    },
    {
      field: 'Borrar',
      headerName: '',
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = async () => {
          await deleteUsuario(params.id);
        };

        return (
          <Button color="danger" onClick={onClick}>
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  const rows = users;
  const tabla = (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      OnRowClick={(event) => console.log('Hola')}
    />
  );

  console.log(users);
  return <div style={{ height: 400, width: '100%' }}>{tabla}</div>;
}

export default GestionUsuarios;
