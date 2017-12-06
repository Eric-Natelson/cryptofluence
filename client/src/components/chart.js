import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Line} from 'react-chartjs-2';
import { FETCH_CHART_DATA, LOAD_CHART_DATA } from '../actions/types';




export default class Chart extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      const { prices, times } = this.props.chartData;
      const data = {
        labels: [...times],
        datasets: [
          {
            label: 'Price Chart',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [...prices], // this.props.chartData.prices
          }
        ]
      };
      return (
         <div className="container">
            <Line data={data} width={50} height={300} options={{maintainAspectRatio: false}} ></Line>
         </div>
      );
   }

}
