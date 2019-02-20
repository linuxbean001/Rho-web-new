import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveAccount } from '../../../controller/actions/setActiveAccount';
import { accountFatch } from '../../../controller/actions/accountAcction';
import { accountOrderFatch } from '../../../controller/actions/orderAcction';
import { accountGainsFatch } from '../../../controller/actions/gainsAction';
import { accountPositionFatch } from '../../../controller/actions/accountPositions';
import { accountHistoryFatch } from '../../../controller/actions/historyAction';
import MarketData from '../../../modal/marketData/marketData';
import { isSendBox } from '../../../config';
import BasicFunction from '../../../controller/basicFunction';
const marketData = new MarketData;
const basicFunction = new BasicFunction;
class AccountToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccount: '',
      ActiveAccountNumber: this.props.currentaccount,
      Authorization: localStorage.getItem("Authorization"),
      AccountBalance: '0',
      searchList: '',
      searchHide: 0,
      searchKey: '',
      searchSize: 0,

    };
  }
  componentDidMount() {
    this.props.accountOrderFatch(this.props.currentaccount);
  }
  changeAccount(e) {
    localStorage.setItem('ActiveAccountNumber', e.target.value);
    this.props.accountFatch(this.state.Authorization, e.target.value);
    this.props.setActiveAccount(e.target.value);
    this.props.accountOrderFatch(e.target.value);
    this.props.accountGainsFatch(e.target.value);
    this.props.accountPositionFatch(e.target.value);
    this.props.accountHistoryFatch(e.target.value);
  }
  searchSuggestion(e) {
    var key = e.target.value;
    if (key.length > 0) {
      this.setState({ searchSize: 1 });
      this.setState({ searchKey: key });
      this.setState({ searchHide: 1 });
      marketData.lookup(localStorage.getItem("Authorization"), key, 'Q,N', 'stock')
        .then(res => {
          res = res.data.data;
          var searchList = JSON.parse(res);
          this.setState({ searchList });
        })
        .catch(err => {
        })
    } else {
      this.setState({ searchSize: 0 });
      this.setState({ searchHide: 0 });
      this.setState({ searchList: '' });
      this.setState({ searchKey: '' });
    }
  }
  render() {
    console.log('state is', this.state.searchHide);

    return (
      <div className="row">
        <div className="col-12 pad-5">
          <div className={"card " + this.props.backgroundClass} >
            <div className="card-body full-width-toggle">
              <div className="page-title-box">
                <div className="col-xl-6 p-a">
                  <div className="app-search " >

                    <div className={"input-group margin-left-searchbar" + this.props.backgroundHeaderClass} style={{ 'width': '60%' }} data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                      <input type="text" id='searchid' ref="search" className={"form-control newc " + this.props.backgroundHeaderClass + " " + this.props.navTextColorClass} placeholder="Symbol" onChange={this.searchSuggestion.bind(this)} />
                      <span className="mdi mdi-magnify"></span>

                    </div>

                    <div className={"d-n searchResponse dropdown-menu " + this.props.backgroundClass} >
                      <div className="">
                        <table className="table table-sm table-centered table-wihtout-border padding-t-b-5">
                          <thead>

                            {this.state.searchList && this.state.searchList.securities && this.state.searchList.securities.security && this.state.searchList.securities.security.length > 0 ?
                              <tr>
                                <th className={"searchLink " + this.props.navTextColorClass}>Stocks</th>
                                <th></th>
                              </tr>
                              :
                              this.state.searchList && this.state.searchList.securities && this.state.searchList.securities.security ?
                                <tr>
                                  <th className={"searchLink " + this.props.navTextColorClass}>Stocks</th>
                                  <th></th>
                                </tr>

                                : ''}
                          </thead>
                          <tbody>
                            {this.state.searchList && this.state.searchList.securities && this.state.searchList.securities.security && this.state.searchList.securities.security.length > 0 ?
                              this.state.searchList.securities.security.map((searchSingle, index) => (
                                <tr key={index} className={searchSingle.symbol === this.state.searchKey || searchSingle.symbol === this.state.searchKey.toUpperCase() ? 'hover-color ' + this.props.navTextColorClass : ''}>
                                  <td><Link to={"/stocks/" + searchSingle.symbol} className={"searchLink " + this.props.navTextColorClass} dangerouslySetInnerHTML={{ __html: basicFunction.stringCheckResponseInColor(searchSingle.symbol, this.state.searchKey) }}></Link></td>
                                  <td className={"searchLink " + this.props.navTextColorClass} >{basicFunction.subStrStartEnd(searchSingle.description, 0, 100)}</td>
                                </tr>
                              )) :
                              this.state.searchList && this.state.searchList.securities && this.state.searchList.securities.security ?
                                <tr className={this.state.searchList.securities.security.symbol === this.state.searchKey || this.state.searchList.securities.security.symbol === this.state.searchKey.toUpperCase() ? 'hover-color ' + this.props.navTextColorClass : ''}>
                                  <td><Link to={"/stocks/" + this.state.searchList.securities.security.symbol} className="searchLink" dangerouslySetInnerHTML={{ __html: basicFunction.stringCheckResponseInColor(this.state.searchList.securities.security.symbol, this.state.searchKey) }}></Link></td>
                                  <td className={"searchLink " + this.props.navTextColorClass}>{this.state.searchList.securities.security.description}</td>
                                </tr>

                                : <tr><td colSpan="2" className="searchLink"><p>{this.state.searchSize > 0 ? 'We were unable to find any results for your search.' : 'Enter symbol.'} </p></td></tr>

                            }
                          </tbody>
                        </table>
                      </div>

                    </div>

                  </div>
                </div>
                <div className="col-xl-6 f-r">




                  <div className="page-title-right toggleAccountDiv">
                    <ul className="navigationUl">
                      <li><Link to="/" className={this.props.navTextColorClass}>Home</Link></li>
                      <li><Link to="/gains" className={this.props.navTextColorClass}>Gains</Link></li>
                      <li><Link to="/history" className={this.props.navTextColorClass}>History</Link></li>
                    </ul>
                    <form className="form-inline" >
                      <div className="form-group m-r-65">
                        <div className="input-group">
                          {/* <label>Entity</label> */}
                          <select ref="ActiveAccountNumber" className={"form-control form-control-light toggle-color " + this.props.Cool} onChange={this.changeAccount.bind(this)} >
                            {isSendBox ? <option value={localStorage.getItem('ActiveAccountNumber')}> {localStorage.getItem('ActiveAccountNumber')}</option> :
                              <option value={this.props.currentaccount}> {this.props.currentaccount}</option>}

                            {!isSendBox && this.props.user && this.props.user.length > 0 ?
                              Object.keys(this.props.user).map((userAcc, i) => (
                                <option key={i} value={this.props.user[userAcc].account_number}> {this.props.user[userAcc].account_number}</option>
                              )) : ''}
                          </select>

                        </div>
                      </div>
                    </form>
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
    user: state.userReducer.userDetails,
    currentaccount: state.setAccountReducer.currentaccount,
    accountBalance: state.accountReducer.accountDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    setActiveAccount: (ActiveAccountNumber) => {
      dispatch(setActiveAccount(ActiveAccountNumber))
    },
    accountFatch: (auth, activeid) => {
      dispatch(accountFatch(auth, activeid))
    },
    accountOrderFatch: (currentAccountNumber) => {
      dispatch(accountOrderFatch(currentAccountNumber))
    },
    accountGainsFatch: (currentAccountNumber) => {
      dispatch(accountGainsFatch(currentAccountNumber))
    },
    accountPositionFatch: (currentAccountNumber) => {
      dispatch(accountPositionFatch(currentAccountNumber))
    },
    accountHistoryFatch: (currentAccountNumber) => {
      dispatch(accountHistoryFatch(currentAccountNumber))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountToggle);


