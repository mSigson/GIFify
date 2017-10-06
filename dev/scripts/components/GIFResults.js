import React from 'react';

import SearchForm from './SearchForm.js';

class GIFResults extends React.Component {
    constructor(){
        super();
        this.state = {
            apikey: `PJkH4zdW92Rb3d981TZsvHKBUTbFJZrL`,
            chosenKeywords: localStorage.getItem("keywords"),
            searchedGIFs: [],
            limit: 10,
            paginate: 0,
            rating: "g"
        }
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.fetchSearchedGIFs();
    }
   fetchSearchedGIFs(){
    let searchedGIFsArray = [];
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
    }
    handleSubmit(event){
        event.preventDefault();

        const grabKeywords = this.state.keywords
        localStorage.setItem("keywords", grabKeywords);

        this.context.router.history.push('/results');

    }
    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
    render(){
        return (
            <div className="Results">
                <div className="wrapper">
                    <h2>Searched GIFs</h2>
                    <div className="searchedGIFsContainer">
                        <button onClick={this.fetchNextPage}>Next Page</button>
                        {this.state.searchedGIFs.map((item, i) => {
                            return (
                                <div className="searchedGIF" key={item.id}>
                                    <img src={`${item.images.fixed_height.url}`} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default GIFResults;