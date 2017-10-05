import React from 'react';
import ReactDOM from 'react-dom';

import SearchGIFs from '../scripts/components/SearchGIFs';
import TrendingGIFs from '../scripts/components/TrendingGIFs';

class App extends React.Component {
    render() {
      return (
        <div className="wrapper">
			<h1>GIFify</h1>
            <SearchGIFs />
            <TrendingGIFs />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));