import * as url from "./urls";

import { _APIClient } from "./apiCore";

const api = _APIClient

const getProfileDetails = () => {
  return api.get(url.GET_PROFILE_DETAILS);
};

const getSettings = () => {
  return api.get(url.GET_USER_SETTINGS);
};
const updateSettings = (field: string, value: any) => {
  return api.update(url.UPDATE_ETTINGS, {
    field: field,
    value: value,
  });
};

export { getProfileDetails, getSettings, updateSettings };
