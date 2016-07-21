import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Masonry from 'masonry-layout';

import { debounce } from './../utils/tools';

export const Photos = React.createClass({
  getInitialState() {
    return {
      masonry: null
    }
  },

  componentDidMount() {
    const masonry = new Masonry('.photo-grid', {
      itemSelector: '.photo-grid__item'
    });

    this.setState({ masonry });
  },

  loadPhoto(id) {
    this.state.masonry.layout();
  },

  render() {
    const { photos } = this.props;
    return <div className="photos-container">
      <div className='photo-grid'>
        {
          photos.map(photo => {
            return this.renderPhoto(photo)
          })
        }
      </div>
      { this.props.children }
    </div>
  },

  renderPhoto(photo) {
    const id = photo.get('id');
    const { push } = this.props;

    return <div key={id} className='photo-grid__item u-1/3 u-1/2-lap u-1/1-palm'>
      <img src={photo.get('thumbnailUrl')}
        id={`photo_${id}`}
        alt={photo.get('title')}
        onLoad={debounce(() => this.loadPhoto(id), 250)}
        onClick={() => push(`/photos/${id}`)}/>
    </div>
  }
});

function mapStateToProps(state) {
  return {
    photos: state.app.get('photos')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push
  }, dispatch);
}

export const PhotosContainer = connect(mapStateToProps, mapDispatchToProps)(Photos);
