import React, { Component } from 'react';

class Spinner extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        var dataload = '';
        dataload = <img style={{ position: "absolute", transform: "translate(-50%,-50%)", width: '' + this.props.widthValue + 'px', left: '' + this.props.leftValue + '%', paddingTop: '' + this.props.topPaddingValue + '%' }} src='http://www.dariusland.com/images/load.gif' />
        return (
            <div> {dataload} </div>
        )
    }
}

export default Spinner;