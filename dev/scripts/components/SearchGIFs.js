import React from 'react';
import ReactDOM from 'react-dom';

import SearchForm from '../components/SearchForm';
import DisplayGIFs from '../components/DisplayGIFs';
import Error from '../components/Error';
import MoreInfo from '../components/MoreInfo';

class SearchGIFs extends React.Component {
    constructor(){
        super();
        this.state = {
            apikey: `PJkH4zdW92Rb3d981TZsvHKBUTbFJZrL`,
            chosenKeywords: localStorage.getItem("keywords"),
            keywords: '',
            searchedGIFs: [],
            limit: 10,
            paginate: 0,
            rating: "g",
            showError: false,
            showMoreInfo: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchPrevPage = this.fetchNextPage.bind(this);
        this.hideMoreInfo = this.hideMoreInfo.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData(){
        let searchedGIFsArray = [];

        if(this.state.keywords === ''){
            fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.chosenKeywords}&offset=${this.state.paginate}&api_key=${this.state.apikey}&limit=${this.state.limit}&rating=${this.state.rating}`)
            .then(response => response.json())
            .then(json => {
                json.data.map((item, i) => {
                    searchedGIFsArray.push(item)
            })
                this.setState({ 
                    searchedGIFs: searchedGIFsArray
                });
            });
        } else {
            fetch(`http://api.giphy.com/v1/gifs/search?q=${this.state.keywords}&offset=${this.state.paginate}&api_key=${this.state.apikey}&limit=${this.state.limit}&rating=${this.state.rating}`)
            .then(response => response.json())
            .then(json => {
                json.data.map((item, i) => {
                    searchedGIFsArray.push(item)
            })
                this.setState({ 
                    searchedGIFs: searchedGIFsArray
                });
            });
        }
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
			[event.target.name]: event.target.value
		});
	}
    handleSubmit(event){
        event.preventDefault();
        this.fetchData();
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
            {this.state.searchedGIFs.length === 0 ? <Error /> : null}
            <div className="pageButtons">
                {this.state.paginate !== 0 ?  
                    <button className = "prevPage" onClick={this.fetchPrevPage}>
                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </button>  
                : null}
                {this.state.searchedGIFs.length === 10 ?  
                    <button className = "nextPage" onClick={this.fetchNextPage}>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </button> 
                : null}
            </div>
            <DisplayGIFs 
                searchedGIFs={this.state.searchedGIFs}
                handleClick = {this.handleClick}
            />
            {this.state.showMoreInfo ? 
                <MoreInfo 
                    chosenGifSrc={this.state.chosenGifSrc} 
                    chosenGifGiphyUrl={this.state.chosenGifGiphyUrl}
                    chosenGifEmbedUrl={this.state.chosenGifEmbedUrl}
                    hideMoreInfo={this.hideMoreInfo}
                    handleClick = {this.handleClick}
                /> 
            : null}
        </div>
      )
    }
}

SearchGIFs.contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  };

export default SearchGIFs;