let initialState = {};

export default  (state=initialState,action) => {
    console.log('call employee reduxcer ',state,action);
    // console.log('employee reduxcer type=',action.type);
    switch (action.type) {
      case 'create':
        return { id:'1',name:'create tlen'};
      case 'update':
        return { id:action.id ,name:action.text};
      case 'read':
        return { id:'1',name:'read tlen'};
      case 'delete':
        return {id:2, name:'delete', data:action.employee  };
      default:
        return state
    }
}