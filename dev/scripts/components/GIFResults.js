import React from 'react';

class GIFResults extends React.Component {
    render(){
        return (
            <div className="Results">
                <div className="wrapper">
                    <div className="searchedGIFsContainer">
                        {this.props.searchedGIFs.map((item, i) => {
                            return (
                                <div className="searchedGIF" key={item.id}>
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

export default GIFResults;