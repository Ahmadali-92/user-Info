import {createAction} from '@reduxjs/toolkit';
export const clearStore = createAction('util/clearStore');

import {showToastUtils} from './toast';

export const handleAsyncRequest = async ({
  dispatch,
  actions,
  requestFn,
  endpoint,
  payload,
  toastMessage = {
    success: {show: true},
    error: {show: true},
  },
}) => {
  try {
    await dispatch(actions.startLoading());

    const body = {endpoint};

    if (payload) body.payload = payload;

    const response = await requestFn(body);

    const token = response?.data?.token;
    if (token) sessionStorage.setItem('x-auth-token', token);

    if (toastMessage.success.show)
      showToastUtils({
        type: 'success',
        message: toastMessage.success.customMessage || response.data.message,
      });

    return {
      statusCode: response.data.statusCode,
      message: response.data.message,
      body: response.data.body,
    };
  } catch (error) {
    const message =
      error.response?.data.message || error.message || 'Something went wrong';

    if (toastMessage.error.show)
      showToastUtils({
        type: 'error',
        message: toastMessage.error.customMessage || message,
      });

    return {
      statusCode: error.response?.data.statusCode,
      message,
      error,
    };
  } finally {
    dispatch(actions.stopLoading());
  }
};
