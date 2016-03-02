let initialStateTestData = {
  text: 'Use Redux',
  data:[]
  };

export default (state = initialStateTestData, action) => {
  console.log('call testdata reducer');
  switch (action.type) {
    case 'testact':
      return { data: action.testdata }
    case 'testerr':
      return { err: action.err }
    default:
      return state;
  }
 
}