import React from 'react';
import ReactDOM from 'react-dom';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink, Redirect, BrowserHistory } from 'react-router-dom';
import Home from '../scripts/components/Home';
import firebase, { auth, provider } from '../scripts/components/firebase';


class App extends React.Component {   
    constructor(){
      super();
      this.state = ({
        user: null
      });

      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }
    componentDidMount() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } 
      });
    }
    handleChange(event){
      this.setState({
        [event.target.name]: event.target.value
      });
    }
    logout() {
      auth.signOut()
        .then(() => {
          this.setState({
            user: null
          });
        });
    }
    login() {
      auth.signInWithPopup(provider) 
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        });
    }
    render() {
      return (
        <Router history={BrowserHistory}>
          <div className="routerWrapper">
            <header>
              <div className="wrapper">
                <div className="title">
                  <h1>GIFify</h1>
                </div>
                <div className="user">
                  {this.state.user ?
                    <div>
                      <div className='user-profile'>
                        <img src={this.state.user.photoURL} />
                         <button onClick={this.logout}>Log Out</button>
                      </div>
                    </div>
                    :
                    <button onClick={this.login}>Log In</button> 
                  }
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