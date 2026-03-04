import { api } from '../../config/apiConfig';
import {
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED,
    LOGIN_USER_REQUEST,    LOGIN_USER_SUCCESS,    LOGIN_USER_FAILED,
    LOGOUT_USER,
    GET_USER_PROFILE_REQUEST,    GET_USER_PROFILE_SUCCESS,    GET_USER_PROFILE_FAILED,
    UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILED,
    GET_ALL_USERS_REQUEST,        GET_ALL_USERS_SUCCESS,        GET_ALL_USERS_FAILED,
    FORGOT_PASSWORD_REQUEST,     FORGOT_PASSWORD_SUCCESS,     FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,      RESET_PASSWORD_SUCCESS,      RESET_PASSWORD_FAILED,
} from './Types';


export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    try {
        const { data } = await api.post('/api/v1/auth/login', credentials);

        if (data.jwt) {
            localStorage.setItem('jwt', data.jwt);
        }
        
        console.log("Login response data:", data); // Console madhe bagha

        // Role merge kar - je kuth asel tyatun ghya
        const userData = {
            ...(data.user ?? data),
            role: data.role || data.user?.role || data.data?.role,
        };

        // persist full user object so we can restore on refresh
        try {
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            console.warn("couldn't save user to localStorage", err);
        }

        dispatch({ type: LOGIN_USER_SUCCESS, payload: userData });
        return userData; // allow caller to examine role if need be
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message;
        dispatch({ type: LOGIN_USER_FAILED, payload: message });
    }
};

// new action for user registration
export const registerUser = (formData) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    try {
        // use multipart/form-data to send files
        const { data } = await api.post('/api/v1/auth/signup', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (data.jwt) {
            localStorage.setItem('jwt', data.jwt);
        }

        const userData = {
            ...(data.user ?? data),
            role: data.role || data.user?.role || data.data?.role,
        };

        try {
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            console.warn('could not persist registered user', err);
        }

        dispatch({ type: REGISTER_USER_SUCCESS, payload: userData });
        return userData;
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message;
        dispatch({ type: REGISTER_USER_FAILED, payload: message });
    }
};




export const logoutUser = () => (dispatch) => {
    // clear both token and user info from persistence
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT_USER });
};


export const getUserProfile = () => async (dispatch) => {
    dispatch({ type: GET_USER_PROFILE_REQUEST });
    try {
        const { data } = await api.get('/api/v1/user/profile');
        dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message;
        dispatch({ type: GET_USER_PROFILE_FAILED, payload: message });
    }
};


export const updateUserProfile = (updateData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
    try {
        const { data } = await api.put('/api/v1/user/update', updateData);
        dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message;
        dispatch({ type: UPDATE_USER_PROFILE_FAILED, payload: message });
    }
};


export const forgotPassword = (email) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
        const { data } = await api.post('/api/v1/auth/forgot-password', { email });
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message ?? 'Reset email sent' });
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message;
        dispatch({ type: FORGOT_PASSWORD_FAILED, payload: message });
    }
};


export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: GET_ALL_USERS_REQUEST });
    try {
        const { data } = await api.get('/api/v1/users/users');
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message;
        dispatch({ type: GET_ALL_USERS_FAILED, payload: message });
    }
};


export const resetPassword = (token, newPassword, confirmPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
        const { data } = await api.post('/api/v1/auth/reset-password', {
            token,
            newPassword,
            confirmPassword,
        });
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message ?? 'Password reset successful' });
    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message;
        dispatch({ type: RESET_PASSWORD_FAILED, payload: message });
    }
};


export const restoreAuth = () => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });
  
  try {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      dispatch({ type: LOGIN_USER_FAILED, payload: 'No saved session' });
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (savedUser) {
      // we already have user info persisted, just rehydrate
      dispatch({ type: LOGIN_USER_SUCCESS, payload: savedUser });
      return;
    }
    
    const response = await api.get('/api/v1/user/profile', {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    
    const userData = response.data;
    
    const completeUser = {
      jwt: jwt,
      message: 'Session restored',
      ...userData
    };
    
    try {
      localStorage.setItem('user', JSON.stringify(completeUser));
    } catch (err) {
      console.warn("couldn't persist user in restoreAuth", err);
    }

    dispatch({ type: LOGIN_USER_SUCCESS, payload: completeUser });
    
  } catch (error) {
    localStorage.removeItem("jwt");
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT_USER });
  }
};