import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export const Photo = React.createClass({
  getInitialState() {
    const { params, photos } = this.props;
    const photo = photos.find(photo => photo.get('id') === params.photoId);
    return {
      photo
    };
  },

  componentWillMount() {
    const { photo } = this.state;
    const img = document.createElement('img');
    img.src = photo.get('largeUrl');
    img.onload = function() {
      const photoEl = document.querySelector('.full-photo');
      photoEl.style.backgroundImage = `url(${img.src})`;
      photoEl.classList += ' loaded';
    }
  },

  render() {
    const { photo } = this.state;
    return <div className="photo-container">
      <div className='modal'>
        <div className='modal__body'>
          <div className='full-photo'></div>
        </div>
      </div>
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
  }, dispatch);
}

export const PhotoContainer = connect(mapStateToProps, mapDispatchToProps)(Photo);
