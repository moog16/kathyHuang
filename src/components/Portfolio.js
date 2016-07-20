import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Masonry from 'masonry-layout';

import { debounce } from './../utils/tools';

export const Portfolio = React.createClass({
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
    // this.renderPhoto(id);
    this.state.masonry.layout();
  },

  // renderPhoto(id) {
  //   const photo = document.querySelector(`#photo_${id}`);
  //   debugger
  // },

  render() {
    const { photos } = this.props;
    return <div className="portfolio-container">
      <div className='photo-grid'>
        {
          photos.map(photo => {
            return this.renderPhoto(photo)
          })
        }
      </div>
    </div>
  },

  renderPhoto(photo) {
    const id = photo.get('id');

    return <div key={id} className='photo-grid__item u-1/3 u-1/2-lap u-1/1-palm'>
      <img src={photo.get('thumbnailUrl')} id={`photo_${id}`} alt={photo.get('title')}
        onLoad={debounce(() => this.loadPhoto(id), 150)}/>
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

export const PortfolioContainer = connect(mapStateToProps, mapDispatchToProps)(Portfolio);
