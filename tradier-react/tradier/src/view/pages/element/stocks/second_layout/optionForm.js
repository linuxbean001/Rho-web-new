import React, { Component } from 'react';
import './stockTrade.css'
import './optionForm.css'
import BasicFunction from '../../../../../controller/basicFunction';
import Trading from '../../../../../modal/trading/trading';
import Spinner from '../../../common/spinner';
const basicFunction = new BasicFunction;
const trading = new Trading;
class OptionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formType: 'stock',
            actionType: 'buy',
            actionType2: 'open',
            actionType3: 'call',
            formSymbol: '',
            stopPrice_hide_show: 0,
            limitPrice_hide_show: 0,
            orderFormErrorArray: 0,
            orderFormErrorListArray: '',
            orderFormErrorListArrayRes: '',
            orderPrviewResponse: '',
            orderformAndPreviewList: 0,
            previewResData: '',
            orderSuccess: 0,
            orderSuccessMessage: '',
            orderbtnClass: 'buy',
            orderbtnClass2: 'open',
            orderbtnClass3: 'call',
            optionformAndPreviewList: 0,
            formBackResponseData: '',
            expireDate: '',
            chainsData: [],
            localSymbol: '',
            selectedExpireDate: '',
            loading: true,
        }
    }

    changeFormType(formType) {
        this.setState({ formType });
    }
    changeActionTypeForm(actionType) {
        this.setState({ actionType: actionType });
        if (actionType === 'sell') {
            this.setState({ orderbtnClass: 'sell' });
        } else {
            this.setState({ orderbtnClass: 'buy' });
        }
    }
    changeActionTypeForm2(actionType2) {
        this.setState({ actionType2: actionType2 });
        if (actionType2 === 'close') {
            this.setState({ orderbtnClass2: 'close' });
        } else {
            this.setState({ orderbtnClass2: 'open' });
        }
    }
    changeActionTypeForm3(actionType3) {
        this.setState({ actionType3: actionType3 });
        if (actionType3 === 'put') {
            this.setState({ orderbtnClass3: 'put' });
        } else {
            this.setState({ orderbtnClass3: 'call' });
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
    handleSubmit(option, symbol) {
        var formOrderShare = 'formOrderShare';
        var formOrderType = 'formOrderType';
        var formOrderStopPrice = 'formOrderStopPrice';
        var formOrderLimitPrice = 'formOrderLimitPrice';
        var formOrderTimeInForce = 'formOrderTimeInForce';
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
                        this.setState({ orderformAndPreviewList: 0 });
                        this.setState({ stringErrorMessasge: '' });
                        if (data.errors) {
                            this.setState({ orderFormErrorArray: 1 })
                            this.setState({ orderformAndPreviewList: 0 });
                            this.setState({ orderFormErrorListArrayRes: data.errors });
                            console.log('submit data ', data.order);
                        }
                        if (data.order) {
                            this.setState({ orderformAndPreviewList: 1 });
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
                            this.setState({ orderformAndPreviewList: 0 });
                            this.setState({ previewResData: '' });
                            this.setState({ formBackResponseData: '' })
                            this.setState({ stopPrice_hide_show: 0 })
                            this.setState({ limitPrice_hide_show: 0 })

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
    backOrder(previewResData) {
        var side = basicFunction.sideToOrderbuySellOpenClose(previewResData.side);
        var type = previewResData.type;
        var timeinforce = previewResData.duration;
        var share = previewResData.quantity;
        var price = '';
        var stock = '';
        var orderbtnClass = side.buySell;
        var orderbtnClass2 = side.openClose;
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
        this.setState({ orderbtnClass });
        this.setState({ orderbtnClass2 });
        this.setState({ actionType: orderbtnClass });
        this.setState({ actionType2: orderbtnClass2 });
        this.setState({ orderformAndPreviewList: 0 });

        // console.log('formBackResponseData',formBackResponseData);


    }
    hideErrorMessage() {
        this.setState({ orderFormErrorArray: 0 });
        this.setState({ orderSuccess: 0 });
        this.setState({ orderformAndPreviewList: 0 });
    }

    componentDidMount() {
        this.setState({ localSymbol: this.props.pageSymbol });
        this.getExpireDate();
    }


    componentWillReceiveProps(props) {

        if (this.state.localSymbol != this.props.pageSymbol) {
            this.state.localSymbol = this.props.pageSymbol;
            this.getExpireDate();
        }

        {/*  if(this.state.selectedExpireDate){
            this.optionChain(this.state.selectedExpireDate);
        }  */}

    }

    getExpireDate() {
        const symbol = this.props.pageSymbol;
        var formdata = {
            Symbol: symbol
        }
        if (formdata) {
            trading.expireDate(localStorage.getItem("Authorization"), formdata)
                .then(res => {
                    const data = JSON.parse(res.data.data);
                    if (res && data.expirations) {
                        this.setState({ expireDate: data.expirations.date })
                        this.initialDateValueChange(this.state.expireDate[0]);
                        this.setState({ selectedExpireDate: this.state.expireDate[0] });
                    } else {
                        this.setState({ expireDate: '' })
                    }

                });
        }
    }

    initialDateValueChange(date) {
        this.dateChangeValue(date);
        console.log('This is Date', date);
    }

    optionDateValue(date) {
        this.dateChangeValue(date.target.value);
    }

    dateChangeValue(expireDate) {
        //const symbol = this.props.pageSymbol;
        const expiredate = expireDate;
        this.setState({ selectedExpireDate: expireDate });
        const symbol = this.props.pageSymbol;
        var formdata = {
            Symbol: symbol,
            ExpireDate: expiredate
        }
        if (formdata) {
            trading.expireChainDate(localStorage.getItem("Authorization"), formdata)
                .then(res => {
                    const data = JSON.parse(res.data.data);
                    this.setState({ chainsData: data.options.option });
                    this.setState({ loading: false });
                    console.log('response CH:', this.state.chainsData);
                });
        }
    }

    render() {
        var saprateCallAndPutValue = [];
        if (this.state.actionType3 === 'call') {
            this.state.chainsData.map((value, i) => {
                if (value.option_type === 'call') {
                    saprateCallAndPutValue.push(value);
                }
            })
        }
        else {
            this.state.chainsData.map((value, i) => {
                if (value.option_type === 'put') {
                    saprateCallAndPutValue.push(value);
                }
            })
        }

        console.log('saprateCallAndPutValue', saprateCallAndPutValue);
        return (
            <div>

                <div className="StockTab">
                    <div className="row positionbuttongroup btn-margin ">
                        <div className="buysellLiset-trade ">
                            <button type="button" onClick={() => this.changeActionTypeForm3('call')} className={this.state.orderbtnClass3 === 'call' ? 'btn btn-warning btn-trade' : 'btn btn-outline-warning'} >Call</button>
                            <button type="button" onClick={() => this.changeActionTypeForm3('put')} className={this.state.orderbtnClass3 === 'put' ? 'btn btn-warning btn-trade' : 'btn btn-outline-warning'}>Put</button>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-xs-12">

                            <div className="btn-group mb-2 f-r">
                                <div className="btn-group show">
                                    {/* <button type="button" className="btn btn-dark dropdown-toggle optionExpiration" data-toggle="dropdown" aria-expanded="false"> Expiration <span className="caret"></span> </button>
                                   <div className="dropdown-menu optiondropdown" x-placement="bottom-start" style={{ 'position': 'absolute', 'willChange': 'transform', 'top': '0px', 'left': '0px', 'transform': 'translate3d(0px, 37px, 0px)' }}>
                                    {Object.keys(this.state.expireDate).map((er, i) => (
                                        <a key={i} className="dropdown-item" >{this.state.expireDate[er]}</a>
                                    ))}
                                    </div> */}
                                    <div className="select-items">
                                        <select onChange={this.optionDateValue.bind(this)} className="optionExpiration">
                                            {this.state.expireDate ? Object.keys(this.state.expireDate).map((er, i) => (
                                                <option key={i} value={this.state.expireDate[er]} className="optiontest" > {basicFunction.dateTimeInFullMonthName(this.state.expireDate[er])} </option>
                                            )) : <option className="optiontest" > Expiration  </option>}

                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row top-margin">
                        <div className="col-lg-12 col-sm-12 col-xs-12">
                            <table className="table table-sm table-centered last-right white-last mb-0 ">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Strike</th>
                                        <th>Bid</th>
                                        <th>Ask</th>
                                        <th>Last</th>
                                        <th>%Chg</th>
                                    </tr>
                                </thead>
                                {this.state.loading ? <div style={{ paddingTop: '40px', paddingBottom: '30px' }}><Spinner widthValue='40' leftValue='50' /></div> : ''}
                                {this.state.expireDate ?
                                    <tbody>
                                        {saprateCallAndPutValue.map((value, i) =>
                                            <tr>
                                                <td>
                                                    <label className="container1">
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </td>

                                                <td className="text-color">{basicFunction.currancyAddWithNumber(value.strike)}</td>
                                                <td className="text-color">{basicFunction.nombarFormat(value.bid)}</td>
                                                <td className="text-color">{basicFunction.nombarFormat(value.ask)}</td>
                                                <td className="text-color">{basicFunction.nombarFormat(value.last)}</td>
                                                <td ><span className={basicFunction.priceColor(value.change_percentage)}>{basicFunction.nombarFormat(value.change_percentage)}%</span></td>
                                            </tr>
                                        )}

                                    </tbody>
                                    : ''}
                            </table>
                        </div>
                    </div>
                    <div className="row top-margin">
                        <h4 className="header-title f-20 text-color t-a-c">NOV-30-18 33.0 Call</h4>
                    </div>

                    <div className="row top-margin">
                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <table className="table table-sm table-centered last-right mb-0">
                                <tbody>
                                    <tr>
                                        <td >Bid</td>
                                        <td className="text-color">137.10 x 25</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <table className="table table-sm table-centered last-right mb-0">
                                <tbody>
                                    <tr>
                                        <td >Ask</td>
                                        <td className="text-color">137.10 x 10</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* bid end */}
                    {/* button start */}
                    <div className="row positionbuttongroup btn-margin ">
                        <div className="buysellLiset-trade ">
                            <button type="button" onClick={() => this.changeActionTypeForm('buy')} className={this.state.orderbtnClass === 'buy' ? 'btn btn-warning btn-trade' : 'btn btn-outline-warning'} >Buy</button>
                            <button type="button" onClick={() => this.changeActionTypeForm('sell')} className={this.state.orderbtnClass === 'sell' ? 'btn btn-warning btn-trade' : 'btn btn-outline-warning'}>Sell</button>
                        </div>
                        <div className="opencloseList">
                            <button type="button" onClick={() => this.changeActionTypeForm2('open')} className={this.state.orderbtnClass2 === 'open' ? 'btn btn-warning btn-trade' : 'btn btn-outline-warning'} >Open</button>
                            <button type="button" onClick={() => this.changeActionTypeForm2('close')} className={this.state.orderbtnClass2 === 'close' ? 'btn btn-warning btn-trade' : 'btn btn-outline-warning'} >Close</button>
                        </div>
                    </div>

                    {/* button end */}
                    {/* shares start */}
                    <div className="row m-t-b-10">
                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <label className="f-l">Shares</label>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12">

                            <input type="number" id={"formOrderShare"}
                                defaultValue={this.state.formBackResponseData && this.state.formBackResponseData.share ? this.state.formBackResponseData.share : ''}
                                className="form-control t-a-r"
                                className="form-control t-a-r box-background-color box-border text-color" placeholder="0" />
                        </div>
                    </div>

                    {/* shares end */}
                    {/* order type start */}
                    <div className="row m-t-b-10">
                        <div className="col-lg-12 col-sm-12 col-xs-12"  >
                            <select className="form-control t-a-r box-background-color box-border" id={"formOrderType"} onChange={() => this.changePriceLimitHideShowOnSelectType("formOrderType")}>
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

                    {/* order type end */}
                    {/* Stop price start */}

                    {this.state.stopPrice_hide_show === 1 ?
                        <div className="row ">
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <label className="f-l">Stop Price</label>
                            </div>

                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <input type="number" id={"formOrderStopPrice"} className="form-control t-a-r box-background-color box-border text-color" placeholder="0"
                                    defaultValue={this.state.formBackResponseData && this.state.formBackResponseData.stock ? this.state.formBackResponseData.stock : ''}
                                />
                            </div>
                        </div> : ''}

                    {/* Stop price End */}

                    {/* Limit price start */}
                    {this.state.limitPrice_hide_show === 1 ?
                        <div className="row m-t-b-10">
                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <label className="f-l">Limit Price</label>
                            </div>

                            <div className="col-lg-6 col-sm-6 col-xs-12">
                                <input type="number" id={"formOrderLimitPrice"} className="form-control t-a-r box-background-color box-border text-color"
                                    defaultValue={this.state.formBackResponseData && this.state.formBackResponseData.price ? this.state.formBackResponseData.price : ''}
                                    placeholder="0" />
                            </div>
                        </div> : ''}
                    {/* Limit price End */}
                    {/* order type start */}
                    <div className="row m-t-5">
                        <div className="col-lg-12 col-sm-12 col-xs-12"  >
                            <select className="form-control t-a-r box-background-color box-border" id={"formOrderTimeInForce"}>
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

                    {/* order type end */}

                    <div className="row m-t-5">
                        <div className="col-12 pad-0-16 btn-pre-left ">
                            <button type="button" onClick={() => this.handleSubmit('equity', this.props.pageSymbol)} className="btn btn-pre btn-warning btn-trade">Preview </button>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="bottom-message">
                            <p >Brokerage Services provided by Tradier Brokerage, Inc. Member FINRA SIPC </p>

                        </div>
                    </div>
                </div>
            </ div>


        );
    }
}

export default OptionForm;