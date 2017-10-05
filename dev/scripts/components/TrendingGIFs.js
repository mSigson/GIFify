import React, {Component} from 'react';

class TrendingGIFs extends Component {
    constructor() {
        super();
        this.state = {
            apikey: `PJkH4zdW92Rb3d981TZsvHKBUTbFJZrL`,
            trendingGIFs: []
        };

        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        let trendingGIFsArray = [];
        fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${this.state.apikey}&limit=50`)
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
    handleClick(event){
       event.preventDefault();
	}
    render(){
        return (
            <div className="wrapper">
                <h2>Trending GIFs</h2>
                <div className="trendingGIFsContainer">
                    {this.state.trendingGIFs.map((item, i) => {
                        return (
                            <div className="trendingGIF" key={item.id}>
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