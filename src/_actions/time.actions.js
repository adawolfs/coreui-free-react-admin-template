import { timeService } from '../_services';
import { history } from '../_helpers';
import { timeConstants } from '../_constants';

export const timeActions = {
  startTime,
  endSession,
  getLastSession,
};

function getLastSession() {
    return dispatch => {
        timeService.lastSession()
            .then(
                session => { 
                    dispatch(success(session));
                }, 
                error => {
                    console.log("error")
                    dispatch(failure(error.toString()));
                }
            );
    };
  
    function request(data) { return { type: timeConstants.LAST_SESSION_REQUEST, data } }
    function success(data) { return { type: timeConstants.LAST_SESSION_SUCCESS, data } }
    function failure(error) { return { type: timeConstants.LAST_SESSION_FAILURE, error } }
}

function endSession(){
    return dispatch => {
        timeService.endSession()
            .then(
                session => { 
                    dispatch(success(session));
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };
  
    function request(data) { return { type: timeConstants.END_TIME_REQUEST, data } }
    function success(data) { return { type: timeConstants.END_TIME_SUCCESS, data } }
    function failure(error) { return { type: timeConstants.END_TIME_FAILURE, error } }
}
  

function startTime() {
  return dispatch => {
      timeService.track()
          .then(
              session => { 
                  console.log("history")
                  dispatch(success(session));
                  console.log("redirect to work")
              },
              error => {
                  console.log("error")
                  dispatch(failure(error.toString()));
                  //dispatch(alertActions.error(error.toString()));
              }
          );
  };

  function request(session) { return { type: timeConstants.TIME_REQUEST, session } }
  function success(session) { return { type: timeConstants.TIME_SUCCESS, session } }
  function failure(error) { return { type: timeConstants.LOGIN_FAILURE, error } }
}
