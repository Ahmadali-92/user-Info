import axios from 'axios';
export const API_SERVER_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;

// Create axios instance
const request = axios.create({
  baseURL: API_SERVER_URL,
  withCredentials: true,
});

// Post request Call
export const postRequest = async ({endpoint, payload}) => {
  const token = sessionStorage.getItem('x-auth-token');

  const response = await request.post(`${API_SERVER_URL}${endpoint}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && {'x-auth-token': token}),
    },
  });

  return response;
};

// Patch request Call
export const patchRequest = async ({endpoint, payload}) => {
  const token = sessionStorage.getItem('x-auth-token');

  const response = await request.patch(
    `${API_SERVER_URL}${endpoint}`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token && {'x-auth-token': token}),
      },
    }
  );

  return response;
};
