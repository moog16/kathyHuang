import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export const Home = React.createClass({
  render() {
    const { push } = this.props;

    return <div className="home-container">
      <div className='cover'></div>
      <div className='container'>
        <div className='header-center'>
          <h1>
            Kathy Huang
          </h1>
          <div className='subheader'>
            Lifestyle and landscape photographer in San Francisco.
          </div>
          <div className='btn btn-portfolio' onClick={() => push('/portfolio')}>
            portfolio
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
