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

        return (
            <div className="container ">
                <div className="row">
                    <div className="col-xl-6 pad-5">
                        <div className="card black-background card-border">
                            <StockTrade />
                        </div>
                        <div className="card black-background card-border">
                            <StockCompany />
                        </div>
                    </div>
                    <div className="col-xl-6 pad-5 ">
                        <div className="card card-topCahrtAccountStockTqc black-background card-border"  >
                            <StockQuote />
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