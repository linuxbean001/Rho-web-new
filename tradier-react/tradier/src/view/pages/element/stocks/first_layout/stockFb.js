import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicFunction from '../../../../../controller/basicFunction';
import './stockFb.css';
import MarketData from '../../../../../modal/marketData/marketData';
import ReactApexChart from 'react-apexcharts';
import Watchlists from '../../../../../modal/watchlists/watchlists';
const basicFunction = new BasicFunction;
const marketData = new MarketData;
const watchList = new Watchlists;
class StockFb extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getDataActiveBtn: 1,
            optionSeries: '',
            graphMaxValue: 0,
            graphMinValue: 0,
            followStatus: 'Follow',
            localSymbol: '',

            options: {
                xaxis: {
                    type: 'category',
                    categories: [],
                    labels: {
                        show: false,
                        hideOverlappingLabels: false,
                        trim: false,
                        style: {
                            colors: [],
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            cssClass: 'apexcharts-xaxis-label',
                        },
                        offsetX: 0,
                        offsetY: 0,
                        format: undefined,
                        formatter: undefined,
                        datetimeFormatter: {
                            month: "MMM 'yy",
                            day: 'dd MMM',
                            hour: 'HH:mm',
                        },
                    },
                    axisBorder: {
                        show: false,
                        color: '#78909C',
                        height: 1,
                        width: '100%',
                        offsetX: 0,
                        offsetY: 0
                    },
                    axisTicks: {
                        show: false,
                        borderType: 'solid',
                        color: '#78909C',
                        height: 6,
                        offsetX: 0,
                        offsetY: 0
                    },
                    tickAmount: undefined,
                    tickPlacement: 'between',
                    min: undefined,
                    max: undefined,
                    range: undefined,
                    floating: false,
                    position: 'bottom',
                    title: {
                        text: undefined,
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: undefined,
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            cssClass: 'apexcharts-xaxis-title',
                        },
                    },
                    crosshairs: {
                        show: true,
                        width: 1,
                        position: 'back',
                        opacity: 0.9,
                        stroke: {
                            color: '#b6b6b6',
                            width: 0,
                            dashArray: 0,
                        },
                        fill: {
                            type: 'solid',
                            color: '#B1B9C4',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            },
                        },
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 1,
                            opacity: 0.4,
                        },
                    },
                    tooltip: {
                        enabled: true,
                        formatter: undefined,
                        offsetY: 0,
                    },
                },

                yaxis: {
                    tooltip: {
                        enabled: true
                    },
                    labels: {
                        show: false,
                        hideOverlappingLabels: false,
                        trim: false,
                        style: {
                            colors: [],
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            cssClass: 'apexcharts-xaxis-label',
                        },
                        offsetX: 0,
                        offsetY: 0,
                        format: undefined,
                        formatter: undefined,
                    },
                    axisBorder: {
                        show: false,
                        color: '#78909C',
                        height: 1,
                        width: '100%',
                        offsetX: 0,
                        offsetY: 0
                    }
                },

                grid: {
                    show: true,
                    borderColor: '#90A4AE',
                    strokeDashArray: 0,
                    position: 'back',
                    xaxis: {
                        lines: {
                            show: false,
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    yaxis: {
                        lines: {
                            show: false,
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    row: {
                        colors: undefined,
                        opacity: 0.5
                    },
                    column: {
                        colors: undefined,
                        opacity: 0.5
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 10
                    },
                }
            },


        }
        this.follow = this.follow.bind(this);
        this.followAndFollowing = this.followAndFollowing.bind(this);
        this.getGraphData = this.getGraphData.bind(this);
        this.follow();
    }

    componentDidMount() {
        this.getGraphData(1);
        setInterval(this.get, 30000)
    }
    componentWillReceiveProps(props) {
        this.follow();
        if (this.state.localSymbol != this.props.pageSymbol) {
            this.state.localSymbol = this.props.pageSymbol;
            this.getGraphData(this.state.getDataActiveBtn);
        }
    }


    getGraphData(btnActive) {
        this.state.localSymbol = this.props.pageSymbol;
        console.log('ggg', this.props.pageSymbol);
        var timeStringStart = '';
        var timeStringEnd = '';
        var timeInterval = '';
        var functionnameis = marketData.timesales;
        this.setState({ getDataActiveBtn: btnActive });
        switch (btnActive) {
            case 1:
                var CurentDate = basicFunction.currentDate();
                var startDateis = basicFunction.currentDate();
                timeStringStart = startDateis + ' 8:00';
                timeStringEnd = CurentDate + ' 19:59';
                timeInterval = '5min';
                functionnameis = marketData.timesales;
                break;
            case 2:
                var CurentDate = basicFunction.currentDateBeforeDay(5);
                timeStringStart = CurentDate + ' 00:00';
                timeStringEnd = basicFunction.currentDate() + ' 24:00';
                timeInterval = '15min';
                functionnameis = marketData.timesales;

                break;
            case 3:
                var CurentDate = basicFunction.currentDateBeforeMonth(1);
                timeStringStart = CurentDate + ' 00:00';
                timeStringEnd = basicFunction.currentDate() + ' 24:00';
                timeInterval = 'daily';
                functionnameis = marketData.history;
                break;
            case 4:
                var CurentDate = basicFunction.currentDateBeforeMonth(3);
                timeStringStart = CurentDate + ' 00:00';
                timeStringEnd = basicFunction.currentDate() + ' 24:00';
                timeInterval = 'daily';
                functionnameis = marketData.history;
                break;
            case 5:
                var CurentDate = basicFunction.currentDateBeforeMonth(6);
                timeStringStart = CurentDate + ' 00:00';
                timeStringEnd = basicFunction.currentDate() + ' 24:00';
                timeInterval = 'daily';
                functionnameis = marketData.history;

                break;
            case 6:
                var CurentDate = basicFunction.currentDateBeforeYear(1);
                timeStringStart = CurentDate + ' 00:00';
                timeStringEnd = basicFunction.currentDate() + ' 24:00';
                timeInterval = 'weekly';
                functionnameis = marketData.history;
                break;
            case 7:
                var CurentDate = basicFunction.currentDateBeforeYear(2);
                timeStringStart = CurentDate + ' 00:00';
                timeStringEnd = basicFunction.currentDate() + ' 24:00';
                timeInterval = 'weekly';
                functionnameis = marketData.history;
                break;

            default:
                timeStringStart = '';
                timeStringEnd = '';
                timeInterval = '';
                functionnameis = marketData.timesales;
        }
        var getSmallAndLargeArray = [];
        functionnameis(localStorage.getItem("Authorization"), this.props.pageSymbol, timeInterval, timeStringStart, timeStringEnd)
            .then(res => {
                if (res.data.message === 'success') {
                    const series = JSON.parse(res.data.data);

                    var dataoptionData = [];

                    this.setState({ optionSeries: '' });
                    console.log('series XXXX', series);

                    if (btnActive === 1 || btnActive === 2 || btnActive === -3) {
                        series.series.data.map((ser, i) => {
                            var singleOptionData = {
                                x: basicFunction.dateTimeAmPmOld(ser.time),
                                y: [ser.close, ser.high, ser.low, ser.open]
                            }
                            getSmallAndLargeArray.push(ser.close);
                            dataoptionData.push(singleOptionData);
                        })
                    } else {
                        series.history.day.map((ser, i) => {
                            var singleOptionData = {
                                x: basicFunction.dateTimeInMonthName(ser.date),
                                y: [ser.close, ser.high, ser.low, ser.open]
                            }
                            getSmallAndLargeArray.push(ser.close);
                            dataoptionData.push(singleOptionData);
                        })
                    }

                    this.setState({ optionSeries: dataoptionData });
                    const min = Math.min(...getSmallAndLargeArray);
                    const max = Math.max(...getSmallAndLargeArray);
                    this.setState({ graphMinValue: min });
                    this.setState({ graphMaxValue: max });

                }
            })
            .catch(err => {
                //console.log('error xxxxxxxxxxxxxxxxx',err);
            })
    }

    follow() {
        this.state.followStatus = 'Follow';
        if (this.props.watchList && this.props.watchList.quotes && this.props.watchList.quotes.quote) {
            this.props.watchList.quotes.quote.map((watch, index) => {
                if (this.props.pageSymbol) {
                    if (watch.symbol == this.props.pageSymbol) {
                        this.setState({ followStatus: 'Following' });
                        this.state.followStatus = 'Following';
                    }
                }

            });
        }
        //watchList.watchlistsAddSymbols(localStorage.getItem("Authorization"),'default',this.props.symbol)
        // .then(res=>{
        //  console.log('follow',res);
        //  })
        //  .catch(err=>{

        //  })
    }

    followAndFollowing() {
        if (this.state.followStatus === 'Follow' && this.props.pageSymbol) {
            watchList.watchlistsAddSymbols(localStorage.getItem("Authorization"), 'default', this.props.pageSymbol)
                .then(res => {
                    console.log('following', res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            watchList.watchlistsRemoveSymbols(localStorage.getItem("Authorization"), 'default', this.props.pageSymbol)
                .then(res => {
                    console.log('unfollow', res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    render() {
        var graphData = '';
        if (this.state.optionSeries) {
            graphData = [];
            graphData.push({ 'data': this.state.optionSeries })
        }
        return (
            <div className="pad-5">
                <div className="card black-background card-border">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <div style={{ float: "left" }}><h4 className=" f-28 header-title-left text-color">{this.props.pageSymbol ? this.props.pageSymbol : ''} <span className="f-13">{this.props.quoteData.quotes.quote.description}</span></h4></div>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <div style={{ float: "right" }}><button type="button" className={this.state.followStatus === "Follow" ? "btn btn-warning btn-follow header-title-right" : "btn btn-warning btn-following header-title-right"} onClick={this.followAndFollowing}>{this.state.followStatus}</button></div>
                            </div>
                        </div>
                        <div className="table-responsive-sm">
                            <h4 className="header-title f-28 title-color">{this.props.quoteData.quotes.quote.last ? '$' + this.props.quoteData.quotes.quote.last : '$0.00'} <span className='f-24' >{this.props.quoteData.quotes.quote.change ? basicFunction.nombarFormat(this.props.quoteData.quotes.quote.change) : '0.0'}({this.props.quoteData.quotes.quote.change_percentage ? basicFunction.nombarFormat(this.props.quoteData.quotes.quote.change_percentage) : '0.0'}%)</span></h4>
                            <div className="graph-fb">
                                {graphData.length > 0 ? <ReactApexChart options={this.state.options} series={graphData} type="candlestick" height="350" /> : <p className="title-color t-a-l p-l-20">No chart data available.</p>}

                            </div>

                            <ul className="option-stock-day-ul clearfix">
                                <li><button className={this.state.getDataActiveBtn === 1 ? "btn btn-link-fb c-b-f-b title-color underline" : "btn btn-link-fb c-b-f-b title-color"} onClick={() => this.getGraphData(1)}>1D</button></li>
                                <li><button className={this.state.getDataActiveBtn === 2 ? "btn btn-link-fb c-b-f-b title-color underline" : "btn btn-link-fb c-b-f-b title-color"} onClick={() => this.getGraphData(2)}>5D</button></li>
                                <li><button className={this.state.getDataActiveBtn === 3 ? "btn btn-link-fb c-b-f-b title-color underline" : "btn btn-link-fb c-b-f-b title-color"} onClick={() => this.getGraphData(3)}>1M</button></li>
                                <li><button className={this.state.getDataActiveBtn === 4 ? "btn btn-link-fb c-b-f-b title-color underline" : "btn btn-link-fb c-b-f-b title-color"} onClick={() => this.getGraphData(4)}>3M</button></li>
                                <li><button className={this.state.getDataActiveBtn === 5 ? "btn btn-link-fb c-b-f-b title-color underline" : "btn btn-link-fb c-b-f-b title-color"} onClick={() => this.getGraphData(5)}>6M</button></li>
                                <li><button className={this.state.getDataActiveBtn === 6 ? "btn btn-link-fb c-b-f-b title-color underline" : "btn btn-link-fb c-b-f-b title-color"} onClick={() => this.getGraphData(6)}>1Y</button></li>
                                <li><button className={this.state.getDataActiveBtn === 7 ? "btn btn-link-fb c-b-f-b title-color underline" : "btn btn-link-fb c-b-f-b title-color"} onClick={() => this.getGraphData(7)}>2Y</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        watchList: state.watchlistReducer.watchlistDetails,

    }
}

export default connect(mapStateToProps)(StockFb);