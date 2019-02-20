import React, { Component } from 'react';

class StockQuote extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card-body">
                <h4 className="header-title f-20 text-color">QUOTE DETAILS</h4>
                {/* first start */}
                <div className="row top-margin">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered last-right white-last mb-0 ">
                            <tbody>
                                <tr>
                                    <td>Open</td>
                                    <td className="text-color">137.10</td>
                                </tr>
                                <tr>
                                    <td>High</td>
                                    <td className="text-color">137.10</td>
                                </tr>
                                <tr>
                                    <td>Low</td>
                                    <td className="text-color">137.10</td>
                                </tr>
                                <tr>
                                    <td>Close</td>
                                    <td className="text-color">137.10</td>
                                </tr>
                                <tr>
                                    <td>52 Wk High</td>
                                    <td className="text-color">137.10</td>
                                </tr>

                                <tr>
                                    <td>52 Wk Low</td>
                                    <td className="text-color">137.10</td>
                                </tr>
                                <tr>
                                    <td>Beta</td>
                                    <td className="text-color">137.10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered last-right white-last mb-0">
                            <tbody>
                                <tr>
                                    <td>Volume</td>
                                    <td className="text-color">137.10M</td>
                                </tr>
                                <tr>
                                    <td>Mkt Cap</td>
                                    <td className="text-color">137.10M</td>
                                </tr>
                                <tr>
                                    <td>P/E Ratio</td>
                                    <td className="text-color">137.10M</td>
                                </tr>
                                <tr>
                                    <td>Dividend</td>
                                    <td className="text-color">137.10M</td>
                                </tr>
                                <tr>
                                    <td>EPS</td>
                                    <td className="text-color">137.10M</td>
                                </tr>
                                <tr>
                                    <td>50D Moving Avg</td>
                                    <td className="text-color">137.10M</td>
                                </tr>
                                <tr>
                                    <td>200D Moving Avg</td>
                                    <td className="text-color">137.10M</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

               
             

                <h4 className="header-title f-20 text-color">Ownership</h4>
                {/* first start */}
                <div className="row top-margin">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered  white-last last-right mb-0">
                            <tbody>
                                <tr>
                                    <td>Shares Outstanding</td>
                                    <td className="text-color">4.74B</td>
                                </tr>
                                <tr>
                                    <td>Float</td>
                                    <td className="text-color">4.74B</td>
                                </tr>
                                <tr>
                                    <td>Inst. Ownership</td>
                                    <td className="text-color">4.74B</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered white-last last-right mb-0">
                            <tbody>
                                <tr>
                                    <td>Insider Ownership</td>
                                    <td className="text-color">10.40%</td>
                                </tr>
                                <tr>
                                    <td>Short Interest</td>
                                    <td className="text-color">10.40%</td>
                                </tr>
                                <tr>
                                    <td>Short Ratio</td>
                                    <td className="text-color">10.40%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* first end */}

                

                

                <h4 className="header-title f-20 text-color">Earnings</h4>
                <p>Graph Place</p>

                <h4 className="header-title f-20 text-color">Key Stats</h4>
                {/* first start */}
                <div className="row top-margin">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered last-right white-last mb-0">
                            <tbody>
                                <tr>
                                    <td>Price / Book</td>
                                    <td className="text-color">7.16</td>
                                </tr>
                                <tr>
                                    <td>Price / Sales</td>
                                    <td className="text-color">7.16</td>
                                </tr>
                                <tr>
                                    <td>Profit Margin</td>
                                    <td className="text-color">7.16</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered  white-last last-right mb-0">
                            <tbody>
                                <tr>
                                    <td>P/E Ratio High</td>
                                    <td className="text-color">25.45</td>
                                </tr>
                                <tr>
                                    <td>P/E Ratio Low</td>
                                    <td className="text-color">25.45</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* first end */}


                <h4 className="header-title f-20 text-color">Financials</h4>
                <p>Graph place</p>

                <h4 className="header-title f-20 text-color">Performance</h4>

                {/* first start */}
                <div className="row top-margin">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered  white-last last-right mb-0">
                            <tbody>
                                <tr>
                                    <td>1-Day</td>
                                    <td style={{color:'#ed5454'}}>-2.54%</td>
                                </tr>
                                <tr>
                                    <td>5-Day</td>
                                    <td style={{color:'#ed5454'}}>-2.54%</td>
                                </tr>
                                <tr>
                                    <td>1-Month</td>
                                    <td style={{color:'#ed5454'}}>-2.54%</td>
                                </tr>
                                <tr>
                                    <td>3-Month</td>
                                    <td style={{color:'#ed5454'}}>-2.54%</td>
                                </tr>
                                <tr>
                                    <td>6-Month</td>
                                    <td style={{color:'#ed5454'}}>-2.54%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-lg-6 col-sm-6 col-xs-12">
                        <table className="table table-sm table-centered white-last last-right mb-0">
                            <tbody>
                                <tr>
                                    <td>YTD</td>
                                    <td style={{color:'#1fa764'}}>1.52%</td>
                                </tr>
                                <tr>
                                    <td>1-Year</td>
                                    <td style={{color:'#1fa764'}}>1.52%</td>
                                </tr>
                                <tr>
                                    <td>2-Year</td>
                                    <td style={{color:'#1fa764'}}>1.52%</td>
                                </tr>
                                <tr>
                                    <td>5-Year</td>
                                    <td style={{color:'#1fa764'}}>1.52%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* first end */}

             
            </div>
        );
    }
}

export default StockQuote;