import React from 'react';
import ReactDOM from 'react-dom';

import SearchForm from '../components/SearchForm';
import GIFResults from '../components/GIFResults';

class ResultsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            keywords: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();

        const grabKeywords = this.state.keywords
        localStorage.setItem("keywords", grabKeywords);

        location.reload();

    }
    handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
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
            <GIFResults />
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