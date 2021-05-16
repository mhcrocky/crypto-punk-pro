/* eslint-disable */
import React from 'react';
import moment from 'moment';
import { contextType } from 'react-modal';
import { useContext } from 'react';
import countAfterImage from 'images/design-illustration.svg';
import tw from 'twin.macro';
import prices from 'data/price.json';

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

const TBLIndex = tw.div``;
const TBLName = tw.div``;
const TBLValue = tw.div``;
const TR = tw.div`flex`;
const PriceTable = (props) => {
  console.log(props.data)
  return(
    <div style={{ fontFamily:'Pixelfont' }}>
      <div className={'title'}>PRICE</div>
      {props.data.map((cell,index)=>{
        return(
          <TR style={{ fontSize: '1.2rem' }}>
            <TBLIndex style={{ padding:'.25rem' }}>
              <div style={{ fontSize: '1.2rem',border: '2px solid #000',padding: '3px 0 0 0',borderRadius: '5px',width: '35px',textAlign: 'center'}}>
              {index+1}
              </div>
            </TBLIndex>
            <TBLIndex className={'price_table_name'} style={{ padding:'7px' }}>{cell.name}</TBLIndex>
            <TBLIndex style={{ padding:'7px' }}>{cell.value}</TBLIndex>
          </TR>
        )
      })}
    </div>
  )
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
      let price_data = [];
      for (let index = 0; index < 10; index++) {
        let tmp = 0;
        prices.map((price)=>{
          if((price.value>(index*1000))&&(price.value<((index+1)*1000))){
            tmp++;
          }
        });
        price_data.push({
          name:`${index*1000}~${(index+1)*1000}`,
          value:tmp
        });
        
      }    
       return (
         <React.Fragment>   
              {this.state.isCountdownSet &&
                <CountdownDisplay countdown={this.state.countdown} unixEndDate={this.renderCountdownDate().unixEndDate} />  
              }
              {!this.state.isCountdownSet &&
                <PriceTable data={price_data}/> 
              }
         </React.Fragment>
        )        
    }
}

export default Counter;