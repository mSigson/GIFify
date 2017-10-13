import React from 'react';
import ReactDOM from 'react-dom';

import DisplayGIFs from '../components/DisplayGIFs';
import Error from '../components/Error';
import Loader from '../components/Loader';

import { searchAPIcall } from '../utils/http';

class SearchedGIFs extends React.Component {
    constructor() {
        super();
        this.state = {
            GIFs: [],
            paginate: 0,
            page: 1,
            loading: true,
            showError: false
        };

        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchPrevPage = this.fetchPrevPage.bind(this);
        this.showError = this.showError.bind(this);
    }
    componentDidMount() {
        this.fetchData();        
    }
    componentWillReceiveProps(newKeywords) {
        if(this.props.keywords !== newKeywords.keywords){
            this.fetchData();
            this.setState({
                page: 1
            });
        }
    } 
    fetchData() {
        const {keywords, rating, limit } = this.props;
        
        this.setState({
            loading: true
        });

        let  GIFsArray = [];
        searchAPIcall(keywords, rating, this.state.paginate, limit)
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
    showError(){
        if(this.state.GIFs.length === 0){
            this.setState({ 
                showError: true
            });  
        }
    }
    render(){
        return (
            <section className="searchedGIFs">
                <div className="wrapper">
                    <div className="pageButtonContainer"> 
                        {this.state.GIFs.length > 0 ?  
                            <div className="pageButton">
                                <button className = "prevPage" name = "prevPage" onClick={this.fetchPrevPage}>
                                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                                </button>  
                                <label htmlFor="prevPage">Prev Page</label>
                            </div>
                        :
                            null
                        }
                        <div className="APIcallType">
                            <h2 className="APIcallType">{this.props.keywords}</h2>
                        </div>
                        {this.state.GIFs.length === 10 ?  
                            <div className = "pageButton">
                                <button className = "nextPage align" name = "nextPage" onClick={this.fetchNextPage}>
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </button> 
                                <label htmlFor="nextPage">Next Page</label>
                            </div>
                        : 
                            null
                        }
                    </div>
                    { this.state.GIFs.length > 0?
                        <p className="page">Page {this.state.page}</p>
                    :
                        null
                    }
                    <div className="results">
                        {this.state.loading ? 
                            <Loader />
                        :   <DisplayGIFs
                                GIFs={this.state.GIFs}
                                handleClick = {this.props.handleClick}
                            /> 
                        }
                        {this.state.GIFs.length === 0 && this.state.loading === false ? 
                            <Error />
                        : null }
                    </div>
                </div>
            </section>
        )
    }
}

export default SearchedGIFs;