import React , { Component } from 'react';
import {connect} from 'react-redux';
import { LineChart, Line , XAxis, YAxis, CartesianGrid, Tooltip, Legend ,AreaChart,Area} from 'recharts';
import BasicFunction from '../../../../controller/basicFunction';
import Gain from './gain';
import Loss from './loss';
import News from '../news/news';

import MarketSingle from './marketSingle';
const basicFunction = new BasicFunction;
class Market extends Component{
   constructor(props){
       super(props);
        this.state={
            optionSeries:'',
        }

   }
   componentDidMount(){
       
   }
   render(){
       return(
        <div  className="card">
          <div className="card-body">
             <h4 className="header-title f-20">MARKETS</h4>
             <div className="row">
               {
                   this.props.marketData && this.props.marketData.quotes && this.props.marketData.quotes.quote ?
                   this.props.marketData.quotes.quote.map((singlemarket,index)=>(
                    <MarketSingle  singleMarketData={singlemarket} key={index} />
                   ))
                  :''
               }
               
               
             </div>
             <hr className="m-t-0-5" />
             <div className="row">
               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <h4 className="header-title f-20">GAINERS</h4>
                  <Gain />
               </div>
               <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <h4 className="header-title f-20 loss-heading">LOSERS</h4>
                  <Loss />
               </div>
             </div>
             <hr className="m-t-05" />
             <div className="row">
               <div className="col-lg-12 col-md-12">
                  <h4 className="header-title f-20">News</h4>
                  <News />
               </div>
            </div>
          </div>
        </div>
       )
   }
}
const mapStateToProps = (state) => {
    return {
      marketData:state.marketReducer.userMarket,
    }
  }
const mapDispatchToProps= (dispatch)=>{
    return {
        // accountOrderFatch:(currentAccountNumber)=>{
        //     dispatch(accountOrderFatch(currentAccountNumber));
        //   }
    }
}
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(Market);