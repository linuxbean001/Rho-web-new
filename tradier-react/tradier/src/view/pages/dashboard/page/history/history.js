import React, { Component } from 'react';
import {connect} from 'react-redux';
import BasicFunction from '../../../../../controller/basicFunction';
import {accountHistoryFatch} from '../../../../../controller/actions/historyAction';
import {cellViewOnPaggination} from '../../../../../config';
import AccountToggle from '../../../element/account_toggle';
const basicFunction = new BasicFunction;
class History extends Component {
    constructor(props) {   
        super(props);
        this.state={
            ActiveAccountNumber:'',
            Authorization:localStorage.getItem("Authorization"),
            userAccount:'',
            totalRow:0,
            paginationLiArray:'',
            activePageNo:1,
            historyList:''
          } ;
          
        }
        componentWillReceiveProps(){
          this.props.accountHistoryFatch(localStorage.getItem("ActiveAccountNumber"));
          if(this.props.histores && this.props.histores.length>0){
            const totalRow=this.props.histores.length;
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
          var arrayOfNewHistory='';
          var array=this.props.histores;
          arrayOfNewHistory= array.slice(activePageNo * cellViewOnPaggination , (activePageNo + 1) * cellViewOnPaggination);
          this.setState({historyList:arrayOfNewHistory});
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
              <AccountToggle ActiveAccountNumber={this.state.ActiveAccountNumber}  />
          </div>
          <div className="p-65 pad-5">
            <div  className="card">
             <div className="card-body">
              <h4 className="header-title f-20">HISTORY</h4>
              <table className="table table-sm table-centered mb-0 history-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Commision</th>
                    <th>Ammount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.historyList && this.state.historyList.length>0 ?
                  this.state.historyList.map((history,i)=>(
                    <tr className='order_tr' key={i}>
                      <td>{basicFunction.capitalizeFirstLetter(history.type)}</td>
                      <td>{history.description}</td>
                      <td>{history.quantity}</td>
                      <td>{basicFunction.currancyAddWithNumber(history.commission)}</td>
                      <td>{basicFunction.currancyAddWithNumber(history.amount)}</td>
                      <td>{history.date}</td>
                    </tr>
                  ))
                   
                   : <tr><td colSpan='6'>No active History. </td></tr>}
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
    );
  } 
}
const mapStateToProps = (state) => {
  return {
    histores:state.accountHistoryReducer.accountHistoryDetails,
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    accountHistoryFatch:(activeAccountNumber)=>{
       dispatch(accountHistoryFatch(activeAccountNumber))
    }
  }
}

  export default connect(mapStateToProps,mapDispatchToProps)(History);

