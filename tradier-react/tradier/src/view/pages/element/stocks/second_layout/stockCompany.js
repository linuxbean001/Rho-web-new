import React, { Component } from 'react';
import './stockCompany.css';
class StockCompany extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="card-body">

                <div className="row">
                   <div className="col-lg-6 col-sm-6 col-xs-12">
                     <div style={{float:"left"}}><h4 className="header-title f-20 header-title-left text-color">Company</h4></div>
                   </div>
                   <div className="col-lg-6 col-sm-6 col-xs-12">
                     <div style={{float:"right"}}><button type="button" className="btn btn-primary btn-facebook header-title-right ">facebook</button></div>
                   </div>
                </div>
                   
                    {/* name start */}
                    <div className="row top-margin">
                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <table className="table table-sm table-centered white-last last-right mb-0">
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td className="text-color">Facebook Inc.</td>
                                    </tr>
                                    <tr>
                                        <td>CEO</td>
                                        <td className="text-color">Facebook Inc.</td>
                                    </tr>
                                    <tr>
                                        <td>Industry</td>
                                        <td className="text-color">Facebook Inc.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <table className="table table-sm table-centered white-last last-right mb-0">
                                <tbody>
                                    <tr>
                                        <td>Sector</td>
                                        <td className="text-color">Technology</td>
                                    </tr>
                                    <tr>
                                        <td>Exchange</td>
                                        <td className="text-color">Technology</td>
                                    </tr>
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* name end */}

                   
                    <h4 className="header-title f-20 text-color">Description</h4>

                    <div className="News-header-section">
                        <p className="news-topbar text-color">Facebook Inc is the world largest online social network. Its products are Facebook, Instagram, Messenger, WhatsApp, and Oculus. Its products enable people to connect and share through mobile devices and personal computers.</p>
                    </div>

                    <h4 className="header-title f-20 text-color">Dividends (1-year)</h4>

                    {/* date first start */}
                    <div className="row top-margin">
                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <table className="table table-sm table-centered last-right white-last mb-0">
                                <tbody>
                                    <tr>
                                        <td>2/15/2018</td>
                                        <td className="text-color">0.63</td>
                                    </tr>
                                    <tr>
                                        <td>11/16/2017</td>
                                        <td className="text-color">0.63</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <table className="table table-sm table-centered white-last last-right mb-0">
                                <tbody>
                                    <tr>
                                        <td>8/17/2017</td>
                                        <td className="text-color">0.63</td>
                                    </tr>
                                    <tr>
                                        <td>5/18/2017</td>
                                        <td className="text-color">0.63</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* date first end */}

                   


                    <h4 className="header-title f-20 text-color">Splits (5-Year)</h4>

                    {/* date first start */}
                    <div className="row top-margin">
                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <table className="table table-sm table-centered last-right white-last mb-0">
                                <tbody>
                                    <tr>
                                        <td>2/15/2018</td>
                                        <td className="text-color">0.63</td>
                                    </tr>
                                    <tr>
                                        <td>11/16/2017</td>
                                        <td className="text-color">0.63</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-lg-6 col-sm-6 col-xs-12">
                            <table className="table table-sm table-centered last-right white-last mb-0">
                                <tbody>
                                    <tr>
                                        <td>8/17/2017</td>
                                        <td className="text-color">0.63</td>
                                    </tr>
                                    <tr>
                                        <td>5/18/2017</td>
                                        <td className="text-color">0.63</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* date first end */}

                  
                    <h4 className="header-title f-20 text-color">NEWS</h4>

                    {/* first Image start */}
                    <div className="news-section-company">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 b-c-g bg-color ">
                                <img src="" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="News-header-section">
                                    <h3 className="news-heading font-14 text-color">General Electric Takes Another Dive; IBM's Golden Goose Explained -- ICYMI</h3>
                                    <p className="news-topbar">January 12, 2019 1:45 PM | Seeking Alpha</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* first Image end */}
                    <hr className="hr-company"></hr>
                    {/* second Image start */}
                    <div className="news-section-company">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 b-c-g bg-color">
                                <img src="" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="News-header-section">
                                    <h3 className="news-heading font-14 text-color">General Electric Takes Another Dive; IBM's Golden Goose Explained -- ICYMI</h3>
                                    <p className="news-topbar">January 12, 2019 1:45 PM | Seeking Alpha</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <hr className="hr-company"></hr>
                    {/* second Image end */}

                    {/* second Image start */}
                    <div className="news-section-company">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 b-c-g bg-color ">
                                <img src="" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="News-header-section">
                                    <h3 className="news-heading font-14 text-color">General Electric Takes Another Dive; IBM's Golden Goose Explained -- ICYMI</h3>
                                    <p className="news-topbar">January 12, 2019 1:45 PM | Seeking Alpha</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* second Image end */}
                </div>
            </div>

        );
    }
}

export default StockCompany;