import { bindActionCreators } from 'redux'
import actions from '../actions'
// const mapDispatch = dispatch => bindActionCreators({ increment }, dispatch)
// const mapDispatch = (dispatch)=>( bindActionCreators(actions, dispatch));
export default (dispatch)=>( bindActionCreators(actions, dispatch));