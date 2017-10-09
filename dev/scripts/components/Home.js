import React from 'react';
import ReactDOM from 'react-dom';

import SearchForm from '../components/SearchForm';
import TrendingGIFs from '../components/TrendingGIFs';

import { trendingAPIcall } from '../utils/http';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            searchedGIFs: [],
            limit: 10,
            paginate: 0,
            rating: "g",
            showMoreInfo: false,
            chosenGifSrc: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchPrevPage = this.fetchPrevPage.bind(this);
        this.hideMoreInfo = this.hideMoreInfo.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        const { rating, paginate, limit } = this.state;

        // set statue of loading to true

        let  searchedGIFsArray = [];
        trendingAPIcall(rating, paginate, limit)
        .then(json => {
            json.data.map((item, i) => {
                searchedGIFsArray.push(item)
        })
            this.setState({ 
                searchedGIFs: searchedGIFsArray
                // change state of loading to false 
            });
        });
    }
    fetchNextPage() {
        this.setState({
          paginate: this.state.paginate + this.state.limit
        }, () => this.fetchData());
    }
    fetchPrevPage() {
        this.setState({
          paginate: this.state.paginate - this.state.limit
        }, () => this.fetchData());
    }
    handleClick(event, src, giphyUrl, embedUrl){
       event.preventDefault();

       this.setState({
           showMoreInfo: true,
           chosenGifSrc: src,
           chosenGifGiphyUrl: giphyUrl,
           chosenGifEmbedUrl: embedUrl
        })
    }
    hideMoreInfo(){
        this.setState({
            showMoreInfo: false
         })
    }
    render() {
      return (
        <div className="wrapper">
            <SearchForm 
            handleChange={this.handleChange} 
			handleSubmit={this.handleSubmit} 
			keywords={this.state.keywords}
            />
            <TrendingGIFs 
                paginate = {this.state.paginate}
                searchedGIFs = {this.state.searchedGIFs}
                fetchPrevPage = {this.fetchPrevPage}
                fetchNextPage = {this.fetchNextPage}
            />
            {this.state.showMoreInfo ? 
                <MoreInfo 
                    chosenGifSrc={this.state.chosenGifSrc} 
                    chosenGifGiphyUrl={this.state.chosenGifGiphyUrl}
                    chosenGifEmbedUrl={this.state.chosenGifEmbedUrl}
                    hideMoreInfo={this.hideMoreInfo}
                /> 
            : null}
        </div>
      )
    }
}

Home.contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  };

export default Home;