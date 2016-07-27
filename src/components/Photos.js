import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Masonry from 'masonry-layout';
import './../utils/lazyload';

import { debounce } from './../utils/tools';
import LazyLoad from './LazyLoad';

export const Photos = React.createClass({
  getInitialState() {
    return {
      masonry: null,
      scrollCounter: 0
    }
  },

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  componentDidMount() {
    const masonry = new Masonry('.photo-grid', {
      itemSelector: '.photo-grid__item'
    });

    this.setState({ masonry });
  },

  handleScroll(e) {
    const { scrollCounter } = this.state;
    const updatedScrollCounter = scrollCounter + 1;
    this.setState({ scrollCounter: updatedScrollCounter });
  },

  loadPhoto(id) {
    this.state.masonry.layout();
  },

  render() {
    const { photos } = this.props;
    return <div className="photos-container">
      <div className='photo-grid'>
        { photos.map(photo => this.renderPhoto(photo)) }
      </div>
      { this.props.children }
    </div>
  },

  renderPhoto(photo) {
    const id = photo.get('id');
    const { push } = this.props;
    const { scrollCounter } = this.state;

    return <div key={id} className='photo-grid__item u-1/3 u-1/2-lap u-1/1-palm'>
      <LazyLoad src={photo.getIn(['small', 'source'])}
        width={photo.getIn(['small', 'width'])}
        height={photo.getIn(['small', 'height'])}
        onLoad={debounce(() => this.loadPhoto(id), 250)}
        onClick={() => push(`/photos/${id}`)}
        triggerScroll={scrollCounter}
        alt={photo.get('title')}/>
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
