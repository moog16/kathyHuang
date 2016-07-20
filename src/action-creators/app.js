import Api from 'src/api/api';

function setFlickrPhotos(photos) {
  return {
    type: 'SET_FLICKR_PHOTOS',
    photos
  }
}

export function fetchFlickr() {
  return dispatch => {
    Api.fetchFlickr().then(photos => {
      dispatch(setFlickrPhotos(photos.photo));
    });
  }
}
