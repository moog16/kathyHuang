function fetchFlickr() {
  return new Promise((resolve, reject) => {
    fetch('/v1/flickr').then(res => {
      res.json().then(data => {
        resolve(data.photos);
      });
    });
  });
}

export default { fetchFlickr };
