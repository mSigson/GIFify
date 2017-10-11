import React, {Component} from 'react';
import firebase from 'firebase';
// import StarRatings from 'react-star-ratings';

class MoreInfo  extends Component {
    constructor(){
        super();
        this.state ={
            chosenGif: [],
            // starCount: 3.5,
            liked: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        console.log('hello');
        event.preventDefault();

		const dbRef = firebase.database().ref('/topGIFs');
		const newGIF = {
            url: this.props.chosenGifGiphyUrl,
            images: {
                fixed_height: {
                    url: this.props.chosenGifSrc
                }
            },
            embed_url: this.props.chosenGifEmbedUrl,
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
                    {this.state.liked ? 
                        <button onClick={this.handleSubmit}>Like</button>
                    : 
                        <ThankYouForLiking />
                    }
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