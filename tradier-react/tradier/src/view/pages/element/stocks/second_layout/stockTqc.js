import React, { Component } from 'react';
import './stockTqc.css'

import StockTrade from './stockTrade';
import StockCompany from './stockCompany';
import StockQuote from './stockQuote';
class StockTqc extends Component {

    constructor(props) {
        super(props);
    }
    render() {
     // console.log('hggggggggggggggggggggj:',this.props.quoteData);
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-xl-6 pad-5">
                        <div className="card black-background card-border">
                            <StockTrade pageSymbol={this.props.pageSymbol}  quoteData={this.props.quoteData} />
                        </div>
                        <div className="card black-background card-border">
                            <StockCompany pageSymbol={this.props.pageSymbol} />
                        </div>
                    </div>
                    <div className="col-xl-6 pad-5 ">
                        <div className="card card-topCahrtAccountStockTqc black-background card-border"  >
                            <StockQuote pageSymbol={this.props.pageSymbol} />
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-xl-6 pad-5">

                        <div className="card">
                            <StockCompany />
                        </div>
                    </div>
                </div>
        */}
            </div>
        );
    }
}

export default StockTqc;