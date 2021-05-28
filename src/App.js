import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Categorias from './components/pages/Categorias';
import Products from './components/pages/Products';
import SignIn from './components/pages/SignUp';
import Login from './components/pages/Login';
import InfoProduct from './components/InfoProduct';
import AddProduct from './components/AddProduct';

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogIn = () => {
    setLoggedInStatus(true);
    console.log('SIUUUUUU');
  };
  const handleLogOut = () => {
    setLoggedInStatus(false);
    setIsAdmin(false);
  };

  return (
    <>
      <Router>
        <Navbar
          handleLogin={handleLogIn}
          handleLogOut={handleLogOut}
          loggedInStatus={loggedInStatus}
          setLoggedInStatus={setLoggedInStatus}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route path="/services" component={Services} />
          <Route exact path="/products" component={Categorias} />
          <Route path="/sign-up" component={SignIn} />
          <Route path="/login" component={Login} />
          <Route path="/products/services" component={Services} />
          <Route
            exact
            path="/products/:cardListName"
            render={(props) => (
              <Products
                {...props}
                handleLogin={handleLogIn}
                handleLogOut={handleLogOut}
                loggedInStatus={loggedInStatus}
                setLoggedInStatus={setLoggedInStatus}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            )}
          />
          <Route
            exact
            path="/products/:cardListName/addProduct"
            render={(props) => (
              <AddProduct
                {...props}
                handleLogin={handleLogIn}
                handleLogOut={handleLogOut}
                loggedInStatus={loggedInStatus}
                setLoggedInStatus={setLoggedInStatus}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            )}
          />
          <Route
            exact
            path="/products/:cardListName/:productName"
            component={InfoProduct}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
