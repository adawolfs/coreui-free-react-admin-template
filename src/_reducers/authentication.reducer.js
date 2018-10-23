import { userConstants } from '../_constants';

let user = {};
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.VERIFY_SESSION_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      }
    case userConstants.VERIFY_SESSION_FAILURE:
      console.log("VERIFY_SESSION_FAILURE")
      return {
      }
    default:
      return state
  }
}