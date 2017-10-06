import React, {Component} from 'react';


class MoreInfo  extends Component {
    constructor(){
        super();
        this.state ={
            chosenGif: []
        }
    }
    render(){
        return (
            <div className="moreInfo">
                <h1>More Info</h1>
                <div className="chosenGIF">
                    <i onClick={this.props.hideMoreInfo} className="fa fa-times"></i>
                    <img src={`${this.props.chosenGifSrc}`} />
                    <div className="info">
                        <p>Check it out this GIF on <a href={this.props.chosenGifGiphyUrl}>Giphy.com</a></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MoreInfo;