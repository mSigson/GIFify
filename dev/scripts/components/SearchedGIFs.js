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
                GIFs: GIFsArray,
                loading: false
            });
            setTimeout(this.showError(), 3000);     
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
                            {this.props.paginate !== 0 ?  
                                <div className="pageButton">
                                    <label htmlFor="prevPage">Prev Page</label>
                                    <button className = "prevPage" name = "prevPage" onClick={this.fetchPrevPage}>
                                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                                    </button>  
                                </div>
                            : null}
                            {this.state.GIFs.length === 10 ?  
                                <div className = "pageButton">
                                    <button className = "nextPage" name = "nextPage" onClick={this.fetchNextPage}>
                                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                                    </button> 
                                    <label htmlFor="nextPage">Next Page</label>
                                </div>
                            : null}
                        </div>
                    <div className="APIcallType">
                        <p className="APIcallType">Searched</p>
                    </div>
                    {this.state.loading ? 
                        <Loader />
                    :   <DisplayGIFs
                            GIFs={this.state.GIFs}
                            handleClick = {this.props.handleClick}
                        /> 
                    }
                    {this.state.GIFs.length === 0 ? 
                        <Error />
                    : null }
                </div>
            </section>
        )
    }
}

export default SearchedGIFs;