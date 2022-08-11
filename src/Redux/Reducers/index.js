import {combineReducers} from "redux";
import authReducer from './auth.reducer';
import teamReducer from './team.reducer';

const rootReducer = combineReducers({
   auth:authReducer,
   team:teamReducer
});

export default rootReducer;
