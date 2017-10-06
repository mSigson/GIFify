import React, {Component} from 'react';

class TrendingGIFs extends Component {
    constructor() {
        super();
        this.state = {
            apikey: `PJkH4zdW92Rb3d981TZsvHKBUTbFJZrL`,
            trendingGIFs: [],
            limit: 10,
            paginate: 0,
            rating: "g"
        };

        this.handleClick = this.handleClick.bind(this);
        this.fetchNextPage = this.fetchNextPage.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        let trendingGIFsArray = [];
        fetch(`http://api.giphy.com/v1/gifs/trending?rating=${this.state.rating}&offset=${this.state.paginate}&api_key=${this.state.apikey}&limit=${this.state.limit}`)
        .then(response => response.json())
        .then(json => {
            json.data.map((item, i) => {
                trendingGIFsArray.push(item)
        })
            this.setState({ 
                trendingGIFs: trendingGIFsArray
            });
        });
    }
    fetchNextPage() {
        this.setState({
          paginate: this.state.paginate + this.state.limit
        }, () => this.fetchData());
    }
    handleClick(event){
       event.preventDefault();
	}
    render(){
        return (
            <div className="wrapper">
                <h2>Trending GIFs</h2>
                <div className="GIFsContainer">
                    <button onClick={this.fetchNextPage}>Next Page</button>
                    {this.state.trendingGIFs.map((item, i) => {
                        return (
                            <div className="GIF" key={item.id}>
                                <img src={`${item.images.fixed_height.url}`} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default TrendingGIFs;