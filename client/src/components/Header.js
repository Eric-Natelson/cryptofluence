import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
   renderContent() {
      switch(this.props.auth) {
         case null:
            return;
         case false:
            return <li><a href="/auth/google">Login With Google</a></li>
         default:
            return <li><a href="/api/logout">Logout</a></li>;
      }
   }

   render() {
      return (
         <nav>
            <div className="nav-wrapper grey lighten-1">
               <Link
                  to={this.props.auth ? '/' : '/landing'}
                  className="brand-logo" id="logo">
                  StockCrypto List
               </Link>
               <ul className="right">
                  {this.renderContent()}
               </ul>
            </div>
         </nav>
      );
   }
}

function mapStateToProps({ auth }) {
   return { auth };
}

export default connect(mapStateToProps)(Header);
