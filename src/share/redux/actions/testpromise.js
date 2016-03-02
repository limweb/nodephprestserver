export default (owner) => {
    console.log('testpromise.js action');
    return dispatch => fetch('https://api.github.com/users/'+ owner +'/repos',{
        method: 'get',
        headers: {
           'Accept': 'application/vnd.github.v3+json',
           'User-Agent': 'request'
        }
    }) // Redux Thunk handles these
    .then(res => res.json())
    .then(
      data => dispatch({ type: 'testact', testdata:data }),
      err => dispatch({ type: 'testerr', err })
    );
}