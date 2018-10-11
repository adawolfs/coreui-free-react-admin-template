import {config} from './config' ;
import { authHeader } from '../_helpers';

export const timeService = {
    track,
    endSession,
    lastSession,
};

function track() {

    let data = new FormData();

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        //headers: { 'Content-Type': 'application/json' },
        //headers: {'Content-Type':  'multipart/form-data'},
        //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data,
        //mode: 'no-cors'
    };
    console.log(requestOptions)
    return fetch(config.apiUrl +  '/tracker/track', requestOptions)
        .then(handleResponse)
        .then(session => {
            return session;
        });
}

function endSession(){
    let data = new FormData();
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: data,
    };
    console.log(requestOptions)
    return fetch(config.apiUrl +  '/tracker/stop_track', requestOptions)
        .then(handleResponse)
        .then(session => {
            return session;
        });
}

function lastSession() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(config.apiUrl +  '/tracker/lastSession', requestOptions)
        .then(handleResponse)
        .then(session => {
            return session;
        });
}

function handleResponse(response) {
  console.log(response)
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          console.log("fail")
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              //location.reload(true);
          }
          
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      console.log("success")

      return data;
  });
}
