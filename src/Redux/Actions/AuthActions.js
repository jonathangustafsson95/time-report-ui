import * as Types from "../Types/RegistryTypes";
import axios from "axios";
import * as service from "../ApiService/Service";

export const authorizeRequest = () => {
    return {
        type: Types.FETCH_REGISTRIES_BY_WEEK_REQUEST,
      };
}

export const authorizeSuccess = (token) => {
    return {
        type: Types.FETCH_REGISTRIES_BY_WEEK_REQUEST,
        payload: token
      };
}
export const authorizeFailure = (error) => {
    return {
        type: Types.FETCH_REGISTRIES_BY_WEEK_REQUEST,
        payload: error
      };
}

export const authorize = (userData) => {
    return (dispatch) => {
        dispatch(authorizeRequest())
        axios.post({
            url: service.baseUrl + "/system/login",
            method: "post",
            data: userData,
        }).then((response) => {
            dispatch(authorizeSuccess(response))
        }).catch((errorMsg) => {
            dispatch(authorizeFailure(errorMsg))
        })
    }
}