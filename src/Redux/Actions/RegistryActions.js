import * as Types from "../Types/RegistryTypes";
import axios from "axios";
import * as service from "../ApiService/Service";

const fetchRegistriesByWeekRequest = () => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_REQUEST,
  };
};

const fetchRegistriesByWeekSuccess = (registries) => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_SUCCESS,
    payload: registries,
  };
};

const fetchRegistriesByWeekFailure = (error) => {
  return {
    type: Types.FETCH_REGISTRIES_BY_WEEK_FAILURE,
    payload: error,
  };
};

export const fetchRegistriesByWeek = (token) => {
  return (dispatch) => {
    const date = new Date();
    const stringDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    dispatch(fetchRegistriesByWeekRequest());
    axios({
      url: service.baseUrl + "/reporting/getweek/" + stringDate,
      method: "get",
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        const registries = response.data;
        registries.map((registry) => {
          registry.new = false;
        });
        dispatch(fetchRegistriesByWeekSuccess(registries));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchRegistriesByWeekFailure(errorMsg));
      });
  };
};

export const addRegistryToStore = (registryData) => {
  return {
    type: Types.ADD_REGISTRY_TO_STORE,
    payload: registryData,
  };
};

const saveChangesRequest = () => {
  return {
    type: Types.SAVE_CHANGES_REQUEST,
  };
};

const saveChangesSuccess = () => {
  return {
    type: Types.SAVE_CHANGES_SUCCESS,
  };
};

const saveChangesFailure = (error) => {
  return {
    type: Types.SAVE_CHANGES_FAILURE,
    payload: error,
  };
};

// export const postRegistries = (registries, token) => {
//   return (dispatch) => {
//     dispatch(postRegistriesRequest());
//     let payload = {
//       registriesToReport: registries,
//     };
//     axios({
//       url: service.baseUrl + "/reporting/AddTimeReport",
//       method: "post",
//       data: payload,
//       headers: { Authorization: "Bearer " + token },
//     })
//       .then(() => {
//         dispatch(postRegistriesSuccess());
//       })
//       .catch((error) => {
//         const errorMsg = error.message;
//         dispatch(postRegistriesFailure(errorMsg));
//       });
//   };
// };

export const saveChanges = (registriesToReport, registriesToDelete, token) => {
  return (dispatch) => {
    const postPayload = {
      registriesToReport: registriesToReport,
    };
    const deletePayload = {
      registriesToDelete: registriesToDelete,
    };
    dispatch(saveChangesRequest());
    axios
      .all([
        axios({
          url: service.baseUrl + "/reporting/AddTimeReport",
          method: "post",
          data: postPayload,
          headers: { Authorization: "Bearer " + token },
        }),
        axios({
          url: service.baseUrl + "/reporting/AddTimeReport",
          method: "delete",
          data: deletePayload,
          headers: { Authorization: "Bearer " + token },
        }),
      ])
      .then(() => {
        dispatch(saveChangesSuccess());
      })
      .catch((error) => {
        dispatch(saveChangesFailure(error.message));
      });
  };
};

export const removeNewRegistryFromStore = (registry) => {
  return {
    type: Types.REMOVE_NEW_REGISTRY_FROM_STORE,
    payload: registry.registryId,
  };
};

export const removeRegistryFromStore = (registry) => {
  return {
    type: Types.REMOVE_REGISTRY_FROM_STORE,
    payload: registry.registryId,
  };
};
