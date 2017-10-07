import React from 'react';
import ReactDOM from 'react-dom';

import SearchForm from '../components/SearchForm';
import GIFResults from '../components/GIFResults';
import Error from '../components/Error'

class ResultsPage extends React.Component {
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
            showError: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchNextPage = this.fetchNextPage.bind(this);
    }
    componentDidMount() {
        this.fetchSearchedGIFs();
    }
    fetchSearchedGIFs(){
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
        }, () => this.fetchSearchedGIFs());
    }
    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
    handleSubmit(event){
        event.preventDefault();
        this.fetchSearchedGIFs();

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
            <button className = "nextPage" onClick={this.fetchNextPage}>Next Page</button>
            <GIFResults 
            searchedGIFs={this.state.searchedGIFs}
            />
        </div>
      )
    }
}

ResultsPage.contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  };

export default ResultsPage;