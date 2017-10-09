import React, {Component} from 'react';

import DisplayGIFs from '../components/DisplayGIFs';
import MoreInfo from '../components/MoreInfo';

class TrendingGIFs extends Component {
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
                    {this.props.searchedGIFs.length === 10 ?  
                        <button className = "nextPage" onClick={this.props.fetchNextPage}>
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                        </button> 
                    : null}
                </div>
                <DisplayGIFs
                    searchedGIFs={this.props.searchedGIFs}
                    handleClick = {this.handleClick}
                />
            </section>
        )
    }
}

export default TrendingGIFs;