import React, {Component} from 'react';

import DisplayGIFs from '../components/DisplayGIFs';
import MoreInfo from '../components/MoreInfo';

import { trendingAPIcall } from '../utils/http';

class TrendingGIFs extends Component {
    constructor(){
        super();
        this.state = ({
            GIFs: [],
            paginate: 0
        });

        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchPrevPage = this.fetchPrevPage.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        const { rating, limit } = this.props;
        // set statue of loading to true

        let  GIFsArray = [];
        trendingAPIcall(rating, this.state.paginate, limit)
        .then(json => {
            json.data.map((item, i) => {
                GIFsArray.push(item)
        })
            this.setState({ 
                GIFs: GIFsArray
                // change state of loading to false 
            });
        });
    }
    fetchNextPage() {
        this.setState({
          paginate: this.state.paginate + this.props.limit
        }, () => this.fetchData());
    }
    fetchPrevPage() {
        this.setState({
          paginate: this.state.paginate - this.props.limit
        }, () => this.fetchData());
    }
    render(){
        return (
            <section className="trending">
                <div className="wrapper">
                    <div className="pageButtonContainer">
                        {this.state.paginate !== 0 || this.state.GIFs.length !== 0 ?  
                            <div className="pageButton">
                                <button className = "prevPage" name = "prevPage" onClick={this.fetchPrevPage}>
                                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                                </button>  
                                <label htmlFor="prevPage">Prev Page</label>
                            </div>
                        : null}
                        {this.state.GIFs.length === 10 ?  
                            <div className = "pageButton">
                                <button className = "nextPage align" name = "nextPage" onClick={this.fetchNextPage}>
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </button> 
                                <label htmlFor="nextPage">Next Page</label>
                            </div>
                        : null}
                    </div>
                    <div className="APIcallType">
                        <p className="APIcallType">Trending</p>
                    </div>
                    <div className="results">
                        <DisplayGIFs
                            GIFs={this.state.GIFs}
                            handleClick = {this.props.handleClick}
                        />
                    </div>
                </div>
            </section>
        )
    }
}

export default TrendingGIFs;