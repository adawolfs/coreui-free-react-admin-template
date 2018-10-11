import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { startTrack } from './timetracker.reducer';

const rootReducer = combineReducers({
  authentication,
  startTrack,
});

export default rootReducer;