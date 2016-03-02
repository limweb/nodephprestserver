export default store => next => action => {
    console.log('MDW::[' + action.type + '] ' + JSON.stringify(store.getState(), null, 4));
    return next(action);
}