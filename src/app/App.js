import './App.css';

import React from 'react';
import * as d3  from 'd3';
import moment from 'moment';
import ScheduleComponent from './schedule/Schedule';
//import _ from 'underscore';

class AppComponent extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      data: [],
      headers: [
      'Carrier',
      'Time',
      'Origin',
      'Destination',
      'Train#',
      'Track#',
      'Status'
      ],
      date: null,
      time: null,
      day: null
    };
  }

  updateDateTime() {
    this.timer = setInterval(() => {
      this.setState({
        time: moment().format('LT'),
        day: moment().format('dddd'),
        date: moment().format('MM-DD-YYYY')
       });
    }, 1000);
  }

  getSchedules() {
    let self = this;

    d3.csv('assets/data/departures.csv', function(data) {
    
    console.log(data);
    
    self.setState({
      data: data
    });
   });
  }

  componentDidMount() {
    this.getSchedules();
    this.updateDateTime();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    // since no carrier information was provided
    // hardcoded it
    const title = 'North Station Information';

    return (
      <div className="table-reponsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th colSpan="2">{ this.state.day }
                <br /> { this.state.date }</th>
              <th colSpan="2">
                <span className="text-center">
                  <h2>{title}</h2>
                </span>
              </th>
              <th colSpan="3">{this.state.time}</th>
            </tr>
            <tr>
              {
                this.state.headers.map((header) => {
                  return <th key={header}>{header}</th>
                })
              }
            </tr>
          </thead>
          <ScheduleComponent data={this.state.data} /> 
        </table>
      </div>
    );
  }
}


export default AppComponent;
