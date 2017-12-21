import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-materialize';
import { Navbar, NavItem, Icon, Dropdown, Button } from 'react-materialize';

import AccountDropDown from '../containers/AccountDropDown';

class Header extends Component {
   renderContent() {
      switch(this.props.auth) {
         case null:
            return;
         case false:
            return <Col><a href="/auth/google"><img src={require('../images/googlelogin.png')} /></a></Col>
         default:
            return <Col><a href="/api/logout">Logout</a></Col>;
      }
   }

   render() {
      return (
         <div class="navbar-fixed">
            <nav id='header'>
               <div class="nav-wrapper">
                  <a href="#" class="brand-logo">
                     <Link
                        to={this.props.auth ? '/' : '/landing'}
                        className="brand-logo" id="logo">
                        StockCrypto Tracker
                     </Link>
                  </a>
                  <ul id="nav-mobile" class="right hide-on-med-and-down">
                     <li>{this.renderContent()}</li>
                     <li><AccountDropDown /></li>
                  </ul>
               </div>
            </nav>
         </div>
      );
   }

}

function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(Header);
