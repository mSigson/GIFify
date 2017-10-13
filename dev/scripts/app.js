import React from 'react';
import ReactDOM from 'react-dom';
import firebase from '../scripts/components/firebase';
  
import Home from '../scripts/components/Home';

class App extends React.Component { 
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
            <Home />
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