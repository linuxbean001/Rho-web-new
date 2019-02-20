import React, { Component } from 'react';
import './dashboardCss.css';
import {connect} from 'react-redux';
import Header from '../../../element/header/header';
import Watchlist from '../../../element/watchlist/watchlist';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../home/home';
import Stocks from '../stocks/stocks';
import History from '../history/history';
import Gain from '../gain/gain';
import {watchlistsFatch} from '../../../../../controller/actions/watchlistAction';
import {userFatch} from '../../../../../controller/actions/userFatch'
import {refreshTimeInterval} from '../../../../../config';
import BasicFunction from '../../../../../controller/basicFunction'
const basicFunction = new BasicFunction;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.timeInterval = this.timeInterval.bind(this);
  }
  componentDidMount(){
    if(!localStorage.getItem("Authorization")){
      this.props.history.replace('/login');
     }
     setInterval(this.timeInterval,refreshTimeInterval)
    
     this.props.userFatch();
  }
  timeInterval() {
    this.props.watchlistsFatch();
    //console.log('calling');
  }
   
  render() {
  
    return (
      <div className="wrapper">
        {/* <Header /> */}
           <div className="container-fluid">
           <Router>
             <div className={"row " + basicFunction.bodyColor()}>
             

                 <div className="col-md-3 col-sm-12 col-lg-2 col-xs-12 sidebar watch-list-border-color" >
                  <Watchlist />
                 </div>
                 <div className="col-md-12 col-sm-12   col-lg-12 col-xs-12 pad-5 mainDiv" >
                   
                      <Switch>
                          <Route exact path='/' component={Home} />
                          <Route  path='/history' component={History} />
                          <Route  path='/gains' component={Gain} />
                          <Route  path='/stocks/:id' render={({ match })=>(
                            <Stocks symbol={match.params.id}/>
                          )} />
                      </Switch>
                   
                 </div>
                
             </div>
             </Router> 
           </div>
        {/* <Footer /> */}
      </div>
    );
  } 
}


const mapStateToProps = (state) => {
  return {
    watchlist:state.watchlistReducer.watchlistDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    watchlistsFatch:()=>{
       dispatch(watchlistsFatch())
    },
    userFatch:()=>{
      dispatch(userFatch())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
