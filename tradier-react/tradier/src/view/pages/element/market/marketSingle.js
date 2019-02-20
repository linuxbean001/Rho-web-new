import React , { Component } from 'react';
import {connect} from 'react-redux';
import { XAxis, YAxis, Tooltip ,AreaChart,Area} from 'recharts';
import BasicFunction from '../../../../controller/basicFunction';
import MarketData from '../../../../modal/marketData/marketData';
import { Link } from 'react-router-dom';
const basicFunction = new BasicFunction;
const marketData = new MarketData;
class MarketSingle extends Component{
   constructor(props){
       super(props);
        this.state={
            optionSeries:'',
            graphMinValue:0,
            graphMaxValue:0,
            window_width:window.innerWidth,
            graphSize:300
        }
    }
   componentDidMount(){
     this.setState({window_width:window.innerWidth});
     var graphWidthOption=basicFunction.graphWidthEquaty(window.innerWidth,'col3');
    // console.log('graphWidthOption',graphWidthOption);
     this.setState({graphSize:graphWidthOption});
     const symbol=this.props.singleMarketData.symbol;
     var CurentDate=basicFunction.currentDate();
     var startDateis=basicFunction.currentDate();
     var timeStringStart=startDateis +' 8:00';
     var timeStringEnd=CurentDate +' 19:59';
     var timeInterval='1min';
     var getSmallAndLargeArray=[];
     marketData.timesales(localStorage.getItem("Authorization"),symbol,timeInterval,timeStringStart,timeStringEnd)
     .then(res=>{

        if(res.data.message==='success'){
            const series = JSON.parse(res.data.data);
            var dataoptionData=[];
            series.series.data.map((ser,i)=>{
                    var singleOptionData={
                        name:basicFunction.timeConverter(ser.timestamp),
                        Price:ser.close
                    }
                    getSmallAndLargeArray.push(ser.close);
                    dataoptionData.push(singleOptionData);
                    })
           this.setState({optionSeries:dataoptionData});
           const min = Math.min(...getSmallAndLargeArray);
           const max = Math.max(...getSmallAndLargeArray);
           this.setState({graphMinValue:min});
           this.setState({graphMaxValue:max});
          // console.log(,dataoptionData);
           
        }
        
     })
     .catch(err=>{
       // console.log('err',err);
     })
     
   }
   render(){
  
       return(
           <div className="col-md-6 col-lg-3 col-sm-6 col-xs-12">
                     <div className="row pad-15" >
                    <h3 className="market-heading"><Link to={'/stocks/'+this.props.singleMarketData.symbol}>{this.props.singleMarketData.symbol}</Link></h3>
                    
                    <p className="market-subheading-price">{basicFunction.currancyAddWithNumber(this.props.singleMarketData.last)}</p>
                    <p className="market-subheading-range"><span className={basicFunction.priceColor(this.props.singleMarketData.change)}>{basicFunction.nombarFormat(this.props.singleMarketData.change)} ({basicFunction.nombarFormat(this.props.singleMarketData.change_percentage)}%)</span> </p>
                    </div>
                    <div className="row marketchart" >
                    <AreaChart width={this.state.graphSize} height={150} data={this.state.optionSeries} margin={{ left: 0,top:10 }}>
                                    <XAxis dataKey="name"/>
                                    <YAxis type="number" domain={[this.state.graphMinValue,this.state.graphMaxValue]} />
                                    
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="Price" stroke={basicFunction.graphColorPostion(this.props.singleMarketData.change)} fill={basicFunction.graphColorFillPostion(this.props.singleMarketData.change)} />
                    </AreaChart> 
                    </div>
           </div>
          
       )
   }
}
export default MarketSingle;