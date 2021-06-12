import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from '../../axios-documents';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, userEmail) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    userEmail: userEmail,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  Cookies.remove('Authentication');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
    };
    let url = '/authentication/register';
    if (!isSignup) {
      url = '/authentication/log-in';
    }
    try {
      const { data, ...headers } = await axios.post(url, authData, {
        withCredentials: true,
      });
      const toastMsg = isSignup
        ? `User: "${email}" has been created!`
        : `Welcome ${email}!`;
      toast.success(toastMsg);
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

      // localStorage.setItem('token', headers.get('token'));
      // localStorage.setItem('token', Cookies.get('Authentication'));
      localStorage.setItem('token', headers.headers.token);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', data._id);
      // Capture data sent from the server
      // TODO Refactor. Only dispatch on sign in
      if (isSignup) {
        dispatch(authSuccess(null, data._id, data.email));
        // SIGN IN
      } else {
        dispatch(
          authSuccess(Cookies.get('Authentication'), data._id, data.email)
        );
        dispatch(checkAuthTimeout(3600));
        return true;
      }
    } catch (err) {
      dispatch(authFail(err.response.data.error));
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
