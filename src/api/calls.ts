import * as url from "./urls";

import { _APIClient } from "./apiCore";

const api =  _APIClient

const getCalls = () => {
  return api.get(url.GET_CALLS_LIST);
};

export { getCalls };
