import React, { Component } from 'react';
import { connect } from 'react-redux';
import './homeCss.css';
import AccountStatus from '../../../element/accountStatus/accountStatus';
import RoundChart from '../../../element/roundChart/roundChart';
import AccountToggle from '../../../element/account_toggle';
import Positions from '../../../element/positions/positions';
import Orders from '../../../element/order/orders';
import Market from '../../../element/market/market';
import { userFatch } from '../../../../../controller/actions/userFatch';
import { setActiveAccount } from '../../../../../controller/actions/setActiveAccount';
import { positionsWithGainFatch } from '../../../../../controller/actions/positionsWithGainAcction';
import { accountGainsFatch } from '../../../../../controller/actions/gainsAction';
import { accountHistoryFatch } from '../../../../../controller/actions/historyAction';
import { accountOrderFatch } from '../../../../../controller/actions/orderAcction';
import { accountFatch } from '../../../../../controller/actions/accountAcction';
import { accountPositionFatch } from '../../../../../controller/actions/accountPositions';
import { getMarket } from '../../../../../controller/actions/market';
import { getMarketGain } from '../../../../../controller/actions/actionGainLoss';
import { getMarketLoss } from '../../../../../controller/actions/actionLoser';
import { refreshTimeInterval } from '../../../../../config';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ActiveAccountNumber: '',
      Authorization: localStorage.getItem("Authorization"),
      userAccount: '',
      orderForm: 0
    };
    this.timeInterval = this.timeInterval.bind(this);
  }

  componentWillMount() {
    this.props.userFatch();
  }

  componentDidMount() {
    this.props.userFatch();
    if (!localStorage.getItem("Authorization")) {
      this.props.history.replace('/login');
    }
    setInterval(this.timeInterval, refreshTimeInterval)
  }
  timeInterval() {
    if (this.props.currentaccount) {
      this.props.positionsWithGainFatch(this.props.currentaccount);
      this.props.accountOrderFatch(this.props.currentaccount);
      this.props.accountFatch(this.state.Authorization, this.props.currentaccount);
      this.props.getMarket();
      this.props.getMarketGain();
      this.props.getMarketLoss();
    }
  }
  orderRefresh(res) {
    this.props.accountOrderFatch(this.props.currentaccount);
    this.setState({ orderForm: res })
  }

  render() {


    if (this.props.user && this.props.user.length > 0) {
      if (this.props.currentaccount && this.props.currentaccount.length > 0) {
        //console.log('aready send ',this.props.currentaccount);
      } else {
        if (!localStorage.getItem('ActiveAccountNumber')) {
          localStorage.setItem('ActiveAccountNumber', this.props.user[0].account_number);
          this.props.setActiveAccount(this.props.user[0].account_number);
        } else {
          this.props.setActiveAccount(localStorage.getItem('ActiveAccountNumber'));
        }

      }

    } else {
      if (this.props.user.account_number) {
        if (!localStorage.getItem('ActiveAccountNumber')) {
          localStorage.setItem('ActiveAccountNumber', this.props.user.account_number);
          this.props.setActiveAccount(this.props.user.account_number);
        } else {
          this.props.setActiveAccount(localStorage.getItem('ActiveAccountNumber'));
        }
      }
    }

    //console.log('hello in',this.state.orderForm);

    return (
      <div>

        <div className="container p-l-r-5">

          <AccountToggle ActiveAccountNumber={this.state.ActiveAccountNumber} />

        </div>
        <div className="container p-65 middle-container">
          <div className="row">
            <div className="col-xl-6 pad-5">
              <div className="card card-topCahrtAccount" >
                <div className="card-body">
                  <RoundChart ActiveAccountNumber={this.state.ActiveAccountNumber} />
                </div>
              </div>
            </div>
            <div className="col-xl-6 pad-5 ">
              <div className="card card-topCahrtAccount" >
                <div className="card-body">
                  <AccountStatus ActiveAccountNumber={this.state.ActiveAccountNumber} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 pad-5">
              <div className="card">
                <div className="card-body m-t-10">
                  <ul className="nav nav-tabs nav-bordered mb-2">
                    <li className="nav-item">
                      <a href="#home-b1" data-toggle="tab" onClick={() => this.orderRefresh(0)} aria-expanded="false" className="nav-link active">
                        <i className="mdi mdi-call-missed d-lg-none d-block mr-1"></i>
                        <span className="d-none d-lg-block">Positions</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#profile-b1" data-toggle="tab" onClick={() => this.orderRefresh(1)} aria-expanded="true" className="nav-link">
                        <i className="mdi mdi-basket d-lg-none d-block mr-1"></i>
                        <span className="d-none d-lg-block">Orders</span>
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane show active" id="home-b1">
                      < Positions />
                    </div>
                    <div className="tab-pane" id="profile-b1">
                      {this.state.orderForm && this.state.orderForm === 1 ? < Orders /> : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 pad-5">
              < Market />
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
    accountBalance: state.accountReducer.accountDetails,
    accountPosition: state.accountPositionReducer.accountPositionDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userFatch: () => {
      dispatch(userFatch())
    },
    setActiveAccount: (ActiveAccountNumber) => {
      dispatch(setActiveAccount(ActiveAccountNumber))
    },
    positionsWithGainFatch: (currentAccountNumber) => {
      dispatch(positionsWithGainFatch(currentAccountNumber))
    },
    accountGainsFatch: (currentAccountNumber) => {
      dispatch(accountGainsFatch(currentAccountNumber))
    },
    accountHistoryFatch: (currentAccountNumber) => {
      dispatch(accountHistoryFatch(currentAccountNumber))
    },
    accountOrderFatch: (currentAccountNumber) => {
      dispatch(accountOrderFatch(currentAccountNumber));
    },
    accountFatch: (auth, activeid) => {
      dispatch(accountFatch(auth, activeid))
    },
    accountPositionFatch: (currentAccountNumber) => {
      dispatch(accountPositionFatch(currentAccountNumber))
    },
    getMarket: () => {
      dispatch(getMarket('DIA,SPY,QQQ,IWM'))
    },
    getMarketGain: () => {
      dispatch(getMarketGain())
    },
    getMarketLoss: () => {
      dispatch(getMarketLoss())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

