import { CallsActionTypes } from "./types";

// common success
export const callsApiResponseSuccess = (actionType: string, data: any) => ({
  type: CallsActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const callsApiResponseError = (actionType: string, error: string) => ({
  type: CallsActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getCalls = () => ({
  type: CallsActionTypes.GET_CALLS,
});

export const dialing = (conversation_id: string) => ({
  type: CallsActionTypes.DIALING,
  payload: { conversation_id },
});

export const calling = (conversation_id: string) => ({
  type: CallsActionTypes.CALLING,
  payload: { conversation_id },
});

export const ringing = (conversation_id: string) => ({
  type: CallsActionTypes.RINGING,
  payload: { conversation_id },
});

export const hangup = () => ({
  type: CallsActionTypes.HANGUP,
});

