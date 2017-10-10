import React from 'react';
import ReactDOM from 'react-dom';

import DisplayGIFs from '../components/DisplayGIFs';
import Error from '../components/Error';

import { searchAPIcall } from '../utils/http';

class SearchedGIFs extends React.Component {
    constructor() {
        super();
        this.state = {
            GIFs: [],
            showError: false
        };

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
        const {keywords, rating, paginate, limit } = this.props;

        // set statue of loading to true

        let  GIFsArray = [];
        searchAPIcall(keywords, rating, paginate, limit)
        .then(json => {
            json.data.map((item, i) => {
                GIFsArray.push(item)
        })
            this.setState({ 
                GIFs: GIFsArray
                // change state of loading to false 
            });
            this.showError();     
        });
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
            <section className="trending">
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
                    handleClick = {this.props.handleClick}
                />
                {this.state.GIFs.length === 0 ? 
                    <Error />
                : null}
            </section>
        )
    }
}

export default SearchedGIFs;