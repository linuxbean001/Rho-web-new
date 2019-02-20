import React , { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import BasicFunction from '../../../../controller/basicFunction';
import NewsModal from '../../../../modal/News';
const basicFunction = new BasicFunction;
const news = new NewsModal;
class News extends Component{
    constructor(props){
        super(props);
        this.state={
            newsArray:''
        }

    }
    componentDidMount(){
        news.NewsModal()
        .then(res=>{
            this.setState({newsArray:res});
         
        })
        .catch(err=>{

        })
    }
    render(){
        return(
            <div className="container-fluid">
               {this.state.newsArray && this.state.newsArray.data ?
               this.state.newsArray.data.map((nws,index)=>(
               <div className="newsSection" key={index}>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 b-c-g ">
                            {/* {nws.image && nws.image !=' ' ?
                           <center><img src={nws.image} className="img img-responsive" /></center> 
                            : ''} */}
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                           <div className="News-header-section">
                                <p className="news-topbar">{basicFunction.dateTimeAmPmOld(nws.datetime)} | {nws.source}</p>
                                <a href={nws.url} target="blank"><h3 className="news-heading" dangerouslySetInnerHTML={{__html: nws.headline}}></h3></a>
                                <a href={nws.url} target="blank"><p className="news-summary" dangerouslySetInnerHTML={{__html: nws.summary}}></p></a>

                                <p className="newsTag">Related: 
                                    <ul>
                                        {basicFunction.stringToArray(nws.related).map((tag,i)=>(
                                        basicFunction.checkIsUpparCashOrNot(tag)? <li key={i}><span> <Link className="newsTag" to={"/stocks/"+tag}>{tag}</Link> </span>  </li>:''
                                        ))}
                                    </ul>
                                </p>
                           </div>
                        </div>
                    </div>
               </div>
               ))
               : '' 
               }
            </div>
        )
    }
}

export default News;
