import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Categorias from './components/pages/Categorias';
import Products from './components/pages/Products';
import Login from './components/pages/Login';
import InfoProduct from './components/InfoProduct';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import AddCategoria from './components/AddCategoria';
import EditCategoria from './components/EditCategoria';
import SignUp from './components/SignUp';
import GestionUsuarios from './components/GestionUsuarios';
import EditUser from './components/EditUser';
import Cart from './components/Cart';

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState('');
  const [login01, setLogin01] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    nombres: '',
    apellidos: '',
    token: '',
  });
  if (localStorage.getItem('productList') === null) {
    localStorage.setItem('productList', JSON.stringify([]));
  }
  var aux = 0;
  JSON.parse(localStorage.getItem('productList')).map((product) => {
    aux = aux + JSON.parse(product.quantity);

    return aux;
  });
  const [cartItems, setCartItems] = useState(aux);

  console.log(aux);

  console.log(userData.token);

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
          token={token}
          setToken={setToken}
          userData={userData}
          setUserData={setUserData}
          login01={login01}
          setLogin01={setLogin01}
          cartItems={cartItems}
        />
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route path="/services" component={Services} />
          <Route
            exact
            path="/gestionUsuarios/editarUsuario"
            render={(props) => <EditUser {...props} isAdmin={isAdmin} />}
          />
          <Route path="/gestionUsuarios" component={GestionUsuarios} />

          <Route
            exact
            path="/signUp"
            exact
            render={(props) => (
              <SignUp
                {...props}
                loggedInStatus={loggedInStatus}
                userData={userData}
              />
            )}
          />
          <Route
            exact
            path="/products/AddCategoria"
            render={(props) => (
              <AddCategoria loggedInStatus={loggedInStatus} isAdmin={isAdmin} />
            )}
          />
          <Route
            exact
            path="/products"
            render={(props) => (
              <Categorias
                {...props}
                handleLogin={handleLogIn}
                handleLogOut={handleLogOut}
                loggedInStatus={loggedInStatus}
                setLoggedInStatus={setLoggedInStatus}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                token={token}
              />
            )}
          />
          <Route path="/login" render={(props) => <Login {...props} />} />
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
                token={token}
                cartItems={cartItems}
                setCartItems={setCartItems}
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
            path="/products/:cardListName/editCategoria"
            render={(props) => (
              <EditCategoria
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
            render={(props) => (
              <InfoProduct
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
            path="/products/:cardListName/:productName/editProduct"
            render={(props) => (
              <EditProduct
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
            path="/Cart"
            render={(props) => (
              <Cart
                {...props}
                loggedInStatus={loggedInStatus}
                isAdmin={isAdmin}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            )}
          />
        </Switch>
        <Footer />
      </Router>
      {/* <Footer /> */}
    </>
  );
}

export default App;
