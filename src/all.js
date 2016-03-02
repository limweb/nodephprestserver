'use strict';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactDOMServer from 'react-dom/server';
import { createStore, bindActionCreators ,combineReducers,applyMiddleware  ,compose} from 'redux'
import { connect, Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import 'isomorphic-fetch';
import $ from 'jquery';
import axios  from 'axios';
//---------------dev tools --------------------
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import { persistState } from'redux-devtools';
const DevTools = createDevTools(
   <DockMonitor toggleVisibilityKey="ctrl-X"
               changePositionKey="ctrl-Y">
    <LogMonitor />
  </DockMonitor>
);
//---------------dev tools --------------------



//config-----------------------------------------


//action-----------------------------------------
// คือ function ที่เรียกไป Api ต่าง ๆ เช่น ดึงข้อมูลจาก Database เป็นต้น 
  const increment =  () => ({ type: 'increment' })

  const testpromise = (owner) => {
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

  const testact =  (owner) => {
      console.log('testaction owner=',owner);
      return dispatch => {
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
            console.log('then');
            console.log('data:',response.data);
            console.log('status:',response.status);
            console.log('header:',response.headers);
            console.log('config:',response.config);
            return { type:'testact',  testdata: response.data, owner: owner };
        });
        return null;
    } // return dispatch 
   }


  //work
  const serverapi = (dispatch,owner) => {
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


  const decrement =  () => ( { type: 'decrement' } )
  const addtodo =    () => ({ type: 'addtodo',  text: 'addtodo'  })
  const edittodo =   () => ({ type: 'edittodo', text: 'edittodo' })
  const create = () => ({ type: 'create', text: 'create' })
  const read = () => ({ type: 'read', text: 'read' ,id:1 })
  const update = () => ({ type: 'update', text: 'update' , id:2 })
  const deletex = function(){
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


const actions = {
  increment: increment,
  decrement: decrement,
  addtodo: addtodo,
  edittodo: edittodo,
  create: create,
  read: read,
  update: update,
  deletex: deletex,
  testact: testact,
  testpromise:testpromise,
  // serverapi: serverapi,
}



// delete: () => ({ type: 'delete', text: 'delete' })
//action-----------------------------------------

//reducer-----------------------------------------
const employee = (state={},action)=>{
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


const counter = (state = 0, action) => {
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



let initialStateTestData = {
  text: 'Use Redux',
  data:[]
  };



const testdata = (state = initialStateTestData, action) => {
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

let initialStateTodo = {
  text: 'Use Redux',
  completed: false,
  id: 0
  };

const todos = (state = initialStateTodo , action ) => {
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
//reducer-----------------------------------------

const rootReducer = combineReducers({
  counter,
  todos,
  employee,
  testdata,
})

//-----------------middleware----------------------------
const mymiddware = store => next => action => {
    console.log('MDW::[' + action.type + '] ' + JSON.stringify(store.getState(), null, 4));
    return next(action);
}
//-----------------middleware----------------------------
// const store = createStore(rootReducer,applyMiddleware(thunk,mymiddware,apiMiddleware))
// const store = createStore(rootReducer,applyMiddleware(thunk))

const finalCreateStore = compose(
  // Enables your middleware: thunk,mymiddleware 
  applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
  // Provides support for DevTools:
   window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(rootReducer);


// compose(
//       applyMiddleware(...middleware),
//       window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
//       persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
//     )(_createStore);


// const mapState = counter => ({ counter })
const mapState = (state) => ({
    counter:  state.counter ,
    todos: state.todos,
    employee: state.employee,
    testdata: state.testdata,
    owner: state.owner,
    testdata:state.testdata,
})
// const mapDispatch = dispatch => bindActionCreators({ increment }, dispatch)
const mapDispatch = (dispatch)=>( bindActionCreators(actions, dispatch));

@connect(mapState, mapDispatch)
class Counter extends Component {
 render(){
     console.log('Counter child render---------------',this.props);
     return (<div>
           <h1>Counter</h1>
           <h1 onClick={ this.props.increment }>+{' '}{ this.props.counter }</h1>
           <h1 onClick={ this.props.decrement }>-{' '}{ this.props.counter }</h1>
           </div>);
    }
}



@connect( 
    state => ({ counter: state.counter }),
    dispatch => bindActionCreators({read}, dispatch)
)
class Dispcount extends Component {
  render(){
    return(
        <h3 onClick={this.props.read}>{ this.props.counter }</h3>
      )
  }
}


@connect(mapState, mapDispatch)
class App extends Component {
  // render = () => (<div>TEST<h1 onClick={ this.props.increment }>
  //   { this.props.counter }
  // </h1></div>)
  componentDidMount() {
      console.log('componenetDidmonth');

        // testact('limweb');
        console.log('start fetch data from didmont');

        // //work  #1 use with axios 
        // axios.get('https://api.github.com/users/limweb/repos')
        //   .catch(function (response) {
        //     if (response instanceof Error) {
        //       // Something happened in setting up the request that triggered an Error
        //       console.log('Error', response.message);
        //     } else {
        //       // The request was made, but the server responded with a status code
        //       // that falls out of the range of 2xx
        //       console.log(response.data);
        //       console.log(response.status);
        //       console.log(response.headers);
        //       console.log(response.config);
        //     }
        //   }).then(response=>{
        //       console.log('then');
        //       console.log('data:',response.data);
        //       console.log('status:',response.status);
        //       console.log('header:',response.headers);
        //       console.log('config:',response.config);
        //   });

        //Ajax Data from Server 
        //  //work #2 used with $ jquery ajax 
        // $.ajax({
        //   url: 'https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow',
        //   type: 'GET',
        //   dataType: 'json',
        // })
        // .done(function(data) {
        //   console.log("success",data);
        // })
        // .fail(function() {
        //   console.log("error");
        // })
        // .always(function() {
        //   console.log("complete");
        // });

  }

  handleSubmit(dispatch,e) {
    let _self = this;
    e.preventDefault();
    // console.log('value=',this.refs.owner);
    if(_self.refs.keword != undefined ) {
      _self.props.testact(_self.refs.keword.value); //work
      // serverapi(store.dispatch,_self.refs.keword.value) //work
    }
  }
  render(){
     let _self = this;
     const ACTIVE = { color: 'red' }
     const styles = {
        redtext: { color: 'red' }
     }

     const teststyle = {
       color: this.props.employee.id == 2 ? 'blue' : 'red'
     }
     console.log('style=',styles.infoBar);
     console.log('App render-----------',this.props);
     let { dispatch } = this.props;
     let inputx = this.refs.keyword;
     return (<div>
            <ul>
              <li><Link      to="/"           activeStyle={ACTIVE}>/</Link></li>
              <li><IndexLink to="/"           activeStyle={ACTIVE}>/ IndexLink</IndexLink></li>
              <li><Link      to="/counter"    activeStyle={ACTIVE}>/Counter</Link></li>
           </ul>
           <div>
            <Dispcount />
            <form>
               <span>Keword</span><input type="text"  ref="keword" name="keword" value={this.props.owner} placeholder="limweb"  />
               <button onClick={ _self.handleSubmit.bind(_self,dispatch) } >Search</button>
            </form>
           </div>
           <Counter {...this.props} />
           <h1 onClick={ this.props.testpromise.bind(this,'limweb') }>Testpromise{' '}</h1>
           <h1 onClick={ this.props.addtodo }>Add{' '}{ this.props.todos.text }</h1>
           <h1 onClick={ this.props.edittodo }>edit{' '}{ this.props.todos.text }</h1>
           <h1 onClick={ this.props.create }>create{' '}{ this.props.employee.name }</h1>
           <h1 onClick={ this.props.read }><span style = { styles.redtext } >read</span> {' '}{ this.props.employee.name }</h1>
           <h1 onClick={ this.props.update }>update{' '}{ this.props.employee.name }</h1>
           <h1 style={teststyle} onClick={ this.props.deletex }>delete{' '}{ this.props.employee.id }</h1>
               {this.props.children}
           </div>);
    }
}
 






render(
  <Provider store={ store }>
    <div>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/counter" component={Counter}/>
      </Route>
    </Router>
    </div>  
  </Provider>,
document.getElementById('content'))

// let html = ReactDOMServer.renderToString(
// 	  <Provider store={ store }>
// 	    <Counter />
// 	  </Provider>
// 	);
// console.log(html);
