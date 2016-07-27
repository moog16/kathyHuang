import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

export const Photo = React.createClass({
  getInitialState() {
    const { params, photos } = this.props;
    const photo = photos.find(photo => photo.get('id') === params.photoId);
    return {
      photo,
      backgroundImage: `url({ ${photo.getIn(['small', 'source'])} })`
    };
  },

  componentWillMount() {
    const { photo } = this.state;
    const img = document.createElement('img');
    img.src = photo.getIn(['large', 'source']);
    img.onload = function() {
      const photoEl = document.querySelector('.full-photo');
      photoEl.style.backgroundImage = `url(${img.src})`;
      photoEl.classList += ' loaded';
    }

    document.querySelector('body').style.overflow = 'hidden';
  },

  componentWillUnmount() {
    document.querySelector('body').style.overflow = 'initial';
  },

  render() {
    const { photo, backgroundImage  } = this.state;
    const { goBack } = this.props;

    return <div className="photo-container">
      <div className='modal'>
        <div className='modal__body'>
          <div className='full-photo' style={{backgroundImage}}>
            <i className='icon-close' onClick={goBack}></i>
          </div>
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
    goBack
  }, dispatch);
}

export const PhotoContainer = connect(mapStateToProps, mapDispatchToProps)(Photo);
