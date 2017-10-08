
import React from 'react';

class Error extends React.Component {
    render(){
        return (
            <section className="error">
                <div className = "ErrorMessage">
                    <img src="https://media.giphy.com/media/OPU6wzx8JrHna/giphy.gif" alt="A GIF of Patrick from Spongebob SquarePants crying." />
                    <p>Sorry! We couldn't find any GIFs matching those keywords, please search again!</p>
                </div>
            </section>
        )
    }
}

export default Error;