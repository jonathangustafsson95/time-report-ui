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
  console.log(userData);
  return (dispatch) => {
    dispatch(authorizeRequest());
    let payload = {
      user: userData,
    };
    axios({
      url: service.baseUrl + "/system/login",
      method: "post",
      data: payload,
    })
      .then((response) => {
        dispatch(authorizeSuccess(response));
      })
      .catch((error) => {
        dispatch(authorizeFailure(error));
      });
  };
};
