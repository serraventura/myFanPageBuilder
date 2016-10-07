import { combineReducers } from 'redux';
import { facebookDataReducer } from './facebookData';

const rootReducer = combineReducers({
	facebookData: facebookDataReducer,
});

export default rootReducer;