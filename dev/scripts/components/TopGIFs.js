import React from 'react';
import firebase from '../components/firebase.js';

import DisplayGIFs from '../components/DisplayGIFs';

class TopGIFs extends React.Component {
    constructor() {
        super();
        this.state = {
            GIFs: [],
        };
    }
    componentDidMount() {
    }
    render(){
        return (
            <section className="topGIFs">
                <DisplayGIFs
                    GIFs={this.state.GIFs}
                    handleClick = {this.props.handleClick}
                />
            </section>
        )
    }
}

export default TopGIFs;