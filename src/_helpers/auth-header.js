export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
      return { 'Authorization': 'jwt ' + user.token };
  } else {
      return {};
  }
}

export function getToken(){
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return user.token ;
    } else {
        return "";
    }
}