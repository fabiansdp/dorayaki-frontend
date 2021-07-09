import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Dorayaki from './pages/Dorayaki';
import Shops from './pages/Shops';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/dorayaki">
          <Dorayaki />
        </Route>
        <Route path="/dorayaki/:id">
          <Dorayaki />
        </Route>
        <Route path="/shops">
          <Shops />
        </Route>
        <Route path="/shops/:id">
          <Shops />
        </Route>
      </Switch>
    </Router>
  );
};

export default App
