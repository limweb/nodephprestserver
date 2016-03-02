import  read  from './read';
import  update  from './update';
export default function(){
    return (dispatch, getState) => {
      console.log(getState());
        const { employee } = getState();
        if (employee.id == 1) {
            // return { type: 'delete', text: employee.text, id: employee.id };
            dispatch(update());
        }  else {
          dispatch(read());  //want middleware thunk
        }
    };
  }