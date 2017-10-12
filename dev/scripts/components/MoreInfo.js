import React, {Component} from 'react';
import firebase from 'firebase';
// import $ from 'jquery'; 


// *star 
// import StarRatings from 'react-star-ratings'; ==> had 'Error: Couldn't find preset "stage-0" relative to directory' errors preventing use but this is the logic behind if it had worked to store the rating them push that into the database

import Liked from '../components/Liked';

class MoreInfo  extends Component {
    constructor(){
        super();
        this.state ={
            firebaseGIFs: [],
            // *star 
            // starCount: 3.5,
            liked: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkIfGIFinDB = this.checkIfGIFinDB.bind(this);
        this.addToDatabase = this.addToDatabase.bind(this);
    }
    componentWillMount() {
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
                firebaseGIFs : newGIFsArray,
                canAddGIF: false,
                liked: false
            });	
        });
        
    }
    componentDidMount(){
        this.checkIfGIFinDB();
    }
    handleSubmit(event){
        event.preventDefault();

        console.log('submitted')
        if (this.state.canAddGIF === true) {
            this.addToDatabase();
        } else {
            console.log('no submission');
        }

        this.setState({
            liked: true
        })

        //  attempted PUT request to API
        //  $.ajax({
        //         url: '/api/rankedgifs',
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json'
        //         },
        //         data: JSON.stringify(data),
        //     });


    }
    checkIfGIFinDB(){
        const chosenGIF = this.props.chosenGifEmbedUrl
        const dbGIF = this.state.firebaseGIFs
        

        // attempt to prevent database from uploading same GIF twice 
        // for(let i = 0; i < dbGIF.length; i++) {
        //     if (chosenGIF === dbGIF[i].embed_url){
        //         this.setState({
        //             canAddGIF: false
        //         });
        //     } else {
        //         this.setState({
        //             canAddGIF: true
        //         });
        //     }
        // }
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
            // *star 
            // rating: this.state.rating
            }
        dbRef.push(newGIF);
    }
    // *star 
    // react-star-ratings
    // changeRating( newRating ) {
    //     this.setState({
    //       rating: newRating
    //     });
    //   }
    componentWillUnmount(){
        this.setState({
            canAddGIF: false,
            liked: false
        });
    }
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
                            <div className="links">
                                <p>Send to a friend! Copy the link below:</p>
                                <input defaultValue={this.props.chosenGifSrc} />
                            </div>
                            <div className="links">
                                <p>Embed in your own website! Copy the link below: </p>
                                <input defaultValue={this.props.chosenGifEmbedUrl} />
                            </div>
                        </div>
                    </div>
                    <div className="likeButtonContainer">
                        <button className="likeButton" onClick={this.handleSubmit}>Like</button>
                    </div>
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