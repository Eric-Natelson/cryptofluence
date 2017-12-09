import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-materialize';
import { Navbar, NavItem } from 'react-materialize';

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
        <Navbar className="z-depth-4" id="header"
                brand = {
                <Link
                  to={this.props.auth ? '/' : '/landing'}
                  className="brand-logo" id="logo">
                  StockCrypto Tracker
               </Link>}
               fixed right>
  	      <NavItem className="">{this.renderContent()}</NavItem>
        </Navbar>


      );
   }
}

function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(Header);
