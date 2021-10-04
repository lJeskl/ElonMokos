import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

test('renders Usuarios when loggedIn as admin', () => {
  const props = {
    loggedInStatus: true,
    isAdmin: true,
  };
  const component = render(
    <Router>
      <Navbar loggedInStatus={props.loggedInStatus} isAdmin={props.isAdmin} />
    </Router>
  );

  component.getAllByText('Usuarios');
});

test('renders empty component when isn´t admin', () => {
  const props = {
    loggedInStatus: true,
    isAdmin: false,
  };
  const component = render(
    <Router>
      <Navbar loggedInStatus={props.loggedInStatus} isAdmin={props.isAdmin} />
    </Router>
  );

  expect(component.queryByText('Usuarios')).not.toBeInTheDocument();
});
