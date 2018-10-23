import {config} from './config' ;
import { getToken } from '../_helpers';

export const userService = {
    login,
    logout,
    verifySession,
};

function login(username, password) {

    let data = new FormData();
    data.append('username', username);;
    data.append('password', password);

    const requestOptions = {
        method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
        //headers: {'Content-Type':  'multipart/form-data'},
        //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data,
        //mode: 'no-cors'
    };
    return fetch(config.apiUrl +  '/api-token-auth/', requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user)
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function verifySession() {
    let data = new FormData();
    data.append('token', getToken());;
    const requestOptions = {
        method: 'POST',
        body: data,
    };
    return fetch(config.apiUrl +  '/api-token-verify/', requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user)
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    console.log(response)
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            console.log("fail")
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }
            
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log("success")

        return data;
    });
}
