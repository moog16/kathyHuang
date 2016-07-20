import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export const Photo = React.createClass({
  render() {
    return <div className="photo-container">

    </div>
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export const PhotoContainer = connect(mapStateToProps, mapDispatchToProps)(Photo);
