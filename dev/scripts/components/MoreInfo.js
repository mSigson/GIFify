import React, {Component} from 'react';
import firebase from 'firebase';

class MoreInfo  extends Component {
    constructor(){
        super();
        this.state ={
            chosenGif: []
        }
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
                        </div>
                    </div>
                    <button onClick={this.props.likeGIF}>Like</button>
                </div>
            </section>
        )
    }
}

export default MoreInfo;