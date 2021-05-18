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
import CardsWrapper from './components/CardsWrapper'
import CardsProducts from './components/CardsProducts';


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
          <Route path='/Desayunos'>
          <CardsWrapper render={(cards, getCards, categoriaCard,cardListName, setNameLista)=>{
                return <CardsProducts cards={cards} getCards={getCards} categoriaCard={categoriaCard} cardListName={cardListName} setNameLista={setNameLista}/>
            }}/>
          </Route>
          <Route path='/Almuerzos'>
          <CardsWrapper render={(cards, getCards, categoriaCard,cardListName, setNameLista)=>{
                return <CardsProducts cards={cards} getCards={getCards} categoriaCard={categoriaCard} cardListName={cardListName} setNameLista={setNameLista}/>
            }}/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
