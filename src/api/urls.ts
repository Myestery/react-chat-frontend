//auth
export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_REGISTER = "/post-fake-register";
export const SOCIAL_LOGIN = "/social-login";
// auth
export const POST_JWT_LOGIN = "/auth/login";
export const POST_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const JWT_REGISTER = "/auth/register";
export const USER_CHANGE_PASSWORD = "/auth/update-password";

// profile & settings
export const GET_PROFILE_DETAILS = "/profile";
export const GET_USER_SETTINGS = "/user/settings";
export const UPDATE_ETTINGS = "/update-user-settings";

// contacts
export const GET_CONTACTS = "/contact";
export const INVITE_CONTACT = "/contact";
export const DELETE_CONTACT = "/contact";

// calls
export const GET_CALLS_LIST = "/calls";

// bookmarks
export const GET_BOOKMARKS_LIST = "/bookmarks-list";
export const DELETE_BOOKMARK = "/bookmarks-delete";
export const UPDATE_BOOKMARK = "/bookmarks-update";

// chats
export const GET_FAVOURITES = "/chat/favourites";
export const GET_DIRECT_MESSAGES = "/chat/direct-messages";
export const GET_CHANNELS = "/chat/channels";
export const ADD_CONTACTS = "/chat/contact";
export const CREATE_CHANNEL = "/chat/channel";
export const GET_CHAT_USER_DETAILS = "/chat/user-details";
export const GET_CHAT_USER_CONVERSATIONS = "/chat/user-conversations";
export const SEND_MESSAGE = "/chat/message";
export const RECEIVE_MESSAGE = "/chat/receive-message";
export const READ_MESSAGE = "/chat/read-message";
export const RECEIVE_MESSAGE_FROM_USER = "/chat/receive-message-from-user";
export const DELETE_MESSAGE = "/chat/delete-message";
export const FORWARD_MESSAGE = "/chat/forward-message";
export const DELETE_USER_MESSAGES = "/chat/delete-user-messages";
export const TOGGLE_FAVOURITE_CONTACT = "/chat/toggle-favourite-contact";
export const GET_ARCHIVE_CONTACT = "chat/archive-contacts";
export const TOGGLE_ARCHIVE_CONTACT = "/chat/toggle-archive-contact";
export const READ_CONVERSATION = "/chat/read-conversation";
export const DELETE_IMAGE = "/chat/user-delete-img";

// groups
export const GET_CHANNEL_DETAILS = "/channel-details";
