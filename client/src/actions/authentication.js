import { baseUrl } from "../config";

const TOKEN_KEY = "MAKIMONO_TOKEN";
const CURRENT_USER = "CURRENT_USER";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";
export const REMOVE_AUTH = "REMOVE_AUTH";
export const VAL_ERRORS = "VAL_ERRORS";
export const SET_CSRF_COOKIE = "SET_CSRF_COOKIE";

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setCSRF = (cookie) => ({
  type: SET_CSRF_COOKIE,
  cookie,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const removeAuth = () => ({
  type: REMOVE_AUTH,
});

export const setValErrors = (valErrors) => ({
  type: VAL_ERRORS,
  valErrors,
});

export const loadToken = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const loadUser = () => async (dispatch) => {
  const user = JSON.parse(window.localStorage.getItem(CURRENT_USER));
  if (user) {
    dispatch(setUser(user));
  }
};

export const signUp = (
  firstName,
  lastName,
  email,
  password,
  csurf,
  picture = ""
) => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/user/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", "X-CSRFToken": csurf },
      body: JSON.stringify({ firstName, lastName, email, password, picture }),
    });
    if (!response.ok) {
      const valErrors = await response.json();
      await dispatch(setValErrors(valErrors));
      return false;
    } else {
      const { token, user } = await response.json();
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem(CURRENT_USER, JSON.stringify(user));
      dispatch(setToken(token));
      dispatch(setUser(user));
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};

export const signIn = (email, password, csurf) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/user/signin`, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json", "X-CSRFToken": csurf },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    dispatch(setToken(token));
    dispatch(setUser(user));
    return user;
  } else {
    const valErrors = await response.json();
    dispatch(setValErrors(valErrors));
    return false;
  }
};

export const logout = () => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/logout`, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(CURRENT_USER);
    dispatch(removeAuth());
  }
};
