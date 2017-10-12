import React from 'react';
import firebase from './firebase';

import DisplayGIFs from '../components/DisplayGIFs';
import Loader from '../components/Loader';

class TopGIFs extends React.Component {
    constructor() {
        super();
        this.state = {
            GIFs: [],
            loading: true
        };
    }
    componentDidMount() {
        const dbRef = firebase.database().ref('/topGIFs');
        dbRef.on('value', (snapshot) => {
			const newGIFsArray = [];
			const firebaseItems = snapshot.val();
			for(let key in firebaseItems) {
				const firebaseItem = firebaseItems[key];
				firebaseItem.id = key;
				newGIFsArray.push(firebaseItem);
			}
			this.setState({	
                GIFs : newGIFsArray,
                loading: false
			});	
        });
    }
    render(){
        return (
            <section className = "topGIFs">
                <div className="wrapper">
                    <div className="APIcallType">
                            <h2 className="APIcallType">Top GIFs</h2>
                        </div>
                    <div className="results">
                        {this.state.loading ? 
                            <Loader />
                        :   <DisplayGIFs
                                GIFs={this.state.GIFs}
                                handleClick = {this.props.handleClick}
                            /> 
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default TopGIFs;