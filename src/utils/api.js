export const apiBaseUrl = 'http://localhost:3001';

// Generate a unique token for storing data on the backend server
let token = localStorage.token;
if (!token) {
  token = Math.random()
    .toString(36)
    .substr(-8);

  localStorage.token = token;
}

export const apiToken = token;
