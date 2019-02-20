import React , { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import BasicFunction from '../../../../controller/basicFunction';
const basicFunction = new BasicFunction;
class Gain extends Component{
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
            <div className="gain-Div" style={{'paddingLeft':'0px','paddingRight':'0px'}}>
            <table className="table table-sm table-centered mb-0 last-right-market f-15">
              <thead>
                <tr>
                 <th className="w-33">Symbol</th>
                 <th className="center-market-table w-33">Change</th>
                 <th className="w-33">Last Price</th>
                </tr>
              </thead>
              <tbody>
                {this.props.marketGain && this.props.marketGain.quotes && this.props.marketGain.quotes.quote ?
                 this.props.marketGain.quotes.quote.map((gain,i)=>(
                <tr key={i}>
                  <td><Link to={"/stocks/"+gain.symbol}>{basicFunction.optionNameSplit(gain.symbol)}</Link> </td>
                  <td className="center-market-table"><span className={basicFunction.priceColor(gain.change)}>{basicFunction.nombarFormat(gain.change_percentage)}%</span></td>
                  <td>{basicFunction.currancyAddWithNumber(gain.last)}</td>
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
    marketGain:state.gainReducer.marketGain
   }
}

export default connect(mapStateToProps)(Gain);