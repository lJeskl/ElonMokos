import React from 'react';
import '../../App.css';
import { Button } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function Services() {
  return (
    <div>
      <h1 className="services">Hola</h1>
      <div>
        <button type="button" class="btn btn-primary btn-floating">
          <i class="fas fa-download"></i>
        </button>
        <Fab className="add-button" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}
