import 'isomorphic-fetch'

export default resourceType => {
  return fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      // only keep 10 first results
      // console.log('data', data)
      // return data.filter((_, idx) => idx < 10);
    });
}