import React from 'react';

class Welcome extends React.Component {
    render(){
        return (
            <section className = "welcome">
                <div className = "wrapper">
                    <div className = "results">
                        <h2>Welcome to GIFify!</h2>
                        <p>GIFify was built to make searching for your favorite GIFs easier.  Checkout the top GIFs selected by YOU, see what's trending OR have a search through the GIF universe.  Click on the GIFs you like and copy their links to send them to your friends!</p>
                        <h3>Have fun!</h3>
                        <img src="https://media.giphy.com/media/mbhseRYedlG5W/giphy.gif" alt="A GIF of Colin Mochrie pointed to the camera with the caption `Who's Awesome?`"/>
                        <div className = "letsGoBtn">
                            <button onClick={this.props.handleClick}>Let's Go</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Welcome;