import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../style/style.css';
import materializeCSS from 'materialize-css/dist/css/materialize.min.css';

import Home from './Home';
import Login from './Login';
import Header from './Header';

class App extends Component {
   componentDidMount() {
      this.props.fetchUser();
   }

   render() {
      return (
         <div className="container">
            <BrowserRouter>
               <div>
                  <Header />
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
               </div>
            </BrowserRouter>
         </div>
      );
   }
}

export default connect(null, actions)(App); //guessint no mapdispatchtoprops cause no need to bind aciton creators causing using redux-thunk?
