import React, {Component} from 'react';

import DisplayGIFs from '../components/DisplayGIFs';
import MoreInfo from '../components/MoreInfo';

import { trendingAPIcall } from '../utils/http';

class TrendingGIFs extends Component {
    constructor(){
        super();
        this.setState = ({
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
                <h2>Trending GIFs</h2>
                <div className="pageButtons">
                    {this.props.paginate !== 0 ?  
                        <button className = "prevPage" onClick={this.props.fetchPrevPage}>
                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                        </button>  
                    : null}
                    {this.state.GIFs.length === 10 ?  
                        <button className = "nextPage" onClick={this.props.fetchNextPage}>
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </button> 
                    : null}
                </div>
                <DisplayGIFs
                    GIFs={this.state.GIFs}
                    handleClick = {this.handleClick}
                />
            </section>
        )
    }
}

export default TrendingGIFs;