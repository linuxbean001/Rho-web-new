import React, { Component } from 'react';
import './watchlistCss.css';
import {connect} from 'react-redux';
import {watchlistsFatch} from '../../../../controller/actions/watchlistAction';
import BasicFunction from '../../../../controller/basicFunction';
import Watchlists from '../../../../modal/watchlists/watchlists';
import { Link , Navlink} from 'react-router-dom';
import { Redirect } from 'react-router'
const basicFunction = new BasicFunction;
const watchlists= new Watchlists;
class Watchlist extends Component {
    componentDidMount(){
      this.props.watchlistsFatch(localStorage.getItem('Authorization'));
     }
     
 render() {
    // console.log('xxxxxxxxxxxxxxx',this.props.watchList);
 return (
        <div className="">
              <div className="slimscroll" style={{'width': '8px' , 'height': '100%',  'top': '0px',  'borderRadius': '7px', 'zIndex': '90', 'right': '1px'}}>
            <div className="row">
            <img src="../images/l2.png"  className="logoimage" />
            </div>
          
              <div className="table-responsive-sm" >
                <h4 className="header-title t-a-l watchlist-heading">WATCHLIST</h4>
                <table className="table table-sm table-centered mb-0 table-watch" style={{'marginTop':'1.5em'}}>
                    <tbody>
                        {this.props.watchList && this.props.watchList.quotes && this.props.watchList.quotes.quote ?
                         this.props.watchList.quotes.quote.map((watch,index)=>(
                            <tr key={index}>
                                <td className="watchSymbol c-w f-15" >
                                    <Link to={"/stocks/"+watch.symbol} className="f-15 c-w" >{basicFunction.optionNameSplit(watch.symbol)} </Link>
                                </td>
                                <td className={"watchParchantage f-15 "}>
                                    <Link to={"/stocks/"+watch.symbol} className={basicFunction.priceColor(watch.change)} >         {basicFunction.nombarFormat(watch.change_percentage)}% 
                                    </Link>
                                </td>
                                <td className="watchValue c-w f-15">
                                    <Link to={"/stocks/"+watch.symbol} className="f-15 c-w" >
                                      {basicFunction.currancyAddWithNumber(watch.last)}
                                    </Link>
                                </td>
                            </tr>
                            
                         ))
                         :''
                        }
                        
                        
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
  } 
}


const mapStateToProps = (state) => {
    return {
       watchList:state.watchlistReducer.watchlistDetails,
      
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        watchlistsFatch:()=>{
        dispatch(watchlistsFatch())
      },
      
    }
  }
  export default connect(mapStateToProps ,mapDispatchToProps)(Watchlist);


