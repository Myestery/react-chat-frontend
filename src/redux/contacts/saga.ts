import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  contactsApiResponseError,
  contactsApiResponseSuccess,
} from "./actions";
// api
import {
  deleteContact as deleteContactApi,
  getContacts as getContactsApi,
  inviteContact as inviteContactApi,
} from "../../api/index";
// helpers
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../helpers/notifications";

//  Redux States
import { ContactsActionTypes } from "./types";

function* getContacts({ payload: filters }: any) {
  try {
    const response: Promise<any> = yield call(getContactsApi, filters);
    yield put(
      contactsApiResponseSuccess(ContactsActionTypes.GET_CONTACTS, response)
    );
  } catch (error: any) {
    yield put(
      contactsApiResponseError(ContactsActionTypes.GET_CONTACTS, error)
    );
  }
}

function* inviteContact({ payload: newPassword }: any) {
  try {
    const response: Promise<any> = yield call(inviteContactApi, newPassword);
    yield put(
      contactsApiResponseSuccess(ContactsActionTypes.INVITE_CONTACT, response)
    );
    yield call(showSuccessNotification, "Successfully invited user");
  } catch (error: any) {
    yield call(showErrorNotification, "User was not found");
    yield put(
      contactsApiResponseError(ContactsActionTypes.INVITE_CONTACT, error)
    );
  }
}

// delete contact
function* deleteContact({ payload: contactId }: any) {
  try {
    const response: Promise<any> = yield call(deleteContactApi, contactId);
    yield put(
      contactsApiResponseSuccess(ContactsActionTypes.DELETE_CONTACT, response)
    );
    yield call(showSuccessNotification, "Successfully deleted contact");
  } catch (error: any) {
    yield call(showErrorNotification, "Error deleting contact");
    yield put(
      contactsApiResponseError(ContactsActionTypes.DELETE_CONTACT, error)
    );
  }
}

export function* watchGetContacts() {
  yield takeEvery(ContactsActionTypes.GET_CONTACTS, getContacts);
}

export function* watchInviteContact() {
  yield takeEvery(ContactsActionTypes.INVITE_CONTACT, inviteContact);
}

export function* watchDeleteContact() {
  yield takeEvery(ContactsActionTypes.DELETE_CONTACT, deleteContact);
}

function* contactsSaga() {
  yield all([
    fork(watchGetContacts),
    fork(watchInviteContact),
    fork(watchDeleteContact),
  ]);
}

export default contactsSaga;
