// types
import { CallsActionTypes, CallsState } from "./types";

export const INIT_STATE: CallsState = {
  calls: [],
  dialing: false,
  calling: false,
  ringing: false,
  conversation_id: "",
  call_type: "audio",
  friend_video: true,
};

const Calls = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case CallsActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case CallsActionTypes.GET_CALLS:
          return {
            ...state,
            calls: action.payload.data,
            isCallsFetched: true,
            getCallsLoading: false,
          };
        default:
          return { ...state };
      }

    case CallsActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case CallsActionTypes.GET_CALLS:
          return {
            ...state,
            isCallsFetched: false,
            getCallsLoading: false,
          };

        default:
          return { ...state };
      }

    case CallsActionTypes.GET_CALLS: {
      return {
        ...state,
        getCallsLoading: true,
        isCallsFetched: false,
      };
    }

    // dialing
    case CallsActionTypes.DIALING: {
      return {
        ...state,
        dialing: true,
        calling: false,
        ringing: false,
        call_type: action.payload.call_type,
        conversation_id: action.payload.conversation_id,
      };
    }

    // calling
    case CallsActionTypes.CALLING: {
      return {
        ...state,
        dialing: false,
        calling: true,
        ringing: false,
        call_type: action.payload.call_type,
        conversation_id: action.payload.conversation_id,
      };
    }

    // ringing
    case CallsActionTypes.RINGING: {
      return {
        ...state,
        dialing: false,
        calling: false,
        ringing: true,
        call_type: action.payload.call_type,
        conversation_id: action.payload.conversation_id,
      };
    }

    // accept call
    case CallsActionTypes.ACCEPT: {
      return {
        ...state,
        dialing: false,
        calling: true,
        ringing: false,
        conversation_id: action.payload.conversation_id,
      };
    }
      
    case CallsActionTypes.TOGGLE_VIDEO_STREAM: {
      return {
        ...state,
        friend_video: !state.friend_video,
      };
    }

    // reject call
    case CallsActionTypes.REJECT: {
      return {
        ...state,
        dialing: false,
        calling: false,
        ringing: false,
        // conversation_id: "",
      };
    }

    // reject call
    case CallsActionTypes.HANGUP: {
      // close all media tracks
      if (window.stream) {
        window.stream.getAudioTracks().forEach(track => {
          track.stop();
        });
        
        window.stream.getVideoTracks().forEach(track => {
          track.stop();
        });
      }
      return {
        ...state,
        dialing: false,
        calling: false,
        ringing: false,
        // conversation_id: "",
      };
    }

    default:
      return { ...state };
  }
};

export default Calls;
