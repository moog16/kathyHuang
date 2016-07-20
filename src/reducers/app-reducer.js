import { fromJS, List } from 'immutable';

const initialState = fromJS({
  photos: List()
});

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_FLICKR_PHOTOS': {
      return state.set('photos', fromJS(action.photos));
    }
    default:
      return state;
  }
};
