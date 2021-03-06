import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import Welcome from '../components/Welcome';
import SearchForm from '../components/SearchForm';
import TrendingGIFs from '../components/TrendingGIFs';
import SearchedGIFs from '../components/SearchedGIFs';
import TopGIFs from '../components/TopGIFs';
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
            showWelcome: true,
            showTrendingGIFs: false,
            showSearchedGIFs: false,
            showMoreInfo: false,
            showTopGIFs: false        
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.goToTrending = this.goToTrending.bind(this);
        this.goToTop = this.goToTop.bind(this);
        
        this.hideMoreInfo = this.hideMoreInfo.bind(this);
    }
    componentDidMount(){
        this.goToTrending();
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
            showTopGIFs: false,
            showWelcome: false,
            showSearchedGIFs: true
        });
    }
    hideMoreInfo(){
        this.setState({
            showMoreInfo: false
         });
    }
    goToTrending(){
        this.setState({
            showTrendingGIFs: true,
            showSearchedGIFs: false,
            showTopGIFs: false,
            showWelcome: false
        })
    }
    goToTop(){
        this.setState({
            showTrendingGIFs: false,
            showSearchedGIFs: false,
            showTopGIFs: true,
            showWelcome: false
        })
    }
    render() {
      return (
        <div className="wrapper">
            <nav className="navigation">
                <button className = "goTo" onClick = {this.goToTrending}>Trending</button>
                <div className="searchForm">
                    <SearchForm 
                        handleChange={this.handleChange} 
                        handleSubmit={this.handleSubmit} 
                    />
                </div>
                <button className = "goTo" onClick = {this.goToTop}>Top GIFs</button>
            </nav>
            {this.state.showWelcome ?
                <Welcome />
            :    
                null
            }

            {this.state.showTrendingGIFs ?
                <TrendingGIFs 
                    rating = {this.state.rating}
                    limit = {this.state.limit}
                    handleClick = {this.handleClick}
                />
            : 
                null
            }
            {this.state.showSearchedGIFs ? 
                <SearchedGIFs 
                    keywords = {this.state.keywords}
                    rating = {this.state.rating}
                    limit = {this.state.limit}
                    handleClick = {this.handleClick}
                />
            : 
                null
            }
            {this.state.showTopGIFs ? 
                <TopGIFs 
                    handleClick = {this.handleClick}
                />
            : 
                null
            }
            {this.state.showMoreInfo ? 
                <MoreInfo 
                    chosenGifSrc={this.state.chosenGifSrc} 
                    chosenGifGiphyUrl={this.state.chosenGifGiphyUrl}
                    chosenGifEmbedUrl={this.state.chosenGifEmbedUrl}
                    hideMoreInfo={this.hideMoreInfo}
                    likeGIF={this.likeGIF}
                /> 
            : 
                null
            }
        </div>
      )
    }
}

export default Home;