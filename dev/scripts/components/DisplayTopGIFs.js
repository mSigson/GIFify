import React from 'react';
import firebase from './firebase';

class DisplayTopGIFs extends React.Component {
    constructor() {
        super();
        this.state = {
            GIFs: [],
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
				GIFs : newGIFsArray
			});	
        });
    }
    render(){
        return (
            <section className="results">
                    {this.state.GIFs
                    .sort(function(a,b){
                        a.rating - b.rating
                    })
                    .map((item, i) => {
                        return (
                            <div className="GIF" key={item.id}>
                                <img src={`${item.url}`} />
                                {/* <p>Rating: {item.rating}</p> */}
                            </div>
                        )
                    })}
            </section>
        )
    }
}

export default DisplayTopGIFs;