import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignIn from './components/pages/SignUp';
import Login from './components/pages/Login';
import Menu1 from './components/pages/Menu1'; 

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignIn} />
          <Route path='/login' component={Login} />
          <Route path='/menu1' component={Menu1} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
