import React from 'react';

class DisplayGIFs extends React.Component {
    render(){
        return (
            <div className="Results">
                <div className="wrapper">
                    <div className="searchedGIFsContainer">
                        {this.props.searchedGIFs.map((item, i) => {
                            return (
                                <div className="searchedGIF" key={item.id} 
                                onClick={() => this.props.handleClick(event, item.images.fixed_height.url,item.url,item.embed_url)}>
                                    <img src={`${item.images.fixed_height.url}`} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayGIFs;