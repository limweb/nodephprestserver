import axios  from 'axios';

export default  (dispatch,owner) => {
        console.log('call serverapi start owner=',owner,'dispath=');
        axios.get('https://api.github.com/users/'+ owner +'/repos')
        .catch(function (response) {
          if (response instanceof Error) {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', response.message);
          } else {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.log(response.data);
            console.log(response.status);
            console.log(response.headers);
            console.log(response.config);
            // return { type:'testact',  testdata:data ,owner:owner } ;
          }
        }).then(response=>{
            console.log('then server api');
            console.log('data:',response.data);
            console.log('status:',response.status);
            console.log('header:',response.headers);
            console.log('config:',response.config);
            dispatch({ type:'testact',  testdata: response.data, owner: owner });
        });
} // function serverapi