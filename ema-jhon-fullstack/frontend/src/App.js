import React, { Component,Fragment } from 'react';

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

import './App.css';

//component
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetails from './components/ProductDetails/ProductDetails';
import NoMatch from './components/NoMatch/NoMatch';
import Login from './components/Login/Login';
import { AuthContextProvider,PrivateRoute } from './components/Login/useAuth';
import Shipping from './components/Shipping/Shipping';

class App extends Component {
  render() {
    return (
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Fragment>
            <Switch>
              <Route path='/shop'>
                <Shop />
              </Route>
              <Route path='/review'>
                <Review />
              </Route>
              <Route path='/inventory'>
                <Inventory />
              </Route>
              <Route exact path='/'>
                <Shop />
              </Route>
              <Route path='/product/:productKey'>
                <ProductDetails />
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <PrivateRoute path='/shipping'>
                <Shipping></Shipping>
              </PrivateRoute>
              <Route path='*'>
                <NoMatch />
              </Route>
            </Switch>
          </Fragment>
        </Router>
      </AuthContextProvider>
    );
  }
}
export default App;
