import {} from "../../../redux/chats/actions";

import React, { useEffect, useState } from "react";
import {
  deleteMessage,
  deleteUserMessages,
  getChatUserConversations,
  getWebSocketChat,
  hangup,
  onSendMessage,
  readMessage,
  receiveMessage,
  receiveMessageFromUser,
  ringing,
  toggleArchiveContact,
  toggleUserDetailsTab,
} from "../../../redux/actions";

import ChatInputSection from "./ChatInputSection/index";
import Conversation from "./Conversation";
// interface
import { MessagesTypes } from "../../../data/messages";
// components
import UserHead from "./UserHead";
// dummy data
import { pinnedTabs } from "../../../data/index";
// hooks
import { useProfile } from "../../../hooks";
// hooks
import { useRedux } from "../../../hooks/index";
import { calling } from '../../../redux/calls/actions';

interface IndexProps {
  isChannel: boolean;
}
const Index = ({ isChannel }: IndexProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const {
    chatUserDetails,
    chatUserConversations,
    isUserMessageSent,
    isMessageDeleted,
    isMessageForwarded,
    isUserMessagesDeleted,
    isImageDeleted,
  } = useAppSelector(state => ({
    chatUserDetails: state.Chats.chatUserDetails,
    chatUserConversations: state.Chats.chatUserConversations,
    isUserMessageSent: state.Chats.isUserMessageSent,
    isMessageDeleted: state.Chats.isMessageDeleted,
    isMessageForwarded: state.Chats.isMessageForwarded,
    isUserMessagesDeleted: state.Chats.isUserMessagesDeleted,
    isImageDeleted: state.Chats.isImageDeleted,
  }));

  const onOpenUserDetails = () => {
    dispatch(toggleUserDetailsTab(true));
  };

  /*
  hooks
  */
  const { userProfile } = useProfile();

  /*
  reply handeling
  */
  const [replyData, setReplyData] = useState<
    null | MessagesTypes | undefined
  >();
  const onSetReplyData = (reply: null | MessagesTypes | undefined) => {
    setReplyData(reply);
  };

  /*
  send message
  */
  const onSend = (data: any) => {
    let params: any = {
      text: data.text && data.text,
      time: new Date().toISOString(),
      image: data.image && data.image,
      attachments: data.attachments && data.attachments,
      conversation_id: chatUserDetails.conversation_id,
    };
    if (replyData && replyData !== null) {
      params["replyOf"] = replyData;
    }

    dispatch(onSendMessage(params));
    setReplyData(null);
  };

  // useEffect(() => {
  //   // join room

  // }, []);
  // console.log(userProfile);
  useEffect(() => {
    if (
      isUserMessageSent ||
      isMessageDeleted ||
      isMessageForwarded ||
      isUserMessagesDeleted ||
      isImageDeleted
    ) {
      dispatch(getChatUserConversations(chatUserDetails.conversation_id));
    }
    setTimeout(() => {
      let lastChild = document.querySelector("#chat-conversation-list")
        ?.lastChild as HTMLElement;
      lastChild &&
        lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 1000);
    window.socket.emit("createRoom", chatUserDetails.conversation_id);
    window.socket.on("new_chat", (data: any) => {
      if (data.sender != userProfile.data.user.id) {
        dispatch(getWebSocketChat(data));
        // scroll to bottom of page
        let lastChild = document.querySelector("#chat-conversation-list")
          ?.lastChild as HTMLElement;
        lastChild &&
          lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    });
    window.socket.on("receiveCall", (data: any) => {
      dispatch(ringing(data.conversation_id, data.call_type));
    });

    window.socket.on("callAnswered", (data: any) => {
      dispatch(calling(data.conversation_id, data.call_type));
    });

  }, [
    dispatch,
    isUserMessageSent,
    chatUserDetails,
    isMessageDeleted,
    isMessageForwarded,
    isUserMessagesDeleted,
    isImageDeleted,
  ]);

  const onDeleteMessage = (messageId: string | number) => {
    dispatch(deleteMessage(chatUserDetails.id, messageId));
  };

  const onDeleteUserMessages = () => {
    dispatch(deleteUserMessages(chatUserDetails.id));
  };

  const onToggleArchive = () => {
    dispatch(toggleArchiveContact(chatUserDetails.id));
  };

  return (
    <>
      <UserHead
        chatUserDetails={chatUserDetails}
        pinnedTabs={pinnedTabs}
        onOpenUserDetails={onOpenUserDetails}
        onDelete={onDeleteUserMessages}
        isChannel={isChannel}
        onToggleArchive={onToggleArchive}
      />
      <Conversation
        chatUserConversations={chatUserConversations}
        chatUserDetails={chatUserDetails}
        onDelete={onDeleteMessage}
        onSetReplyData={onSetReplyData}
        isChannel={isChannel}
      />
      <ChatInputSection
        onSend={onSend}
        replyData={replyData}
        onSetReplyData={onSetReplyData}
        chatUserDetails={chatUserDetails}
      />
    </>
  );
};

export default Index;
