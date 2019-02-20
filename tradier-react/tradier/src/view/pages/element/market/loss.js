import React , { Component } from 'react';
import {connect} from 'react-redux';
import BasicFunction from '../../../../controller/basicFunction';
import { Link } from 'react-router-dom';
const basicFunction = new BasicFunction;
class Loss extends Component{
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
            <div className="loss-Div" style={{'paddingLeft':'0px','paddingRight':'0px'}}>
            <table className="table table-sm table-centered mb-0 last-right-market f-15">
              <thead>
                <tr>
                <th className="w-33">Symbol</th>
                 <th className="center-market-table w-33">Change</th>
                 <th className="w-33">Last Price</th>
                </tr>
              </thead>
              <tbody>
                {this.props.marketLoss && this.props.marketLoss.quotes && this.props.marketLoss.quotes.quote ?
                 this.props.marketLoss.quotes.quote.map((loss,i)=>(
                <tr key={i}>
                  <td><Link to={"/stocks/"+loss.symbol}>{basicFunction.optionNameSplit(loss.symbol)}</Link> </td>
                  <td className="center-market-table"><span className={basicFunction.priceColor(loss.change)}>{basicFunction.nombarFormat(loss.change_percentage)}%</span></td>
                  <td>{basicFunction.currancyAddWithNumber(loss.last)}</td>
                </tr>
                 )) : ''
                }
              </tbody>
            </table>
         </div>
    )}
}
const mapStateToProps = (state)=>{
   return {
    marketLoss:state.lossReducer.marketloss
   }
}

export default connect(mapStateToProps)(Loss);