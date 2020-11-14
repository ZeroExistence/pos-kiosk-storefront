import { writable } from 'svelte/store';

export const authToken = writable(null);
export const authRefreshToken = writable(null);
export const authStatus = writable(false);

export function logout() {
  authToken.set(null)
  authRefreshToken.set(null)
}

export async function login(userCredentials) {
  const url = 'http://localhost:8000/api/token/'
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(userCredentials),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())
  .then(data => {
    console.log(data.access)
    authToken.set(data.access);
    authRefreshToken.set(data.refresh);
    authStatus.set(true);
  })
}

export async function refreshToken() {
  const url = 'http://localhost:8000/api/token/refresh/'
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({"refresh": authRefreshToken}),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())
  .then(data => void authToken.set(data.access))
}
