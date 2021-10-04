import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AddCategoria from '../components/AddCategoria';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// describe('crear categoria', () => {
//   describe('inputs validos', () => {
//     it('llama la funcion sendData', async () => {
//       const mockOnSubmit = jest.fn();
//       const component = render(
//         <AddCategoria isAdmin={true} loggedInStatus={true} />
//       );
//       await act(async () => {
//         fireEvent.change(getByLabelText('Categoria Name'), {
//           target: { value: 'comidas rapidas' },
//         });
//         fireEvent.change(getByLabelText('Descripción'), {
//           target: { value: 'Esta descripcion es un ejemplo' },
//         });
//         fireEvent.change(getByLabelText('URL imagen'), {
//           target: { value: 'estoesunafoto.com' },
//         });
//       });

//       await act(async () => {
//         fireEvent.click(getbyRole('button'));
//       });
//       component.getByLabelText('Categoria Name');
//     });
//   });
// });
test('campo invalido nombress', () => {
  const props = {
    loggedInStatus: true,
    isAdmin: true,
  };
  const component = render(
    <AddCategoria isAdmin={true} loggedInStatus={true} />
  );

  component.getAllByText('Categoria Name');
});

test('campo invalido nombre', () => {
  const props = {
    loggedInStatus: true,
    isAdmin: true,
  };
  const component = render(
    <AddCategoria isAdmin={true} loggedInStatus={true} />
  );

  component.getAllByText('Categoria Name');
});
test('campo invalido descripcion', () => {
  const props = {
    loggedInStatus: true,
    isAdmin: true,
  };
  const component = render(
    <AddCategoria isAdmin={true} loggedInStatus={true} />
  );

  component.getAllByText('Descripción');
});
test('campo invalido urlimg', () => {
  const props = {
    loggedInStatus: true,
    isAdmin: true,
  };
  const component = render(
    <AddCategoria isAdmin={true} loggedInStatus={true} />
  );

  component.getAllByText('URL imagen');
});

test('campos vacios', () => {
  const props = {
    loggedInStatus: true,
    isAdmin: true,
  };
  const component = render(
    <AddCategoria isAdmin={true} loggedInStatus={true} />
  );

  component.getAllByText('URL imagen');
});
