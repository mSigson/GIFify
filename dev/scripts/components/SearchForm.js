import React, {Component} from 'react';

class SearchForm extends React.Component {
    render() {
        return(
            <section className="searchForm">
                <form onSubmit={this.props.handleSubmit}>
                    <label htmlFor="keywords">Keyword</label>
                    <input type="text" name="keywords" id="keywords" onChange={this.props.handleChange} />
                    <button type="submit" name="search" id="search" onClick={this.props.handleSubmit}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </form>
            </section>
        )
    }
}

export default SearchForm;