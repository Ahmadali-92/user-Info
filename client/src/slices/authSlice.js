import {createSlice} from '@reduxjs/toolkit';
import {patchRequest, postRequest} from '../utils/requests';
import {handleAsyncRequest} from '../utils/handleAsyncRequest';

const initialState = {
  isLoading: false,
  error: null,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },

    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },

    updateCurrentUser(state, action) {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
  },
});

export const actions = authSlice.actions;

export default authSlice.reducer;

// state selector
export const isUserLoading = (state) => state.user.isLoading;
export const getIsUserLoggedIn = (state) => !!state.user?.currentUser?.id;
export const getCurrentUser = (state) => state.user.currentUser;

export const createUser =
  ({payload}) =>
  async (dispatch) => {
    const {error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: '/users/signup',
      payload,
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (error) throw error;
  };

export const logInUser =
  ({payload}) =>
  async (dispatch) => {
    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: '/users/login',
      payload,
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (error) throw error;

    dispatch(actions.setCurrentUser(body));
  };

export const updateUser =
  ({payload, id}) =>
  async (dispatch, getState) => {
    const state = getState();
    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: patchRequest,
      endpoint: `/users/${id}`,
      payload,
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (error) throw error;

    dispatch(
      actions.updateCurrentUser({
        ...state.user.currentUser,
        ...body,
      })
    );
  };

export const forgetPassword =
  ({payload}) =>
  async (dispatch) => {
    const {error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: '/users/forgot-password',
      payload,
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (error) throw error;
  };

export const resetPassword =
  ({payload, token}) =>
  async (dispatch) => {
    const {error} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: patchRequest,
      endpoint: `/users/reset/${token}`,
      payload,
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (error) throw error;
  };
