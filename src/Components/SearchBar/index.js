import React, { Component } from 'react';
import {FormControl} from 'react-bootstrap';
import autobind from 'react-autobind';

export default class SearchComponent extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state ={
            searchTerm: ''
        };
    }

    _onSubmit(evt) {
        evt.preventDefault();
        this.props.onSearch(this.input.value);
    }

    render() {
        return (
            <form className='search-bar'  onSubmit={this._onSubmit}>
                <FormControl
                    inputRef={ref => { this.input = ref; }}
                    type="text"
                    placeholder="Enter text"
                />
            </form>
        )
    }
}