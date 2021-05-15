/* eslint-disable */
import React from 'react';
import moment from 'moment';
import { contextType } from 'react-modal';
import { useContext } from 'react';
import countAfterImage from 'images/design-illustration.svg';


const CountdownDisplay = ({ countdown, unixEndDate }) => {


    return (
      
      <div className="countdown">
        <div className="card">
          <div className="countdown-value">{countdown.days}</div>
          <div className="countdown-unit">Days</div>
        </div>
        <div className="card">
          <div className="countdown-value">{countdown.hours}</div>
          <div className="countdown-unit">Hours</div>
        </div>
        <div className="card">
          <div className="countdown-value">{countdown.mins}</div>
          <div className="countdown-unit">Mins</div>
        </div>
        <div className="card">
          <div className="countdown-value">{countdown.secs}</div>
          <div className="countdown-unit">Secs</div>
        </div>
        <p>Counting down to {moment.unix(unixEndDate).format('dddd, MMMM Do, YYYY | h:mm A')}</p>
      </div>
    );
  } 



class Counter extends React.Component { 

  constructor(props) {
    super(props);
     this.state = {
      dateValue: '',
      timeValue: '',
      ampmValue: 'pm',
      countdown: {
        days: '',
        hours: '',
        mins: '',
        secs: ''
      },
      isCountdownSet: true,
    };
    this.timer = null;
    this.countDownDate = {
      unixEndDate: Number(moment('04-27-2021 21:50 pm', 'MM-DD-YYYY hh:mm A').format('X'))
    }; 
    
  }   

  renderCountdownDate(countDownDate) {
    countDownDate ? localStorage.setItem('countDownDate', JSON.stringify(countDownDate)) : null;
    return JSON.parse(localStorage.getItem('countDownDate')) || this.countDownDate;
  }

  startCountdown(endDate) {
    clearInterval(this.timer);
    this.timer = null;        

    if (endDate.unixEndDate !== '') {
      this.timer = setInterval(() => this.playTimer(endDate.unixEndDate), 1000);
    }
    else {
      this.setState({
        isCountdownSet: false
      });
    }
  }

  playTimer(unixEndDate) {
    const distance = unixEndDate - moment().format('X');
    if (distance > 0) {
      this.setState({
        countdown: {
          days: parseInt(distance / (60 * 60 * 24), 10),
          hours: parseInt(distance % (60 * 60 * 24) / (60 * 60), 10),
          mins: parseInt(distance % (60 * 60) / (60), 10),
          secs: parseInt(distance % 60, 10)
        },
        isCountdownSet: true,
      });
    }
    else {
      this.props.handleCountEnd();
      clearInterval(this.timer);
      this.timer = null;
      this.renderCountdownDate(this.countDownDate);
      this.setState({
        isCountdownSet: false
      });   
    }        
  }

  componentDidMount() {   
    localStorage.clear();      
    this.startCountdown(this.renderCountdownDate());         
    
  }  

    render() {        
       return (
         <React.Fragment>   
              {this.state.isCountdownSet &&
                <CountdownDisplay countdown={this.state.countdown} unixEndDate={this.renderCountdownDate().unixEndDate} />  
              }
              {!this.state.isCountdownSet &&
                <table>
                  
                </table> 
              }
         </React.Fragment>
        )        
    }
}

export default Counter;