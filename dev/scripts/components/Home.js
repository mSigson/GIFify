import React from 'react';
import ReactDOM from 'react-dom';

import SearchForm from '../components/SearchForm';
import TrendingGIFs from '../components/TrendingGIFs';
import SearchedGIFs from '../components/SearchedGIFs';
import MoreInfo from '../components/MoreInfo';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            keywords: "",
            limit: 10,
            paginate: 0,
            rating: "g",
            chosenGifSrc: '',
            showTrendingGIFs: true,
            showSearchedGIFs: false,
            showMoreInfo: false,
            
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchPrevPage = this.fetchPrevPage.bind(this);
        
        this.hideMoreInfo = this.hideMoreInfo.bind(this);
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
    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
    handleClick(event, src, giphyUrl, embedUrl){
       event.preventDefault();
       this.setState({
           showMoreInfo: true,
           chosenGifSrc: src,
           chosenGifGiphyUrl: giphyUrl,
           chosenGifEmbedUrl: embedUrl
        });
    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({
            showTrendingGIFs: false,
            showSearchedGIFs: true
        });
    }
    hideMoreInfo(){
        this.setState({
            showMoreInfo: false
         });
    }
    render() {
      return (
        <div className="wrapper">
            <SearchForm 
                handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit} 
            />
            {this.state.showTrendingGIFs ?
                <TrendingGIFs 
                    rating = {this.state.rating}
                    limit = {this.state.limit}
                    paginate = {this.state.paginate}
                    fetchPrevPage = {this.fetchPrevPage}
                    fetchNextPage = {this.fetchNextPage}
                    handleClick = {this.handleClick}
                />
            : null}
            {this.state.showSearchedGIFs ? 
                <SearchedGIFs 
                    keywords = {this.state.keywords}
                    rating = {this.state.rating}
                    limit = {this.state.limit}
                    paginate = {this.state.paginate}
                    fetchPrevPage = {this.fetchPrevPage}
                    fetchNextPage = {this.fetchNextPage}
                    handleClick = {this.handleClick}
                />
            : null}
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

export default Home;