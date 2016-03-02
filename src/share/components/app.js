import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapState  from '../redux/mapstate/mapstate';
import mapDispatch  from '../redux/mapdespatch/mapdispatch';
import {IndexLink,Link} from 'react-router'
import Dispcount from './dispcount';
import Counter from './counter';
import $ from 'jquery';
import axios  from 'axios';

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
               <li><a href="/">Home</a></li>
                <li><a href="/counter">counter</a></li>
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

export default App;