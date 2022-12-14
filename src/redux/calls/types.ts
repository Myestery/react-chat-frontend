export enum CallsActionTypes {
  API_RESPONSE_SUCCESS = "@@calls/API_RESPONSE_SUCCESS",
  API_RESPONSE_ERROR = "@@calls/API_RESPONSE_ERROR",
  GET_CALLS = "@@calls/GET_CALLS",

  DIALING = "@@calls/DIALING",
  CALLING = "@@calls/CALLING",
  RINGING = "@@calls/RINGING",
  HANGUP = "@@calls/HANGUP",
  ACCEPT = "@@calls/ACCEPT",
  REJECT = "@@calls/REJECT",
  TOGGLE_VIDEO_STREAM = "@@calls/TOGGLE_VIDEO_STREAM",
}
export interface CallsState {
  calls: Array<any>;
  dialing: boolean;
  calling: boolean;
  ringing: boolean;
  conversation_id: string;
  call_type: "audio" | "video";
  friend_video: boolean;
}
