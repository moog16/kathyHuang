import React from 'react';
import classnames from 'classnames';

export default React.createClass({
  el: null,
  getInitialState() {
    return {
      hasLoaded: false
    };
  },

  componentDidMount() {
    setTimeout(this.isImgInViewport);
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.triggerScroll !== this.props.triggerScroll && !this.state.hasLoaded) {
      const hasLoaded = this.isImgInViewport();
      this.setState({ hasLoaded });
    }
  },

  isImgInViewport() {
    const { el } = this;
    if(this.state.hasLoaded) {
      return;
    }
    if(!el) {
      return false;
    }

    const rect = el.getBoundingClientRect();
    const isInView = (
      rect.top >= 0
      && rect.left >= 0
      && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )

    if(isInView) {
      el.style.height = 'auto';
      el.style.width = 'auto';
      this.setState({ hasLoaded: true  });
    }

    return isInView;
  },

  getElStyle(showImage) {
    const { height, width } = this.props;
    return {
      height: showImage ? 'auto' : `${height}px`,
      width: showImage ? 'auto' : `${width}px`,
    }
  },

  render() {
    const { src, onLoad } = this.props;
    const showImage = this.state.hasLoaded;

    return <div className={classnames( 'lazy-loading-image', {'loaded': showImage} )}
      ref={ function(el) { this.el = el }.bind(this) }
      style={this.getElStyle()}>
      { showImage ? <img src={src} onLoad={onLoad} /> : null }
    </div>
  }

});
