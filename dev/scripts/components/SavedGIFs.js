import React from 'react';
import ReactDOM from 'react-dom';

class SavedGIFs extends React.Component {
    render() {
      return (
        <section className="saved">
            <h1>These Are Your Saved GIFs</h1>
        </section>
      )
    }
}

SavedGIFs.contextTypes = {
    router: React.PropTypes.shape({
      history: React.PropTypes.object.isRequired,
    }),
  };

export default SavedGIFs;