let initialStateTodo = {
  text: 'Use Redux',
  completed: false,
  id: 0
  };

export default (state = initialStateTodo , action ) => {
  // console.log('todos reduxcer type=',action.type);
  // console.log('todos reduxcer state=',state);
  console.log('call todos reducer');
  switch (action.type) {
    case 'addtodo':
      return {text: action.text};
    case 'edittodo':
      return {text: action.text};
    default:
      return state
   }
}