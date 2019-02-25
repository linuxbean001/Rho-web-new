import React, { Component } from 'react';
import './stockTrade.css'
import BasicFunction from '../../../../../controller/basicFunction';
import Trading from '../../../../../modal/trading/trading';
import OptionForm from './optionForm';
const basicFunction = new BasicFunction;
const trading = new Trading;
class StockTrade extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formType: 'stock',
            actionType: 'buy',
            actionType2: 'open',
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
            optionformAndPreviewList:0,
            formBackResponseData:''
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
        var formOrderShare = 'formOrderShare' ;
        var formOrderType = 'formOrderType' ;
        var formOrderStopPrice = 'formOrderStopPrice' ;
        var formOrderLimitPrice = 'formOrderLimitPrice' ;
        var formOrderTimeInForce = 'formOrderTimeInForce' ;
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
        console.log('formdasta=',formdata);
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
                            this.setState({orderformAndPreviewList:0});
                            this.setState({previewResData:''});
                            this.setState({formBackResponseData:''})
                            this.setState({stopPrice_hide_show:0})
                            this.setState({limitPrice_hide_show:0})

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
    render() {
          // console.log('hggggggggggggggggggggj:',this.props.quoteData);
        return (
            <div className=" ">
                <div className="card-body">

                    <h4 className="header-title f-20 text-color">TRADE</h4>


                    <div className="classNavToggle">
                        {/* nav start */}
                        <ul className="nav nav-tabs nav-bordered-trade mb-2">
                            <li className="nav-item-trade" >
                                <a href="#home-b1" onClick={()=>this.changeFormType('stock')} data-toggle="tab" aria-expanded="false" className="nav-link active box-background-color">
                                    <i className="mdi mdi-call-missed d-lg-none d-block mr-1"></i>
                                    <span className="d-none d-lg-block text-color" >Stock</span>
                                </a>
                            </li>
                            <li className="nav-item-trade">
                                <a href="#profile-b1" onClick={()=>this.changeFormType('option')} data-toggle="tab" aria-expanded="true" className="nav-link box-background-color">
                                    <i className="mdi mdi-basket d-lg-none d-block mr-1"></i>
                                    <span className="d-none d-lg-block text-color">Option</span>
                                </a>
                            </li>
                            <li className="nav-item-trade">
                                <a href="#profile-b1" onClick={()=>this.changeFormType('spread')} data-toggle="tab" aria-expanded="true" className="nav-link box-background-color">
                                    <i className="mdi mdi-basket d-lg-none d-block mr-1"></i>
                                    <span className="d-none d-lg-block text-color">Spread</span>
                                </a>
                            </li>
                            <li className="nav-item-trade">
                                <a href="#profile-b1" onClick={()=>this.changeFormType('combo')} data-toggle="tab" aria-expanded="true" className="nav-link box-background-color">
                                    <i className="mdi mdi-basket d-lg-none d-block mr-1"></i>
                                    <span className="d-none d-lg-block text-color">Combo</span>
                                </a>
                            </li>

                        </ul>
                        {/* nav End */}
                        {/* bid start */}

                        <div className="navigationBodySection">
                           
                            {this.state.formType === 'stock' ? this.state.orderformAndPreviewList === 0 ?
                                <div className="StockTab">
                                    <div className="row top-margin">
                                        <div className="col-lg-6 col-sm-6 col-xs-12">
                                            <table className="table table-sm table-centered last-right mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td >Bid</td>
                                                        <td className="text-color">
                                                        { this.props.quoteData && this.props.quoteData.quotes.quote.bid ? this.props.quoteData.quotes.quote.bid : '0'} 
                                                        {this.props.quoteData.quotes && this.props.quoteData.quotes.quote && this.props.quoteData.quotes.quote.bidsize ? ' x '+ this.props.quoteData.quotes.quote.bidsize : ' X 0'}
                                                        
                                                         </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="col-lg-6 col-sm-6 col-xs-12">
                                            <table className="table table-sm table-centered last-right mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td >Ask</td>
                                                        <td className="text-color">
                                                        { this.props.quoteData && this.props.quoteData.quotes.quote.ask ? this.props.quoteData.quotes.quote.ask : '0'} 
                                                        {this.props.quoteData.quotes && this.props.quoteData.quotes.quote && this.props.quoteData.quotes.quote.asksize ? ' x '+ this.props.quoteData.quotes.quote.asksize : ' X 0'}
                                                        
                                                        </td>
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
                                            <select className="form-control t-a-r box-background-color box-border" id={"formOrderType" } onChange={() => this.changePriceLimitHideShowOnSelectType("formOrderType")}>
                                            {this.state.formBackResponseData &&this.state.formBackResponseData.type ?
                                            <option value={this.state.formBackResponseData.type}>{basicFunction.GetFullForm(this.state.formBackResponseData.type)}</option>
                                             :
                                             <option value="">Order Type</option> }

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
                                    </div> : '' }

                                    {/* Stop price End */}

                                    {/* Limit price start */}
                                    {this.state.limitPrice_hide_show===1 ? 
                                    <div className="row m-t-b-10">
                                        <div className="col-lg-6 col-sm-6 col-xs-12">
                                           <label className="f-l">Limit Price</label> 
                                        </div>

                                        <div className="col-lg-6 col-sm-6 col-xs-12">
                                            <input type="number" id={"formOrderLimitPrice"} className="form-control t-a-r box-background-color box-border text-color" 
                                            defaultValue={this.state.formBackResponseData && this.state.formBackResponseData.price ? this.state.formBackResponseData.price : ''}
                                             placeholder="0" />
                                        </div>
                                    </div> : '' }
                                    {/* Limit price End */}
                                    {/* order type start */}
                                    <div className="row m-t-5">
                                        <div className="col-lg-12 col-sm-12 col-xs-12"  >
                                            <select className="form-control t-a-r box-background-color box-border"  id={"formOrderTimeInForce"}>
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
                                            <button type="button"  onClick={() => this.handleSubmit( 'equity', this.props.pageSymbol)} className="btn btn-pre btn-warning btn-trade">Preview </button>
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="bottom-message">
                                            <p >Brokerage Services provided by Tradier Brokerage, Inc. Member FINRA SIPC</p>

                                        </div>
                                    </div>
                                </div>
                                : 
                                <div className="row mt--14" style={{ 'padding': '10px 16px 10px 16px'}}>
                                        <table className="table table-sm table-centered mb-0 last-right white-last"  >
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
                                       
                                        <div className="form-group mb-0 justify-content-end  col-12 m-l--15 p-r-5">
                                            <div className="col-12 pad-0 p-b-10">
                                                <a type="button " className="btn btn-warning orderBtn2-left" onClick={() => this.createOrder('equity', this.state.previewResData)}>Place Order</a>
                                                <button type="button" className="btn btn-secondary orderBtn2-right" onClick={() => this.backOrder(this.state.previewResData)}>Back</button>
                                            </div>
                                        </div>
                                        <p className="text-muted formPTag2">Brokerage Services provided by Tradier Brokerage, Inc. Member FINRA &amp; SIPC</p>
                                    </ div>
                                 : '' }

                                {this.state.formType === 'option' ? this.state.optionformAndPreviewList === 0 ?
                                <div className="Opthen Tab">
                                   <OptionForm pageSymbol ={ this.props.pageSymbol }  />
                                </div>
                                : 'Opthen Submit' :'' }
                                {this.state.formType === 'spread' ? this.state.optionformAndPreviewList === 0 ?
                                <div className="spread Tab">
                                   spread Section
                                </div>
                                : 'Opthen Submit' :'' }
                                {this.state.formType === 'combo' ? this.state.optionformAndPreviewList === 0 ?
                                <div className="combo Tab">
                                   combo Section
                                </div>
                                : 'Opthen Submit' :'' }
                          </div>
       
                    </div>
                    </div>
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


                );
            }
        }
        
export default StockTrade;