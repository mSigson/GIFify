import React, {Component} from 'react';

import DisplayGIFs from '../components/DisplayGIFs';
import MoreInfo from '../components/MoreInfo';

class TrendingGIFs extends Component {
    constructor() {
        super();
        this.state = {
            apikey: `PJkH4zdW92Rb3d981TZsvHKBUTbFJZrL`,
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
        let  searchedGIFsArray = [];
        fetch(`http://api.giphy.com/v1/gifs/trending?rating=${this.state.rating}&offset=${this.state.paginate}&api_key=${this.state.apikey}&limit=${this.state.limit}`)
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
    render(){
        return (
            <section className="trending">
                <h2>Trending GIFs</h2>
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
                    /> 
                : null}
            </section>
        )
    }
}

export default TrendingGIFs;