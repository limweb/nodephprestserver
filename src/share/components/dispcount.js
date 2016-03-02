import React from 'react';
import { connect } from 'react-redux';
import mapcounter  from '../redux/mapstate/mapcounter';
import mapdispatch  from '../redux/mapdespatch/mapdispatch';


@connect(mapcounter,mapdispatch)
class Dispcount extends React.Component {
	render() {
		return (
        	<h3 onClick={this.props.read}>{ this.props.counter }</h3>
		);
	}
}


// import React from 'react';
// import { bindActionCreators } from 'redux'
// import { connect, Provider } from 'react-redux';
// import read from  '../redux/actions/read';
// @connect( 
//     state => ({ counter: state.counter }),
//     dispatch => bindActionCreators({read}, dispatch)
// )
// class Dispcount extends React.Component {
// 	render() {
// 		return (
//         	<h3 onClick={this.props.read}>{ this.props.counter }</h3>
// 		);
// 	}
// }



// @connect( 
//     state => ({ counter: state.counter }),
//     dispatch => bindActionCreators({read}, dispatch)
// )
// class Dispcount extends Component {
//   render(){
//     return(
//         <h3 onClick={this.props.read}>{ this.props.counter }</h3>
//       )
//   }
// }


export default Dispcount;