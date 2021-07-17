import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Dorayaki from './pages/Dorayaki';
import Shops from './pages/Shops';
import ShopDetail from './pages/ShopDetail';
import DorayakiDetail from './pages/DorayakiDetail';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/dorayaki">
          <Dorayaki />
        </Route>
        <Route path="/dorayaki/:id">
          <DorayakiDetail />
        </Route>
        <Route exact path="/shops">
          <Shops />
        </Route>
        <Route path="/shops/:id">
          <ShopDetail />
        </Route>
      </Switch>
    </Router>
  );
};

export default App
