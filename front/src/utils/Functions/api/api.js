const API_URL = "http://localhost:3000/api/v1";

export const fetchWrapper = async ({
  endpoint,
  method = "GET",
  body,
  isJson = true,
  token = null,
}) => {
  try {
    const headers = {};
    if (isJson) {
      headers["Content-Type"] = "application/json";
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(API_URL + endpoint, {
      method,
      headers,
      body: isJson && body ? JSON.stringify(body) : body,
    });
    return res;
  } catch (error) {
    return { error: error.message };
  }
};
