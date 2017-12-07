import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Icon } from 'react-materialize';

export default class StockCryptoTracker extends Component {

   render() {
      const { name, type, currentPrice, quantity, chartData } = this.props;
      return (
         <tr>
            <th scope="row">{name}</th>
            <td>{this.props.currentPrice}</td>
            <td><input value={quantity} onChange={ event => this.props.updateQuantity(name, type, event.target.value)} /></td>
            <td><a className="waves-effect waves-teal btn-flat" onClick={ () => this.props.updateGraphTicker({name, type})}>
               <Icon small>assessment</Icon>
               </a></td>
            <td><a className="waves-effect waves-teal btn-flat" onClick={ () => this.props.onClick(name, type)}>
               <Icon small>clear</Icon>
            </a></td>
        </tr>
      );
   }
}
