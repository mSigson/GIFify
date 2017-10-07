import React from 'react';
import ReactDOM from 'react-dom';

import SearchForm from '../components/SearchForm';
import GIFResults from '../components/GIFResults';

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
    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
    handleSubmit(event){
        event.preventDefault();

        const grabKeywords = this.state.keywords
        localStorage.setItem("keywords", grabKeywords);

        this.updateResults();

    }
    updateResults(){

        let searchedGIFsArray = [];

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
    render() {
      return (
        <div className="wrapper">
            <SearchForm 
            handleChange={this.handleChange} 
			handleSubmit={this.handleSubmit} 
			keywords={this.state.keywords}
            />
            <GIFResults 
            fetchSearchedGIFs={this.fetchSearchedGIFs}
            updateResults={this.updateResults}
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