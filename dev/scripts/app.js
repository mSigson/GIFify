import React from 'react';
import ReactDOM from 'react-dom';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink, Redirect, BrowserHistory } from 'react-router-dom';
import Home from '../scripts/components/Home';
import firebase, { auth, provider } from '../scripts/components/firebase';


class App extends React.Component {   
    render() {
      return (
        <Router history={BrowserHistory}>
          <div className="routerWrapper">
            <header>
              <div className="wrapper">
                <div className="title">
                  <h1>GIFify</h1>
                </div>
              </div>
            </header>
            <Home />
          </div>
        </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));