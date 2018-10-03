import { userService } from '../_services';
import { history } from '../_helpers';
import { userConstants } from '../_constants';

export const userActions = {
  login,
  logout,
};

function login(username, password) {
  return dispatch => {
      dispatch(request({ username }));

      userService.login(username, password)
          .then(
              user => { 
                  console.log("history")
                  dispatch(success(user));
                  console.log("redirect to work")
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

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}