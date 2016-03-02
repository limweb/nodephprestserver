export default (state = 10, action) => {
    console.log('call counter reducer');
    // console.log('counter reduxcer type=',action.type);
    switch (action.type) {
      case 'increment':
        return state + 1    
      case 'create':
        return state + 1    
      case 'decrement':
        return state - 1
      default:
        return state
    }
}