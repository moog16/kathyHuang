import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchFlickr } from '/src/action-creators/app';

export const App = React.createClass({
  componentDidMount() {
    this.props.fetchFlickr();
  },

  render() {
    const { photos } = this.props;
    return <div className="app-container">
      { photos.size ? this.props.children : null }
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
    fetchFlickr
  }, dispatch);
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
