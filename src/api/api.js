function fetchFlickr() {
  return new Promise((resolve, reject) => {
    fetch('/v1/flickr').then(res => {
      res.json().then(json => {
        resolve(json.photos);
      });
    });
  });
}

export default { fetchFlickr };
