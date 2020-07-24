import cookie from "react-cookies";

var user_token = cookie.load("auth");
const getToken = () => {
  return user_token.token;
};
const getUserId = () => {
  return user_token.user_id;
};

const getUser = () => {
  return user_token;
};

const setUserToken = (new_token) => {
  cookie.save("auth", new_token);
};

const logout = () => {
  cookie.remove("auth");
  window.location.pathname = "/login";
};

export default {
  getToken,
  getUser,
  getUserId,
  setUserToken,
  logout,
};
