import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapState  from '../redux/mapstate/mapstate';
import mapDispatch  from '../redux/mapdespatch/mapdispatch';


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

export default Counter;