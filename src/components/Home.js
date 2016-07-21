import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export const Home = React.createClass({

  componentWillMount() {
    const img = document.createElement('img');
    img.src = '/static/img/cover.jpg';
    img.onload = function() {
      const cover = document.querySelector('.cover');
      cover.classList += ' loaded';
    }
  },

  render() {
    const { push } = this.props;

    return <div className="home-container">
      <div className='cover'></div>
      <div className='home__body'>
        <div className='header'>
          <h1>
            Kathy Huang
          </h1>
          <div className='subheader'>
            Lifestyle and landscape photographer in San Francisco.
          </div>
          <div className='btn btn-portfolio' onClick={() => push('/photos')}>
            my work
          </div>
        </div>
        <div className='footer'>
          <div className='icons text-center'>
            <a href='https://www.facebook.com/kathythekat' target='blank'>
              <i className='icon-facebook'></i>
            </a>
            <a href='https://www.instagram.com/kathythekat/' target='blank'>
              <i className='icon-instagram u-ml'></i>
            </a>
            <a href='http://kathuang.tumblr.com/' target='blank'>
              <i className='icon-tumblr u-ml'></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push
  }, dispatch);
}

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
