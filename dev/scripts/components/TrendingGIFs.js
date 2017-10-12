import React, {Component} from 'react';

import DisplayGIFs from '../components/DisplayGIFs';
import MoreInfo from '../components/MoreInfo';
import Loader from '../components/Loader';

import { trendingAPIcall } from '../utils/http';

class TrendingGIFs extends Component {
    constructor(){
        super();
        this.state = ({
            GIFs: [],
            paginate: 0,
            page: 1
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
            });
            setTimeout(() => {this.setState({loading: false})}, 1000);   
        });
    }
    fetchNextPage() {
        this.setState({
          paginate: this.state.paginate + this.props.limit,
          page: this.state.page + 1
        }, () => this.fetchData());
    }
    fetchPrevPage() {
        if(this.state.page > 1){
            this.setState({
              paginate: this.state.paginate - this.props.limit,
              page: this.state.page - 1
            }, () => this.fetchData());
        }
    }
    render(){
        return (
            <section className="trending">
                <div className="wrapper">
                    <div className="pageButtonContainer"> 
                        <div className="pageButton">
                            <button className = "prevPage" name = "prevPage" onClick={this.fetchPrevPage}>
                                <i className="fa fa-angle-left" aria-hidden="true"></i>
                            </button>  
                            <label htmlFor="prevPage">Prev Page</label>
                        </div>
                        <div className="APIcallType">
                            <h2 className="APIcallType">Trending</h2>
                        </div>
                        {this.state.GIFs.length === 10 ?  
                            <div className = "pageButton">
                                <button className = "nextPage align" name = "nextPage" onClick={this.fetchNextPage}>
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </button> 
                                <label htmlFor="nextPage">Next Page</label>
                            </div>
                        : null}
                    </div>
                    <p className="page">Page {this.state.page}</p>
                    <div className="results">
                        {this.state.loading ? 
                            <Loader />
                        :   <DisplayGIFs
                                GIFs={this.state.GIFs}
                                handleClick = {this.props.handleClick}
                            /> 
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default TrendingGIFs;