import React, {Component} from 'react';

class SearchGIFs extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }
    render() {
        return(
            <div className="wrapper">
                <h2>Search</h2>
                <form>
                    <label for="keyword">Keyword</label>
                    <input type="text" id="keyword" />
                </form>
            </div>
        )
    }
}

export default SearchGIFs;