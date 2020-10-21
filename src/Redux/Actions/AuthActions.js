import * as Types from "../Types/AuthTypes";
import axios from "axios";
import * as service from "../ApiService/Service";

export const authorizeRequest = () => {
  return {
    type: Types.AUTHORIZATION_REQUEST,
  };
};

export const authorizeSuccess = (token) => {
  return {
    type: Types.AUTHORIZATION_SUCCESS,
    payload: token,
  };
};
export const authorizeFailure = (error) => {
  return {
    type: Types.AUTHORIZATION_FAILURE,
    payload: error,
  };
};

export const authorize = (userData) => {

  return (dispatch) => {
    dispatch(authorizeRequest());
    axios({
      url: service.baseUrl + "/system/login",
      method: "post",
      data: { userName: "Bengt", password: "bengt123" },
    })
      .then((response) => {
        console.log(response)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userDetails", JSON.stringify(response.data.userDetails));
        dispatch(authorizeSuccess(response.data));
      })
      .catch((error) => {
        dispatch(authorizeFailure(error.response.data.message));
      });
  };
};

export const reAuthorize = (localStorageData) => {
  return (dispatch) => {
    console.log(localStorageData)
    dispatch(authorizeSuccess(localStorageData));
  }
}

export const unAuthorize = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("userDetails")
  return {
    type: Types.UN_AUTHORIZATION,
  };
};

// Response interceptor for API calls
axios.interceptors.response.use((response) => {
  return response
}, async function (error) {
  console.log(error)
  if (typeof(error.response.data.message) === 'undefined'){
    error.response.data.message = "Something went terribly wrong."
  }
  return Promise.reject(error);
});