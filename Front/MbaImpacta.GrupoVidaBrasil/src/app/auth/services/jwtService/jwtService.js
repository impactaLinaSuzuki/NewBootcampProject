import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import jwtServiceConfig from "./jwtServiceConfig";

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      const decoded = jwtDecode(access_token);
      this.setSession(access_token);
      this.emit("onAutoLogin", decoded);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  signInWithCpfAndPassword = (cpf, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post("api/Authentication", {
          Cpf: cpf,
          Password: password,
        })
        .then((response) => {
          if (response.data) {
            this.processLoginApi(response, resolve, reject);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  processLoginApi = (response, resolve, reject) => {
    if (response && response.data) {
      const decoded = jwtDecode(response.data.token);
      this.setSession(response.data.token);

      this.emit("onLogin", decoded);

      resolve(response.data);
    } else if (response && response.data) {
      resolve(response.data);
    } else if (response && response.data && response.data.errors) {
      reject(response.data);
    } else if (response && response.status === 400) {
      this.emit("onErroAPI 400", response);
      reject(response.data);
    } else if (response && response.data && !response.data.authenticated) {
      this.emit("onErroAPI", response.data.message);
      reject(response.data.message);
    } else {
      this.emit("onErroAPI", "Erro na comunicação!");
      reject(
        response && response.data && response.data.error
          ? response.data.error
          : ""
      );
    }
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken, {
          data: {
            access_token: this.getAccessToken(),
          },
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.access_token);
            resolve(response.data.user);
          } else {
            this.logout();
            reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error("Failed to login with token."));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit("onLogout", "Logged out");
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // console.warn('access token expired');
      return false;
    }

    return true;
  };

  trataRetornoAPI = (response) => {
    if (response.data && response.data.errors) return response.data.errors;

    if (response.errors) return response.errors;

    return null;
  };
}

export default new JwtService();
