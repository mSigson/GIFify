import React, {Component} from 'react';
import firebase from 'firebase';
// import StarRatings from 'react-star-ratings';

import Liked from '../components/Liked';

class MoreInfo  extends Component {
    constructor(){
        super();
        this.state ={
            firebaseGIFs: [],
            // starCount: 3.5,
            liked: false,
            canAddToDB: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkIfGIFinDB = this.checkIfGIFinDB.bind(this);
        this.addToDatabase = this.addToDatabase.bind(this);
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
                firebaseGIFs : newGIFsArray
			});	
        });
    }
    handleSubmit(event){
        event.preventDefault();
        this.checkIfGIFinDB();
    }
    checkIfGIFinDB(){
        const chosenGIF = this.props.chosenGifEmbedUrl
        const dbGIF = this.state.firebaseGIFs

        for (let i = 0; i < dbGIF.length; i++) {
            if (chosenGIF === dbGIF[i].embed_url ){
                console.log('it exists');
            } else {
                this.addToDatabase();
            }
        }
    }
    addToDatabase(){
        const dbRef = firebase.database().ref('/topGIFs');
		const newGIF = {
            url: this.props.chosenGifGiphyUrl,
            images: {
                fixed_height: {
                    url: this.props.chosenGifSrc
                }
            },
            embed_url: this.props.chosenGifEmbedUrl
            // rating: this.state.rating
            }
        dbRef.push(newGIF);
            

    }

    // react-star-ratings
    // changeRating( newRating ) {
    //     this.setState({
    //       rating: newRating
    //     });
    //   }
    render(){
        return (
            <section id="moreInfo">
                <div className="moreInfoContainer">
                    <div className="Icon">
                        <i onClick={this.props.hideMoreInfo} className="fa fa-times"></i>
                    </div>
                    <div className="chosenGIF">
                        <div className="chosenGIFconatiner">
                            <img src={`${this.props.chosenGifSrc}`} />
                        </div>
                        <div className="info">
                            <p>Check it out this GIF on <a href={this.props.chosenGifGiphyUrl}>Giphy.com</a></p>
                        </div>
                    </div>
                    
                        <button onClick={this.handleSubmit}>Like</button>

                    {/* <StarRatings
                        rating={rating}
                        isSelectable={true}
                        isAggregateRating={false}
                        changeRating={this.changeRating}
                        numOfStars={ 5 }
                    /> */}
                </div>
            </section>
        )
    }
}

export default MoreInfo;