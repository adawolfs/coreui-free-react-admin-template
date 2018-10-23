import { userService } from '../_services';
import { history } from '../_helpers';
import { userConstants } from '../_constants';

export const userActions = {
  login,
  logout,
  verifySession,
};

function login(username, password) {
  return dispatch => {
      dispatch(request({ username }));

      userService.login(username, password)
          .then(
              user => { 
                  dispatch(success(user));
                  history.push('/');
              },
              error => {
                  console.log("error")
                  dispatch(failure(error.toString()));
                  //dispatch(alertActions.error(error.toString()));
              }
          );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function verifySession() {
    return dispatch => {
  
        userService.verifySession()
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
  
    function request(user) { return { type: userConstants.VERIFY_SESSION_REQUEST, user } }
    function success(user) { return { type: userConstants.VERIFY_SESSION_SUCCESS, user } }
    function failure(error) { return { type: userConstants.VERIFY_SESSION_FAILURE, error } }
  }

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}