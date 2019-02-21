import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './stocks.css';
import AccountToggle from '../../../element/account_toggle';
import StockFb from '../../../element/stocks/first_layout/stockFb';
import StockTqc from '../../../element/stocks/second_layout/stockTqc';
import MarketData from '../../../../../modal/marketData/marketData';
import { refreshTimeInterval } from '../../../../../config';


const marketData = new MarketData;
class Stocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ActiveAccountNumber: '',
      Authorization: localStorage.getItem("Authorization"),
      userAccount: '',
      topData: ''
    };
    this.timeInterval = this.timeInterval.bind(this);
  }
  componentDidMount() {
    setInterval(this.timeInterval, refreshTimeInterval);
  }

  timeInterval() {
    marketData.quotes(localStorage.getItem("Authorization"), this.props.symbol).then(resQuoue => {

      if (resQuoue.data.message === 'success') {
        const data = JSON.parse(resQuoue.data.data);
        console.log('refersh data', data);
        this.setState({ topData: data });
      }
    })
      .catch(err => {
        console.log('xxxxxxxx err xxxxxxxxxx', err);
      })
  }

  render() {
               //console.log('sdhfks fka:',this.state.topData);
    return (
      <div>
        <div className="container-fluid p-l-r-5 ">
          <AccountToggle ActiveAccountNumber={this.state.ActiveAccountNumber} backgroundClass="black-background" backgroundHeaderClass="black-background-header" navTextColorClass="nav-text-color" Cool="color" />
        </div>
        <div className="p-65">
          {/*  <h1>Welcome in stock {this.props.symbol} page . </h1>
               <Link to="/">Dashboard</Link> */}
          {this.state.topData ? <StockFb pageSymbol={this.props.symbol} quoteData={this.state.topData} /> : ''}

          {/* <StockTrade/> */}
          <StockTqc quoteData={this.state.topData} pageSymbol={this.props.symbol}  />
        </div>
      </div>

    );
  }
}

export default Stocks;

