import React from 'react';

class DisplayGIFs extends React.Component {
    render(){
        return (
            <section className="GIFsContainer">
                    {this.props.GIFs
                    // .sort(function(a,b){
                    //     a.rating - b.rating
                    // })
                    .map((item, i) => {
                        return (
                            <div className="GIF" key={item.id} 
                            onClick={() => this.props.handleClick(event, item.images.fixed_height.url,item.url,item.embed_url)}>
                                <img src={`${item.images.fixed_height.url}`} />
                            </div>
                        )
                    })}
            </section>
        )
    }
}

export default DisplayGIFs;