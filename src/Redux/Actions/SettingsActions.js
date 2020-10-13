import * as Types from "../Types/SettingsType";

export const setDate = (type) => {
    return {
        type: Types.SET_DATE,
        payload: type,
    }
}
