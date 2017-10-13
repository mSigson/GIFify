import React from 'react';
import ReactDOM from 'react-dom';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink, Redirect, BrowserHistory } from 'react-router-dom';
import firebase, { auth, provider } from '../scripts/components/firebase';
  
import Welcome from '../scripts/components/Welcome';
import Home from '../scripts/components/Home';

class App extends React.Component { 
    constructor(){
      super();
      this.state = {
        welcomePage: true
      };

      this.handleClick = this.handleClick.bind(this);
    }  
    handleClick(event){
      event.preventDefault();

      this.setState({
        welcomePage: false
      });
    }
    render() {
      return (
          <div className="parentWrapper">
            <header>
              <div className="wrapper">
                <div className="title">
                  <h1>GIFify</h1>
                </div>
              </div>
            </header>
            { this.state.welcomePage ?
              <Welcome handleClick = {this.handleClick} />
            :
              <Home />
            }
            <footer>
              <div className = "copyright">
                  <p>Developed by Maren Sigson</p>
              </div>
            </footer>
          </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));