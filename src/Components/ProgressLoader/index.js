import React, { Component } from 'react';
import  { RingLoader } from 'react-spinners';

export default class ProgressLoader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='surf-loader'>
                <RingLoader loading={this.props.loading} />
            </div>
        )
    }
}