import axios from "axios";

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

function queueRequest(callback: (token: string) => void) {
  refreshQueue.push(callback);
}

function releaseQueuedRequests(newToken: string) {
  refreshQueue.forEach(cb => cb(newToken));
  refreshQueue = [];
}

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response, // Normal responses
  async (error) => {
    const originalReq = error.config;
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalReq._retry) {
      return Promise.reject(error);
    }
    originalReq._retry = true
    if (isRefreshing) {
      return new Promise((resolve) => {
        queueRequest((newToken) => {
          originalReq.headers.Authorization = `Bearer ${newToken}`;
          resolve(axios(originalReq));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshRes = await axios.get("/api/refreshClientAccessToken");
      const newToken = refreshRes.data

      localStorage.setItem("accessToken", newToken);
      releaseQueuedRequests(newToken);

      originalReq.headers.Authorization = `Bearer ${newToken}`;
      return axios(originalReq);

    } catch (refreshError) {
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
