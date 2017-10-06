import React from 'react';
import ReactDOM from 'react-dom';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink, Redirect, BrowserHistory } from 'react-router-dom';

import Home from '../scripts/components/Home';
import ResultsPage from '../scripts/components/ResultsPage';

class App extends React.Component {    
    render() {
      return (
        <Router history={BrowserHistory}>
          <div className="wrapper">
			        <header>
                <h1>GIFify</h1>
              </header>
              <Route exact path="/" component={Home} />
              <Route exact path="/results" component={ResultsPage} />
          </div>
        </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));