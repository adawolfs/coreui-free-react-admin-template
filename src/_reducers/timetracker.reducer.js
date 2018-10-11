import { timeConstants } from '../_constants';

let session = {};
const initialState = session ? { session } : {};

export function startTrack(state = initialState, action) {
  switch (action.type) {
    case timeConstants.TIME_REQUEST:
      return {
        loggingIn: true,
      };
    case timeConstants.TIME_SUCCESS:
      return {
        session: action.session,
      };

    case timeConstants.END_TIME_SUCCESS:
      if(action.data.found){
        return {
          session: {},
        };
      } 
    case timeConstants.LAST_SESSION_SUCCESS:
      var returnSession = {}
      console.log(action.data.found)

      if(action.data.found){
        returnSession = action.data.object
      } 

      return {
        session: returnSession,
      } 
      
    default:
      return state
  }
}