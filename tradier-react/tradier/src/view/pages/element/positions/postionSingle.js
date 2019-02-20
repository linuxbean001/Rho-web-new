import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicFunction from '../../../../controller/basicFunction';
import MarketData from '../../../../modal/marketData/marketData';
import Trading from '../../../../modal/trading/trading';
import { Link, Navlink } from 'react-router-dom';
import { accountOrderFatch } from '../../../../controller/actions/orderAcction';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { refreshTimeInterval } from '../../../../config';
const marketData = new MarketData;
const trading = new Trading;
const basicFunction = new BasicFunction;
class PostionSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount: '',
            gainState: '',
            optionSeries: [],
            graphSotckActiveBtn: 1,
            graphMaxValue: 0,
            graphMinValue: 0,
            actionType: 'buy',
            actionType2: 'open',
            formSymbol: '',
            stopPrice_hide_show: 0,
            limitPrice_hide_show: 0,
            orderFormErrorArray: 0,
            orderFormErrorListArray: '',
            orderFormErrorListArrayRes: '',
            orderPrviewResponse: '',
            formAndPreviewList: 0,
            previewResData: '',
            orderSuccess: 0,
            orderSuccessMessage: '',
            btnClass: 'buy',
            btnClass2: 'open',
            window_width: window.innerWidth,
            graphWidthequity: 0,
            graphWidthOption: 0,
            stringErrorMessasge: '',
            formBackResponseData: '',


        };
        this.changeWidthResponsiveTable = this.changeWidthResponsiveTable.bind(this);
    }
    componentWillMount() {
        this.setState({ window_width: window.innerWidth });
        this.changeWidthResponsiveTable(window.innerWidth);
    }
    backOrder(previewResData) {
        var side = basicFunction.sideToOrderbuySellOpenClose(previewResData.side);
        var type = previewResData.type;
        var timeinforce = previewResData.duration;
        var share = previewResData.quantity;
        var price = '';
        var stock = '';
        var btnClass = side.buySell;
        var btnClass2 = side.openClose;
        //formBackResponseData
        switch (type) {
            case 'market':
                this.setState({ stopPrice_hide_show: 0 });
                this.setState({ limitPrice_hide_show: 0 });
                break;
            case 'limit':
                this.setState({ stopPrice_hide_show: 0 });
                this.setState({ limitPrice_hide_show: 1 });
                price = previewResData.price;
                break;
            case 'stop':
                this.setState({ stopPrice_hide_show: 1 });
                this.setState({ limitPrice_hide_show: 0 });
                stock = previewResData.stop;
                break;
            case 'stop_limit':
                this.setState({ stopPrice_hide_show: 1 });
                this.setState({ limitPrice_hide_show: 1 });
                price = previewResData.price;
                stock = previewResData.stop;
                break;
            default:
                this.setState({ stopPrice_hide_show: 0 });
                this.setState({ limitPrice_hide_show: 0 });
                break;
        }
        const formBackResponseData = {
            type: type,
            price: price,
            stock: stock,
            share: share,
            timeinforce: timeinforce
        }
        this.setState({ formBackResponseData });
        this.setState({ btnClass });
        this.setState({ btnClass2 });
        this.setState({ actionType: btnClass });
        this.setState({ actionType2: btnClass2 });
        this.setState({ formAndPreviewList: 0 });

        // console.log('formBackResponseData',formBackResponseData);


    }
    changeWidthResponsiveTable(widthGraph) {
        var graphWidthEquaty = basicFunction.graphWidthEquaty(window.innerWidth, 'big');
        var graphWidthOption = basicFunction.graphWidthEquaty(widthGraph, 'small');
        this.setState({ graphWidthequity: graphWidthEquaty });
        this.setState({ graphWidthOption: graphWidthOption });
        // console.log('width is',graphWidthEquaty);
    }
    changeActionTypeForm(actionType) {
        this.setState({ actionType: actionType });
        if (actionType === 'sell') {
            this.setState({ btnClass: 'sell' });
        } else {
            this.setState({ btnClass: 'buy' });
        }
    }
    changeActionTypeForm2(actionType2) {
        this.setState({ actionType2: actionType2 });
        if (actionType2 === 'close') {
            this.setState({ btnClass2: 'close' });
        } else {
            this.setState({ btnClass2: 'open' });
        }
    }
    changePriceLimitHideShowOnSelectType(typeSelectid) {
        var typeName = document.getElementById(typeSelectid).value;
        switch (typeName) {
            case 'market':
                this.setState({ stopPrice_hide_show: 0 });
                this.setState({ limitPrice_hide_show: 0 });
                break;
            case 'limit':
                this.setState({ stopPrice_hide_show: 0 });
                this.setState({ limitPrice_hide_show: 1 });
                break;
            case 'stop':
                this.setState({ stopPrice_hide_show: 1 });
                this.setState({ limitPrice_hide_show: 0 });
                break;
            case 'stop_limit':
                this.setState({ stopPrice_hide_show: 1 });
                this.setState({ limitPrice_hide_show: 1 });
                break;
            default:
                this.setState({ stopPrice_hide_show: 0 });
                this.setState({ limitPrice_hide_show: 0 });
                break;
        }
    }
    handleSubmit(form_id, option, symbol) {
        var formOrderShare = 'formOrderShare' + form_id;
        var formOrderType = 'formOrderType' + form_id;
        var formOrderStopPrice = 'formOrderStopPrice' + form_id;
        var formOrderLimitPrice = 'formOrderLimitPrice' + form_id;
        var formOrderTimeInForce = 'formOrderTimeInForce' + form_id;
        formOrderShare = document.getElementById(formOrderShare).value;
        formOrderType = document.getElementById(formOrderType).value;
        var error = new Object();
        if (formOrderType == 0) {
            error['formOrderType'] = 'Order type is required';
        } else {
            if (error['formOrderType']) {
                delete error["formOrderType"];
            }
        }
        if (formOrderShare > 0) {
            if (error['formOrderShare']) {
                delete error["formOrderShare"];
            }
        } else {
            error['formOrderShare'] = 'Order quantity is required';
        }
        switch (formOrderType) {
            case 'market':

                break;
            case 'limit':
                formOrderLimitPrice = document.getElementById(formOrderLimitPrice).value;
                if (formOrderLimitPrice > 0) {
                    if (error['formOrderLimitPrice']) {
                        delete error["formOrderLimitPrice"];
                    }
                } else {
                    error['formOrderLimitPrice'] = 'Limit price is required';
                }
                if (error['formOrderStopPrice']) {
                    delete error["formOrderStopPrice"];
                }

                break;
            case 'stop':
                formOrderStopPrice = document.getElementById(formOrderStopPrice).value;
                if (formOrderStopPrice > 0) {
                    if (error['formOrderStopPrice']) {
                        delete error["formOrderStopPrice"];
                    }
                } else {
                    error['formOrderStopPrice'] = 'Stop price is required';
                }
                if (error['formOrderLimitPrice']) {
                    delete error["formOrderLimitPrice"];
                }
                break;
            case 'stop_limit':
                formOrderStopPrice = document.getElementById(formOrderStopPrice).value;
                formOrderLimitPrice = document.getElementById(formOrderLimitPrice).value;
                if (formOrderStopPrice > 0) {
                    if (error['formOrderStopPrice']) {
                        delete error["formOrderStopPrice"];
                    }
                } else {
                    error['formOrderStopPrice'] = 'Stop price is required';
                }
                if (formOrderLimitPrice > 0) {
                    if (error['formOrderLimitPrice']) {
                        delete error["formOrderLimitPrice"];
                    }
                } else {
                    error['formOrderLimitPrice'] = 'Limit price is required';
                }
                break;
        }
        formOrderTimeInForce = document.getElementById(formOrderTimeInForce).value;
        if (formOrderTimeInForce == 0) {
            error['formOrderTimeInForce'] = 'Time in force is required';
        } else {
            if (error['formOrderTimeInForce']) {
                delete error["formOrderTimeInForce"];
            }
        }
        if (this.state.actionType != '') {
            if (error['side']) {
                delete error["side"];
            }
        } else {
            error['side'] = 'You have a need to select any one Buy and Sell';
        }
        if (this.state.actionType2 != '') {
            if (error['openClsoe']) {
                delete error["openClsoe"];
            }
        } else {
            error['openClsoe'] = 'You have a need to select any one Open and Close';
        }
        this.setState({ orderFormErrorListArray: error });

        if (Object.keys(error).length > 0) {
            this.setState({ orderFormErrorArray: 1 });
        } else {
            this.setState({ orderFormErrorArray: 0 });
            var getSideData = basicFunction.orderSideSelectionFunction(this.state.actionType, this.state.actionType2, option);
            // console.log('getSideData',getSideData);
            var formdata = {
                Type: formOrderType,
                Quantity: formOrderShare,
                StopPrice: formOrderStopPrice,
                LimitPrice: formOrderLimitPrice,
                Duration: formOrderTimeInForce,
                Class: option,
                Symbol: symbol,
                Side: getSideData
            }
            //console.log('form data',formdata);
            trading.previewOrder(localStorage.getItem("Authorization"), localStorage.getItem("ActiveAccountNumber"), formdata)
                .then(res => {

                    if (res.data.message === 'success') {

                        this.setState({ orderFormErrorArray: 1 })
                        this.setState({ formAndPreviewList: 0 });
                        this.setState({ stringErrorMessasge: res.data.data });
                        const data = JSON.parse(res.data.data);
                        this.setState({ orderFormErrorArray: 0 })
                        this.setState({ formAndPreviewList: 0 });
                        this.setState({ stringErrorMessasge: '' });
                        if (data.errors) {
                            this.setState({ orderFormErrorArray: 1 })
                            this.setState({ formAndPreviewList: 0 });
                            this.setState({ orderFormErrorListArrayRes: data.errors });
                            console.log('submit data ', data.order);
                        }
                        if (data.order) {
                            this.setState({ formAndPreviewList: 1 });
                            this.setState({ previewResData: data.order });
                            console.log('submit err', data.order);
                        }




                    } else {
                        console.log('submit data 2', res.data);
                    }


                })
                .catch(err => {
                    //   console.log('error xxxxxxxxxxxxxxxxx',err);
                })

        }
    }
    createOrder(option, formdata) {
        //console.log('formdasta=',formdata);
        if (formdata.status === 'ok') {
            var price = '';
            var stop = '';
            if (formdata.price) {
                price = formdata.price;
            }
            if (formdata.stop) {
                stop = formdata.stop;
            }
            var formdata = {
                Type: formdata.type,
                Quantity: formdata.quantity,
                StopPrice: stop,
                LimitPrice: price,
                Duration: formdata.duration,
                Class: formdata.class,
                Symbol: formdata.symbol,
                Side: formdata.side
            }
            trading.createOrder(localStorage.getItem("Authorization"), localStorage.getItem("ActiveAccountNumber"), formdata)
                .then(res => {
                    if (res.data.message === 'success') {
                        const data = JSON.parse(res.data.data);
                        if (data.order.status === 'ok') {
                            this.setState({ orderSuccess: 1 });
                            this.setState({ orderSuccessMessage: 'Your order has been placed' });
                        } else {
                            this.setState({ orderSuccess: 2 });
                            this.setState({ orderSuccessMessage: 'Thare are some error to place your order please try again' });
                        }
                    }

                })
                .catch(err => {
                    //console.log('error xxxxxxxxxxxxxxxxx',err);
                })
            // this.props.accountOrderFatch(this.props.currentaccount);

            //*************************************** */
        }


    }
    hideErrorMessage() {
        this.setState({ orderFormErrorArray: 0 });
        this.setState({ orderSuccess: 0 });
        this.setState({ formAndPreviewList: 0 });
    }
    transferToParentSinglePosition(position, gain, equityValue, findGain) {
        const data = {
            position: position,
            gain: gain,
            equityValue: equityValue,
            findGain: findGain,

        }
        this.props.onchangeSinglePosition(data);
    }

    optionSetintervalFatchData(sybmol, type, btnActive) {
        var getSmallAndLargeArray = [];
        marketData.timesales(localStorage.getItem("Authorization"), sybmol, '5min', basicFunction.currentDateBeforeDay(1) + ' 00:00', basicFunction.currentDate() + ' 24:00')
            .then(res => {
                if (res.data.message === 'success') {
                    const series = JSON.parse(res.data.data);
                    var dataoptionData = [];
                    series.series.data.map((ser, i) => {
                        var singleOptionData = {
                            name: basicFunction.timeConverter(ser.timestamp),
                            Price: basicFunction.nombarFormat(ser.price)
                        }
                        getSmallAndLargeArray.push(ser.price);
                        dataoptionData.push(singleOptionData);
                    })
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
    stockSetintervalFatchData(sybmol, timeInterval, timeStringStart, timeStringEnd, btnActive, functionnameis) {
        var getSmallAndLargeArray = [];
        functionnameis(localStorage.getItem("Authorization"), sybmol, timeInterval, timeStringStart, timeStringEnd)
            .then(res => {
                if (res.data.message === 'success') {
                    const series = JSON.parse(res.data.data);
                    console.log('helloxxxxxxxx', series);

                    var dataoptionData = [];

                    this.setState({ optionSeries: '' });


                    if (btnActive === 1 || btnActive === 2) {
                        series.series.data.map((ser, i) => {
                            var singleOptionData = {
                                name: basicFunction.timeConverter(ser.timestamp),
                                Price: ser.close
                            }
                            getSmallAndLargeArray.push(ser.close);
                            dataoptionData.push(singleOptionData);
                        })
                    } else {
                        series.history.day.map((ser, i) => {
                            var singleOptionData = {
                                name: basicFunction.dateFun2(ser.date),
                                Price: ser.open
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
    graphData(sybmol, type, btnActive) {
        this.setState({ graphSotckActiveBtn: btnActive });
        if (type == "option") {
            setInterval(this.optionSetintervalFatchData(sybmol, type, btnActive), refreshTimeInterval);
        }
        else {

            var timeStringStart = '';
            var timeStringEnd = ''; 
            var timeInterval = '';
            var functionnameis = marketData.timesales;
            switch (btnActive) {
                case 1:
                    var CurentDate = basicFunction.currentDate();
                    var startDateis = basicFunction.currentDate();
                    timeStringStart = startDateis + ' 8:00';
                    timeStringEnd = CurentDate + ' 19:59';
                    timeInterval = '5min';
                    functionnameis = marketData.timesales;
                    console.log('date', timeStringStart + '-' + timeStringEnd);
                    break;
                case 2:
                    var CurentDate = basicFunction.currentDateBeforeDay(5);
                    timeStringStart = CurentDate + ' 00:00';
                    timeStringEnd = basicFunction.currentDate() + ' 24:00';
                    timeInterval = '15min';
                    functionnameis = marketData.timesales;
                    console.log('date', timeStringStart + '-' + timeStringEnd);
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
                    timeInterval = 'daily';
                    functionnameis = marketData.history;
                    break;
                case 7:
                    var CurentDate = basicFunction.currentDateBeforeYear(2);
                    timeStringStart = CurentDate + ' 00:00';
                    timeStringEnd = basicFunction.currentDate() + ' 24:00';
                    timeInterval = 'daily';
                    functionnameis = marketData.history;
                    break;

                default:
                    timeStringStart = '';
                    timeStringEnd = '';
                    timeInterval = '';
                    functionnameis = marketData.timesales;
            }
            setInterval(this.stockSetintervalFatchData(sybmol, timeInterval, timeStringStart, timeStringEnd, btnActive, functionnameis), refreshTimeInterval);

        }
    }

    render() {

        var total_cash = 0;
        if (this.props.accountBalance && this.props.accountBalance.total_cash) {
            total_cash = this.props.accountBalance.total_cash;
        }
        var stock_long_value = 0;
        if (this.props.accountBalance && this.props.accountBalance.stock_long_value) {
            stock_long_value = this.props.accountBalance.stock_long_value;
        }
        var lastPrice = 0;
        var position = this.props.newPostionWithGain[0];

        var symbol = this.props.newPostionWithGain[0].symbol;
        var newAvrageValue = basicFunction.currancyAddWithNumber(position.cost_basis / position.quantity);
        var typeis = '';
        if (this.props.newPostionWithGain && this.props.newPostionWithGain[1]) {

            var gain = this.props.newPostionWithGain[1];
            lastPrice = gain.last;
            typeis = gain.type;
            if (gain && gain.type == "option") {
                lastPrice = lastPrice * 100;
                newAvrageValue = position.cost_basis / position.quantity / 100;
                newAvrageValue = basicFunction.currancyAddWithNumber(newAvrageValue);
            } else {


            }
        } else {
            newAvrageValue = position.cost_basis / position.quantity / 100;
            newAvrageValue = basicFunction.currancyAddWithNumber(newAvrageValue);
        }
        const findGain = (lastPrice * position.quantity) - position.cost_basis;
        const gainPar = (findGain / position.cost_basis) * 100;
        const equity = lastPrice * position.quantity - position.cost_basis;
        const totalValue = total_cash + stock_long_value + equity;
        const equityValue = position.quantity * lastPrice;
        var allocation = 0;
        var processBar = 0;
        if (this.props.totalValue) {
            allocation = (equityValue / this.props.totalValue) * 100
            processBar = basicFunction.nombarFormat(allocation) + '%';
        }

        //console.log('postion is',this.props.newPostionWithGain);
        return (
            <div className="div-table" >

                <div className="div-table-row t-bodyes" data-toggle="collapse" href={"#collapseOne" + this.props.index} aria-expanded="true" aria-controls="collapseOne" onClick={() => this.graphData(this.props.newPostionWithGain[0].symbol, typeis, 1)}>
                    <div className="div-table-col w-24"><span>
                        {basicFunction.optionNameSplit(this.props.newPostionWithGain[0].symbol)}</span>
                    </div>
                    <div className="div-table-col w-12"><span >
                        {position.quantity}</span>
                    </div>
                    <div className="div-table-col w-12"><span >
                        {newAvrageValue}</span>
                    </div>
                    <div className="div-table-col w-12">
                        <span >
                            {this.props.newPostionWithGain && this.props.newPostionWithGain[1] ? basicFunction.currancyAddWithNumber(this.props.newPostionWithGain[1].last) : ' -'}
                        </span>
                    </div>
                    <div className="div-table-col w-15"><span >
                        {this.props.newPostionWithGain && this.props.newPostionWithGain[1] ?
                            <span className={basicFunction.priceColor(gainPar)} >
                                {basicFunction.currancyAddWithNumber(findGain)} {' '}
                                ({basicFunction.nombarFormat(gainPar)}%)
                    </span> : ' - '}</span>
                    </div>
                    <div className="div-table-col w-25">
                        <span className="progressheading" >{basicFunction.nombarFormat(allocation)}%</span>
                        <div className="progress progress-sm">

                            <div className={"progress-bar progress-lg progess-color"} style={{ 'width': processBar }} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
                <div id={"collapseOne" + this.props.index} className="collapse" data-parent="#accordion">
                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].type != "option" ?
                        <div className="row" style={{ 'marginTop': '15px' }}>
                            <div className="col-xl-8" id='xl-8'>
                                <div className="row">
                                    <div className="col-md-5 col-sm-12  f-l" id='widthFirst'>

                                        <h4 className="collapse-sub-heading">{this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].last ? basicFunction.currancyAddWithNumber(this.props.newPostionWithGain[1].last) : '-'}

                                            {
                                                <span>
                                                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] ?
                                                        <span className={basicFunction.priceColor(this.props.newPostionWithGain[1].change)}>
                                                            {basicFunction.nombarFormat(this.props.newPostionWithGain[1].change)} {' '}
                                                            ({basicFunction.nombarFormat(this.props.newPostionWithGain[1].change_percentage)}%)
                                           </span> : ' - '}</span>

                                            }
                                        </h4>
                                        <div className="col-md-12 f-l pad-0">
                                            <table className="table table-sm table-centered mb-0 ">
                                                <tbody>
                                                    <tr>
                                                        <td>Bid</td>
                                                        <td className="t-a-r">
                                                            {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].bid ? this.props.newPostionWithGain[1].bid : '0'} {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].bidsize ? ' x ' + this.props.newPostionWithGain[1].bidsize : 'X 0'}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ask</td>
                                                        <td className="t-a-r">
                                                            {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].ask ? this.props.newPostionWithGain[1].ask : '0'} {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].asksize ? ' x ' + this.props.newPostionWithGain[1].asksize : 'X 0'}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-sm-12 f-l " id='widthSecond'>
                                        <h5 className="collapse-right-heading">Equity Value</h5>
                                        <h4 className="collapse-right-sub-heading">{basicFunction.currancyAddWithNumber(equityValue)}</h4>
                                    </div>
                                </div>
                                {this.state.optionSeries && this.state.optionSeries.length > 0 ?
                                    <div className="charrt-margin-minus">

                                        <AreaChart width={basicFunction.graphWidthEquaty(window.innerWidth, 'big')} height={200} data={this.state.optionSeries} margin={{ left: 0, top: 10 }}>
                                            <XAxis dataKey="name" />
                                            <YAxis type="number" domain={[this.state.graphMinValue, this.state.graphMaxValue]} />

                                            <Tooltip />
                                            <Area type="monotone" dataKey="Price" stroke={basicFunction.graphColorPostion(gainPar)} fill={basicFunction.graphColorFillPostion(gainPar)} />
                                        </AreaChart>

                                    </div>
                                    :
                                    <p style={{ 'textAlign': 'left' }}>No chart data available.</p>}

                                <ul className="option-stock-day-ul clearfix">
                                    <li><button className={this.state.graphSotckActiveBtn === 1 ? "btn btn-link  c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={() => this.graphData(this.props.newPostionWithGain[0].symbol, typeis, 1)}>1D</button></li>
                                    <li><button className={this.state.graphSotckActiveBtn === 2 ? "btn btn-link  c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={() => this.graphData(this.props.newPostionWithGain[0].symbol, typeis, 2)}>5D</button></li>
                                    <li><button className={this.state.graphSotckActiveBtn === 3 ? "btn btn-link c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={() => this.graphData(this.props.newPostionWithGain[0].symbol, typeis, 3)}>1M</button></li>
                                    <li><button className={this.state.graphSotckActiveBtn === 4 ? "btn btn-link c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={() => this.graphData(this.props.newPostionWithGain[0].symbol, typeis, 4)}>3M</button></li>
                                    <li><button className={this.state.graphSotckActiveBtn === 5 ? "btn btn-link c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={() => this.graphData(this.props.newPostionWithGain[0].symbol, typeis, 5)}>6M</button></li>
                                    <li><button className={this.state.graphSotckActiveBtn === 6 ? "btn btn-link c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={() => this.graphData(this.props.newPostionWithGain[0].symbol, typeis, 6)}>1Y</button></li>
                                    <li><button className={this.state.graphSotckActiveBtn === 7 ? "btn btn-link c-b-f-b underline" : "btn btn-link c-b-f-b"} onClick={() => this.graphData(this.props.newPostionWithGain[0].symbol, typeis, 7)}>2Y</button></li>
                                </ul>

                                <Link to={"/stocks/" + this.props.newPostionWithGain[0].symbol} className=" graph-link">View {basicFunction.optionNameSplit(this.props.newPostionWithGain[0].symbol)}</Link>

                            </div>
                            <div className="col-xl-4 orderPreviwXL">
                                {/* form code start */}
                                {this.state.formAndPreviewList === 0 ?
                                    <div>
                                        <div className="row positionbuttongroup">
                                            <div className="buysellLiset">
                                                <button type="button" onClick={() => this.changeActionTypeForm('buy')} className={this.state.btnClass === 'buy' ? 'btn btn-primary' : 'btn btn-outline-primary'}>Buy</button>
                                                <button type="button" onClick={() => this.changeActionTypeForm('sell')} className={this.state.btnClass === 'sell' ? 'btn btn-primary' : 'btn btn-outline-primary'}>Sell</button>
                                            </div>
                                            <div className="opencloseList">
                                                <button type="button" onClick={() => this.changeActionTypeForm2('open')} className={this.state.btnClass2 === 'open' ? 'btn btn-primary' : 'btn btn-outline-primary'}>Open</button>
                                                <button type="button" onClick={() => this.changeActionTypeForm2('close')} className={this.state.btnClass2 === 'close' ? 'btn btn-primary' : 'btn btn-outline-primary'}>Close</button>
                                            </div>
                                        </div>
                                        < div className="row mt-15 m-m-l--2">

                                            <form className="form-horizontal col-12" >
                                                <div className="form-group row mb-0-8 pad-0">
                                                    <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Shares</label>
                                                    <div className="col-8">
                                                        <input type="number"
                                                            defaultValue={this.state.formBackResponseData && this.state.formBackResponseData.share ? this.state.formBackResponseData.share : ''}
                                                            id={"formOrderShare" + this.props.index} className="form-control t-a-r" placeholder="0" />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-0-8 pad-0">
                                                    <div className="col-12 pad-0-16">
                                                        <select id={"formOrderType" + this.props.index} className="form-control t-a-r" ref="formOrderType" name="formOrderType" onChange={() => this.changePriceLimitHideShowOnSelectType("formOrderType" + this.props.index)} >
                                                            {this.state.formBackResponseData && this.state.formBackResponseData.type ?
                                                                <option value={this.state.formBackResponseData.type}>{basicFunction.GetFullForm(this.state.formBackResponseData.type)}</option>
                                                                :
                                                                <option value="">Order Type</option>}
                                                            {this.state.formBackResponseData.type === 'market' ? ''
                                                                :
                                                                <option value="market"> Market</option>
                                                            }

                                                            {this.state.formBackResponseData.type === 'limit' ? ''
                                                                :
                                                                <option value="limit">Limit</option>
                                                            }

                                                            {this.state.formBackResponseData.type === 'stop' ? ''
                                                                :
                                                                <option value="stop">Stop</option>
                                                            }

                                                            {this.state.formBackResponseData.type === 'stop_limit' ? ''
                                                                :
                                                                <option value="stop_limit">Stop Limit</option>
                                                            }

                                                        </select>
                                                    </div>
                                                </div>
                                                {this.state.stopPrice_hide_show && this.state.stopPrice_hide_show === 1 ?
                                                    <div className="form-group row mb-0-8">
                                                        <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Stop Price</label>
                                                        <div className="col-8">
                                                            <input type="number" id={"formOrderStopPrice" + this.props.index}
                                                                defaultValue={this.state.formBackResponseData && this.state.formBackResponseData.stock ? this.state.formBackResponseData.stock : ''} className="form-control t-a-r" placeholder="0" />
                                                        </div>
                                                    </div>
                                                    : ''}
                                                {this.state.limitPrice_hide_show && this.state.limitPrice_hide_show === 1 ?
                                                    <div className="form-group row mb-0-8">
                                                        <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Limit Price</label>
                                                        <div className="col-8">
                                                            <input type="number"
                                                                defaultValue={this.state.formBackResponseData && this.state.formBackResponseData.price ? this.state.formBackResponseData.price : ''}
                                                                id={"formOrderLimitPrice" + this.props.index} className="form-control t-a-r" placeholder="0" />
                                                        </div>
                                                    </div>
                                                    : ''}
                                                <div className="form-group row mb-0-8 pad-0">
                                                    <div className="col-12 pad-0-16">
                                                        <select className="form-control t-a-r" id={"formOrderTimeInForce" + this.props.index} >
                                                            {this.state.formBackResponseData && this.state.formBackResponseData.timeinforce ?
                                                                <option value={this.state.formBackResponseData.timeinforce}>{basicFunction.GetFullForm(this.state.formBackResponseData.timeinforce)}</option>
                                                                :
                                                                <option value="">Time In Force</option>}
                                                            {this.state.formBackResponseData.timeinforce === 'day' ? '' : <option value="day">Day</option>}
                                                            {this.state.formBackResponseData.timeinforce === 'gtc' ? '' : <option value="gtc">Good Till Canceled</option>}
                                                            {this.state.formBackResponseData.timeinforce === 'pre' ? '' : <option value="pre">Pre Market</option>}
                                                            {this.state.formBackResponseData.timeinforce === 'post' ? '' : <option value="post">Post Market</option>}




                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="form-group mb-0 justify-content-end row">
                                                    <div className="col-12 pad-0-16">
                                                        <button type="button" onClick={() => this.handleSubmit(this.props.index, 'equity', this.props.newPostionWithGain[1].symbol)} className="btn btn-block btn-primary">Preview </button>
                                                    </div>
                                                </div>
                                                <p className="text-muted formPTag">Brokerage Services provided by Tradier Brokerage, Inc. Member
FINRA &amp; SIPC</p>
                                            </form>
                                        </div>
                                    </div>
                                    :
                                    <div className="row mt--14">
                                        <table className="table table-sm table-centered mb-0 last-right " style={{ 'width': '95%' }} >
                                            <tbody>
                                                <tr>
                                                    <td>Order</td>
                                                    <td className="t-a-r">{this.state.previewResData.duration ? basicFunction.GetFullForm(this.state.previewResData.side) : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Shares</td>
                                                    <td className="t-a-r">{this.state.previewResData.quantity ? this.state.previewResData.quantity : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Order Type</td>
                                                    <td className="t-a-r">{this.state.previewResData.side ? basicFunction.GetFullForm(this.state.previewResData.type) : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Time in Force</td>
                                                    <td className="t-a-r">{this.state.previewResData.duration ? basicFunction.GetFullForm(this.state.previewResData.duration) : '-'}</td>
                                                </tr>
                                                {this.state.previewResData.type && this.state.previewResData.type == 'stop' ?
                                                    <tr>
                                                        <td>Stop Price</td>
                                                        <td className="t-a-r">{this.state.previewResData.stop ? basicFunction.currancyAddWithNumber(this.state.previewResData.stop) : '-'}</td>
                                                    </tr>
                                                    : ''}
                                                {this.state.previewResData.type && this.state.previewResData.type == 'stop_limit' ?
                                                    <tr>
                                                        <td>Stop Price</td>
                                                        <td className="t-a-r">{this.state.previewResData.stop ? basicFunction.currancyAddWithNumber(this.state.previewResData.stop) : '-'}</td>
                                                    </tr>
                                                    : ''}
                                                {this.state.previewResData.type && this.state.previewResData.type == 'limit' ?
                                                    <tr>
                                                        <td>Limit price</td>
                                                        <td className="t-a-r">{this.state.previewResData.price ? basicFunction.currancyAddWithNumber(this.state.previewResData.price) : '-'}</td>
                                                    </tr>
                                                    : ''}
                                                {this.state.previewResData.type && this.state.previewResData.type == 'stop_limit' ?
                                                    <tr>
                                                        <td>Limit price</td>
                                                        <td className="t-a-r">{this.state.previewResData.price ? basicFunction.currancyAddWithNumber(this.state.previewResData.price) : '-'}</td>
                                                    </tr>
                                                    : ''}

                                                <tr>
                                                    <td>Order Cost</td>
                                                    <td className="t-a-r">{this.state.previewResData.order_cost ? basicFunction.currancyAddWithNumber(this.state.previewResData.order_cost) : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Commission</td>
                                                    <td className="t-a-r">{this.state.previewResData.commission ? basicFunction.currancyAddWithNumber(this.state.previewResData.commission) : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Trade Cost</td>
                                                    <td className="t-a-r">{this.state.previewResData.cost ? basicFunction.currancyAddWithNumber(this.state.previewResData.cost) : '-'}</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                        {/* <div className="form-group mb-0 justify-content-end  col-12 m-l--15 p-r-5">
                                        <button type="button" className="btn btn-block btn-primary m-l-r--15" onClick={()=>this.createOrder(equity,this.state.previewResData)}>Place Order</button>

                                    </div> */}
                                        <div className="form-group mb-0 justify-content-end  col-12 m-l--15 p-r-5">
                                            <div className="col-12 pad-0 p-b-10">
                                                <a type="button " className="btn btn-primary orderBtn-left" onClick={() => this.createOrder(equity, this.state.previewResData)}>Place Order</a>
                                                <button type="button" className="btn btn-secondary orderBtn-right" onClick={() => this.backOrder(this.state.previewResData)}>Back</button>
                                            </div>
                                        </div>
                                        <p className="text-muted formPTag2">Brokerage Services provided by Tradier Brokerage, Inc. Member FINRA &amp; SIPC</p>
                                    </ div>
                                }
                                {/* form code end */}
                            </div>
                        </div>
                        :
                        <div className="row" style={{ 'minHeight': '400px', 'marginTop': '15px' }}>
                            <div className="col-xl-8">
                                <div className="col-md-5 col-sm-12 f-l pad-0">

                                    <h4 className="collapse-sub-heading">{this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].last ? basicFunction.currancyAddWithNumber(this.props.newPostionWithGain[1].last) : '$0.00'}
                                        {
                                            <span>
                                                {this.props.newPostionWithGain && this.props.newPostionWithGain[1] ?
                                                    <span className={basicFunction.priceColor(this.props.newPostionWithGain[1].change)}>
                                                        {basicFunction.nombarFormat(this.props.newPostionWithGain[1].change)} {' '}
                                                        ({basicFunction.nombarFormat(this.props.newPostionWithGain[1].change_percentage)}%)
                                           </span> : ' - '}</span>

                                        }
                                    </h4>
                                    <table className="table table-sm table-centered mb-0 " >
                                        <tbody>
                                            <tr>
                                                <td>Bid</td>
                                                <td className="t-a-r">
                                                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].bid ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].bid) : '0.00'} {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].bidsize ? ' x ' + this.props.newPostionWithGain[1].bidsize : 'X 0'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Ask</td>
                                                <td className="t-a-r">
                                                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].ask ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].ask) : '0.00'} {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].asksize ? ' x ' + this.props.newPostionWithGain[1].asksize : 'X 0'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Open Interest</td>
                                                <td className="t-a-r">
                                                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].open_interest ? this.props.newPostionWithGain[1].open_interest : '0'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Volume</td>
                                                <td className="t-a-r">
                                                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].volume ? this.props.newPostionWithGain[1].volume : '0'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Open</td>
                                                <td className="t-a-r">
                                                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].open ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].open) : '0.00'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>High</td>
                                                <td className="t-a-r">
                                                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].high ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].high) : '0.00'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Low</td>
                                                <td className="t-a-r">
                                                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].low ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].low) : '0.00'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Close</td>
                                                <td className="t-a-r">
                                                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].close ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].close) : '0.00'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Previous Close</td>
                                                <td className="t-a-r">
                                                    {this.props.newPostionWithGain && this.props.newPostionWithGain[1] && this.props.newPostionWithGain[1].prevclose ? basicFunction.nombarFormat(this.props.newPostionWithGain[1].prevclose) : '0.00'}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-6 f-l mb-3">
                                    <h5 className="collapse-right-heading">Equity Value</h5>
                                    <h4 className="collapse-right-sub-heading mb-3">{basicFunction.currancyAddWithNumber(equityValue)}</h4>

                                    {/* <a className="btn btn-link right-graph-upper-link  t-a-r">{basicFunction.optionNameSplit(this.props.newPostionWithGain[0].symbol)}</a> */}
                                    <div style={{ 'marginTop': '128px' }}>
                                        {this.state.optionSeries && this.state.optionSeries.length > 0 ?
                                            <AreaChart width={basicFunction.graphWidthEquaty(window.innerWidth, 'small')} height={200} data={this.state.optionSeries} margin={{ left: 0, top: 10 }}>
                                                <XAxis dataKey="name" />
                                                <YAxis type="number" domain={[this.state.graphMinValue, this.state.graphMaxValue]} />
                                                <Tooltip />
                                                <Area type="monotone" dataKey="Price" stroke={basicFunction.graphColorPostion(gainPar)} fill={basicFunction.graphColorFillPostion(gainPar)} />
                                            </AreaChart>
                                            : <div>

                                                <p className="f-r">No chart data available.</p>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 orderPreviwXL">
                                {/* form code start */}
                                {this.state.formAndPreviewList === 0 ?
                                    <div>
                                        <div className="row">
                                            <div className="buysellLiset">
                                                <button type="button" onClick={() => this.changeActionTypeForm('buy')} className={this.state.btnClass === 'buy' ? 'btn btn-primary' : 'btn btn-outline-primary'}>Buy</button>
                                                <button type="button" onClick={() => this.changeActionTypeForm('sell')} className={this.state.btnClass === 'sell' ? 'btn btn-primary' : 'btn btn-outline-primary'}>Sell</button>
                                            </div>
                                            <div className="opencloseList">
                                                <button type="button" onClick={() => this.changeActionTypeForm2('open')} className={this.state.btnClass2 === 'open' ? 'btn btn-primary' : 'btn btn-outline-primary'}>Open</button>
                                                <button type="button" onClick={() => this.changeActionTypeForm2('close')} className={this.state.btnClass2 === 'close' ? 'btn btn-primary' : 'btn btn-outline-primary'}>Close</button>
                                            </div>
                                        </div>
                                        < div className="row mt-15 m-m-l--2">

                                            <form className="form-horizontal col-12" >
                                                <div className="form-group row mb-0-8 pad-0">
                                                    <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Contracts</label>
                                                    <div className="col-8">
                                                        <input type="number"
                                                            defaultValue={this.state.formBackResponseData && this.state.formBackResponseData.share ? this.state.formBackResponseData.share : ''}
                                                            id={"formOrderShare" + this.props.index} className="form-control t-a-r" placeholder="0" />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-0-8 pad-0">
                                                    <div className="col-12 pad-0-16">
                                                        <select id={"formOrderType" + this.props.index} className="form-control t-a-r" ref="formOrderType" name="formOrderType" onChange={() => this.changePriceLimitHideShowOnSelectType("formOrderType" + this.props.index)} >
                                                            {this.state.formBackResponseData && this.state.formBackResponseData.type ?
                                                                <option value={this.state.formBackResponseData.type}>{basicFunction.GetFullForm(this.state.formBackResponseData.type)}</option>
                                                                :
                                                                <option value="">Order Type</option>}

                                                            {this.state.formBackResponseData.type === 'market' ? '' : <option value="market"> Market</option>}

                                                            {this.state.formBackResponseData.type === 'limit' ? '' : <option value="limit">Limit</option>}

                                                            {this.state.formBackResponseData.type === 'stop' ? '' : <option value="stop">Stop</option>}

                                                            {this.state.formBackResponseData.type === 'stop_limit' ? '' : <option value="stop_limit">Stop Limit</option>}




                                                        </select>
                                                    </div>
                                                </div>
                                                {this.state.stopPrice_hide_show && this.state.stopPrice_hide_show === 1 ?
                                                    <div className="form-group row mb-0-8">
                                                        <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Stop Price</label>
                                                        <div className="col-8">
                                                            <input type="number"
                                                                defaultValue={this.state.formBackResponseData && this.state.formBackResponseData.stock ? this.state.formBackResponseData.stock : ''}
                                                                id={"formOrderStopPrice" + this.props.index} className="form-control t-a-r" placeholder="0" />
                                                        </div>
                                                    </div>
                                                    : ''}
                                                {this.state.limitPrice_hide_show && this.state.limitPrice_hide_show === 1 ?
                                                    <div className="form-group row mb-0-8">
                                                        <label htmlFor="inputShares3" className="col-4 col-form-label pad-0">Limit Price</label>
                                                        <div className="col-8">
                                                            <input type="number"
                                                                defaultValue={this.state.formBackResponseData && this.state.formBackResponseData.price ? this.state.formBackResponseData.price : ''}
                                                                id={"formOrderLimitPrice" + this.props.index} className="form-control t-a-r" placeholder="0" />
                                                        </div>
                                                    </div>
                                                    : ''}
                                                <div className="form-group row mb-0-8 pad-0">
                                                    <div className="col-12 pad-0-16">
                                                        <select className="form-control t-a-r" id={"formOrderTimeInForce" + this.props.index} >

                                                            {this.state.formBackResponseData && this.state.formBackResponseData.timeinforce ?
                                                                <option value={this.state.formBackResponseData.timeinforce}>{basicFunction.GetFullForm(this.state.formBackResponseData.timeinforce)}</option>
                                                                :
                                                                <option value="">Time In Force</option>}

                                                            {this.state.formBackResponseData.timeinforce === 'day' ? '' : <option value="day">Day</option>}
                                                            {this.state.formBackResponseData.timeinforce === 'gtc' ? '' : <option value="gtc">Good Till Canceled</option>}
                                                            {this.state.formBackResponseData.timeinforce === 'pre' ? '' : <option value="pre">Pre Market</option>}
                                                            {this.state.formBackResponseData.timeinforce === 'post' ? '' : <option value="post">Post Market</option>}




                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="form-group mb-0 justify-content-end row">
                                                    <div className="col-12 pad-0-16">
                                                        <button type="button" onClick={() => this.handleSubmit(this.props.index, 'option', this.props.newPostionWithGain[1].symbol)} className="btn btn-block btn-primary">Preview </button>
                                                    </div>
                                                </div>


                                                <p className="text-muted formPTag">Brokerage Services provided by Tradier Brokerage, Inc. Member
FINRA &amp; SIPC</p>
                                            </form>
                                        </div>
                                    </div>
                                    :
                                    < div className="row mt--14 ">
                                        <table className="table table-sm table-centered mb-0 last-right " style={{ 'width': '95%' }}  >
                                            <tbody>
                                                <tr>
                                                    <td>Order</td>
                                                    <td className="t-a-r">{this.state.previewResData.duration ? basicFunction.GetFullForm(this.state.previewResData.side) : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Contracts</td>
                                                    <td className="t-a-r">{this.state.previewResData.quantity ? this.state.previewResData.quantity : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Order Type</td>
                                                    <td className="t-a-r">{this.state.previewResData.side ? basicFunction.GetFullForm(this.state.previewResData.type) : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Time in Force</td>
                                                    <td className="t-a-r">{this.state.previewResData.duration ? basicFunction.GetFullForm(this.state.previewResData.duration) : '-'}</td>
                                                </tr>
                                                {this.state.previewResData.type && this.state.previewResData.type == 'stop' ?
                                                    <tr>
                                                        <td>Stop Price</td>
                                                        <td className="t-a-r">{this.state.previewResData.stop ? basicFunction.currancyAddWithNumber(this.state.previewResData.stop) : '-'}</td>
                                                    </tr>
                                                    : ''}
                                                {this.state.previewResData.type && this.state.previewResData.type == 'stop_limit' ?
                                                    <tr>
                                                        <td>Stop Price</td>
                                                        <td className="t-a-r">{this.state.previewResData.stop ? basicFunction.currancyAddWithNumber(this.state.previewResData.stop) : '-'}</td>
                                                    </tr>
                                                    : ''}
                                                {this.state.previewResData.type && this.state.previewResData.type == 'limit' ?
                                                    <tr>
                                                        <td>Limit price</td>
                                                        <td className="t-a-r">{this.state.previewResData.price ? basicFunction.currancyAddWithNumber(this.state.previewResData.price) : '-'}</td>
                                                    </tr>
                                                    : ''}
                                                {this.state.previewResData.type && this.state.previewResData.type == 'stop_limit' ?
                                                    <tr>
                                                        <td>Limit price</td>
                                                        <td className="t-a-r">{this.state.previewResData.price ? basicFunction.currancyAddWithNumber(this.state.previewResData.price) : '-'}</td>
                                                    </tr>
                                                    : ''}
                                                <tr>
                                                    <td>Order Cost</td>
                                                    <td className="t-a-r">{this.state.previewResData.order_cost ? basicFunction.currancyAddWithNumber(this.state.previewResData.order_cost) : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Commission</td>
                                                    <td className="t-a-r">{this.state.previewResData.commission ? basicFunction.currancyAddWithNumber(this.state.previewResData.commission) : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Trade Cost</td>
                                                    <td className="t-a-r">{this.state.previewResData.cost ? basicFunction.currancyAddWithNumber(this.state.previewResData.cost) : '-'}</td>
                                                </tr>


                                            </tbody>
                                        </table>

                                        <div className="form-group mb-0 justify-content-end  col-12 m-l--15 p-r-5">
                                            <div className="col-12 pad-0 p-b-10">
                                                <a type="button " className="btn btn-primary orderBtn-left" onClick={() => this.createOrder('option', this.state.previewResData)}>Place Order</a>
                                                <button type="button" className="btn btn-secondary orderBtn-right" onClick={() => this.backOrder(this.state.previewResData)}>Back</button>
                                            </div>
                                        </div>
                                        <p className="text-muted formPTag2">Brokerage Services provided by Tradier Brokerage, Inc. Member
FINRA &amp; SIPC</p>
                                    </ div>
                                }
                                {/* form code end */}
                            </div>
                        </div>
                    }
                </div>
                {/* <hr className="table-hr" /> */}
                {this.state.orderFormErrorArray && this.state.orderFormErrorArray > 0 ?
                    <div id="warning-alert-modal" className="modal fade show" tabIndex="-1" role="dialog" style={{ 'padding-right': '17px', 'background': '#11111175' }}>
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-body p-4">
                                    <div className="text-center">
                                        <i className="dripicons-warning h1 text-warning"></i>
                                        <h4 className="mt-2">Error</h4>
                                        <ol className="errorList">
                                            {Object.keys(this.state.orderFormErrorListArray).map((er, i) => (
                                                <li key={i}>{this.state.orderFormErrorListArray[er]}</li>
                                            ))}
                                        </ol>
                                        {this.state.stringErrorMessasge ?
                                            <p>{this.state.stringErrorMessasge}</p>
                                            : ''}

                                        {this.state.orderFormErrorListArrayRes ?
                                            <p>{this.state.orderFormErrorListArrayRes.error}</p>
                                            : ''}
                                        <button type="button" className="btn btn-warning my-2" onClick={() => this.hideErrorMessage()}>OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''}
                {this.state.orderSuccess && this.state.orderSuccess > 0 ?
                    <div id="success-alert-modal" className="modal fade show" tabIndex="-1" role="dialog" style={{ 'padding-right': '17px', 'background': '#11111175' }}>
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content modal-filled bg-success">
                                <div className="modal-body p-4">
                                    <div className="text-center">
                                        <i className="dripicons-checkmark h1"></i>
                                        <h4 className="mt-2">Order Received</h4>
                                        <p className="mt-3 c-w">{this.state.orderSuccessMessage}</p>
                                        <button type="button" className="btn btn-light my-2" onClick={() => this.hideErrorMessage()} data-toggle="collapse" href={"#collapseOne" + this.props.index} >Done</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentaccount: state.setAccountReducer.currentaccount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        accountOrderFatch: (currentAccountNumber) => {
            dispatch(accountOrderFatch(currentAccountNumber));
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostionSingle);
//export default PostionSingle;