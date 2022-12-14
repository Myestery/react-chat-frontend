import * as url from "./urls";

import { _APIClient } from "./apiCore";

const api = _APIClient;

const getContacts = (filters?: object) => {
  return api.get(url.GET_CONTACTS, filters);
};

const inviteContact = (data: object) => {
  return api.create(url.INVITE_CONTACT, data);
};

const deleteContact = (contactId: string) => {
  return api.delete(`${url.DELETE_CONTACT}/${contactId}`);
};
export { getContacts, inviteContact, deleteContact };
