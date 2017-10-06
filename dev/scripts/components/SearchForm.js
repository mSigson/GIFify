import React, {Component} from 'react';

class SearchForm extends React.Component {
    render() {
        return(
            <div className="wrapper">
                <h2>Search</h2>
                <form onSubmit={this.props.handleSubmit}>
                    <label htmlFor="keywords">Keyword</label>
                    <input type="text" name="keywords" id="keywords" onChange={this.props.handleChange} />
                </form>
            </div>
        )
    }
}

export default SearchForm;