import { getCookie } from './common';

async function get(url) {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${JSON.parse(getCookie(process.env.NEXT_PUBLIC_ADMIN_TOKEN_COOKIE))}`,
  };
  const requestOptions = {
    method: 'GET',
    headers,
  };

  const res = await fetch(url, requestOptions);
  return res;
}

async function post(url, body) {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${JSON.parse(getCookie(process.env.NEXT_PUBLIC_ADMIN_TOKEN_COOKIE))}`,
  };

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, requestOptions);
  return res;
}

async function upload(url, method, body) {
  const headers = {
    // 'Content-Type': 'multipart/form-data',
    authorization: `Bearer ${JSON.parse(getCookie(process.env.NEXT_PUBLIC_ADMIN_TOKEN_COOKIE))}`,
  };

  const requestOptions = {
    method,
    headers,
    body,
  };

  const res = await fetch(url, requestOptions);
  return res;
}

async function put(url, body) {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${JSON.parse(getCookie(process.env.NEXT_PUBLIC_ADMIN_TOKEN_COOKIE))}`,
  };
  const requestOptions = {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, requestOptions);
  return res;
}

async function _delete(url, body) {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${JSON.parse(getCookie(process.env.NEXT_PUBLIC_ADMIN_TOKEN_COOKIE))}`,
  };
  const requestOptions = {
    method: 'DELETE',
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, requestOptions);
  return res;
}

async function patch(url, body) {
  const headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${JSON.parse(getCookie(process.env.NEXT_PUBLIC_ADMIN_TOKEN_COOKIE))}`,
  };
  const requestOptions = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  };

  const res = await fetch(url, requestOptions);
  return res;
}

export const Fetch = {
  get,
  post,
  put,
  delete: _delete,
  patch,
  upload,
};
