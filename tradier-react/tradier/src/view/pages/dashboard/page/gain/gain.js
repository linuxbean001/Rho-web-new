import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { accountGainsFatch } from '../../../../../controller/actions/gainsAction';
import AccountToggle from '../../../element/account_toggle';
import BasicFunction from '../../../../../controller/basicFunction';
import {cellViewOnPaggination} from '../../../../../config';
import { connect } from 'react-redux';
const basicFunction = new BasicFunction;


class Gain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ActiveAccountNumber: '',
            Authorization: localStorage.getItem("Authorization"),
            userAccount: '',
            totalRow:0,
            paginationLiArray:'',
            activePageNo:1,
            gainList:''
        };

    }

    componentWillReceiveProps() {
        this.props.accountGainsFatch(localStorage.getItem("ActiveAccountNumber"));
        if(this.props.accountGain && this.props.accountGain.closed_position && this.props.accountGain.closed_position.length>0){
           const totalRow=this.props.accountGain.closed_position.length;
           this.setState({totalRow});
           var paginationLiArray=totalRow/cellViewOnPaggination;
           this.setState({paginationLiArray});
           if(this.state.activePageNo===1){
            this.paggination(1);
           }
      }


    }
    paggination(activePageNo){
      this.setState({activePageNo});
      activePageNo--;
      var arrayOfNewGain='';
      var array=this.props.accountGain.closed_position;
      arrayOfNewGain= array.slice(activePageNo * cellViewOnPaggination , (activePageNo + 1) * cellViewOnPaggination);
      this.setState({gainList:arrayOfNewGain});
    }

    render() {
        if(this.state.paginationLiArray && this.state.paginationLiArray>0){
            var pagginationArray=[];
            for (let index = 1; index <= this.state.paginationLiArray+1; index++) {
                pagginationArray.push(index);
             }
        }
        return (
            <div>
                <div className="container-fluid p-l-r-5">
                    <AccountToggle ActiveAccountNumber={localStorage.getItem("ActiveAccountNumber")} />
                </div>
                <div className="p-65 pad-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive-sm">
                                <h4 className="header-title f-20">GAINS</h4>
                                <div className="row">
                                    <div className="col-lg-12 col-sm-12 col-xs-12 p-b-5">
                                        
                                            <table className="table table-sm table-centered mb-0 history-table">
                                                <thead>
                                                    <tr>
                                                        <th>Symbol</th>
                                                        <th>Quantity</th>
                                                        <th>Cost</th>
                                                        <th>Proceeds</th>
                                                        <th>Total Gain</th>
                                                        <th>Open Date</th>
                                                        <th>Close Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {this.props.accountGain && this.state.gainList && this.state.gainList.length > 0 ?

                                                        this.state.gainList.map((gain, i) => (
                                                            <tr className='order_tr' key={i}>
                                                                <td><Link to={"/stocks/"+gain.symbol} className='a-black'>{basicFunction.optionNameSplit(gain.symbol)}</Link></td>
                                                                <td>{basicFunction.nombarFormat(gain.quantity)}</td>
                                                                <td>{basicFunction.currancyAddWithNumber(gain.cost)}</td>
                                                                <td>{basicFunction.nombarFormat(gain.proceeds)}</td>
                                                                <td className="t-a-l">

                                                                    <span className={basicFunction.priceColor(gain.gain_loss)} >
                                                                        {basicFunction.currancyAddWithNumber(gain.gain_loss)} {' '}
                                                                        ({basicFunction.nombarFormat(gain.gain_loss_percent)}%)
                                                </span>
                                                                </td>


                                                                <td>{basicFunction.dateTimeInMonthName(gain.open_date)}</td>
                                                                <td>{basicFunction.dateTimeInMonthName(gain.close_date)}</td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <tr><td colSpan='7'>No active Gain. </td></tr>
                                                    }
                                                </tbody>
                                            </table>
                                            <nav className="f-r" h={this.state.totalRow}>
                                            {this.state.totalRow && this.state.totalRow>0 ?
                                               
                                                <ul className="pagination pagination-rounded">
                                                    <li className="page-item">
                                                        <a className="page-link"  onClick={()=>this.paggination(1)} href="javascript: void(0);" aria-label="Previous">
                                                            <span aria-hidden="true">«</span>
                                                            <span className="sr-only">Previous</span>
                                                        </a>
                                                    </li>
                                                    
                                                    
                                                   {pagginationArray && pagginationArray.length>0 ?
                                                       
                                                       pagginationArray.map((pag,i)=>(
                                                       <li className={this.state.activePageNo === pag ? 'page-item active' : 'page-item' }><a className="page-link"  onClick={()=>this.paggination(pag)} href="javascript: void(0);">{pag}</a></li>
                                                   ))
                                                :''}
                                                    
                                                    
                                                   

                                                    <li className="page-item ">
                                                        <a className="page-link"  onClick={()=>this.paggination(pagginationArray.length)} href="javascript: void(0);" aria-label="Next">
                                                            <span aria-hidden="true">»</span>
                                                            <span className="sr-only">Next</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                : '' }
                                            </nav>
                                        
                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        currentaccount: state.setAccountReducer.currentaccount,
        accountGain: state.accountGainsReducer.accountGainsDetails
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        accountGainsFatch: (currentAccountNumber) => {
            dispatch(accountGainsFatch(currentAccountNumber))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Gain);


