import React, {Component} from 'react';

import DisplayGIFs from '../components/DisplayGIFs';
import MoreInfo from '../components/MoreInfo';

import { trendingAPIcall } from '../utils/http';

class TrendingGIFs extends Component {
    constructor(){
        super();
        this.state = ({
            GIFs: []
        });
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        const { rating, paginate, limit } = this.props;
        // set statue of loading to true

        let  GIFsArray = [];
        trendingAPIcall(rating, paginate, limit)
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
    render(){
        return (
            <section className="trending">
                <div className="wrapper">
                    <div className="pageButtonContainer">
                        {this.props.paginate !== 0 ?  
                            <div className="pageButton">
                                <label htmlFor="prevPage">Prev Page</label>
                                <button className = "prevPage" name = "prevPage" onClick={this.props.fetchPrevPage}>
                                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                                </button>  
                            </div>
                        : null}
                        {this.state.GIFs.length === 10 ?  
                            <div className = "pageButton">
                                <button className = "nextPage" name = "nextPage" onClick={this.props.fetchNextPage}>
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </button> 
                                <label htmlFor="nextPage">Next Page</label>
                            </div>
                        : null}
                    </div>
                    <DisplayGIFs
                        GIFs={this.state.GIFs}
                        handleClick = {this.props.handleClick}
                    />
                </div>
            </section>
        )
    }
}

export default TrendingGIFs;