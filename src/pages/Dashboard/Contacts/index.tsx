//utils
import { DivideByKeyResultTypes, divideByKey } from "../../../utils";
import React, { useEffect, useState } from "react";
// actions
import {
  changeSelectedChat,
  getChannelDetails,
  getChatUserConversations,
  getChatUserDetails,
  getContacts,
  inviteContact,
  resetContacts,
} from "../../../redux/actions";
// hooks
import { usePrevious, useRedux } from "../../../hooks/index";

import AppSimpleBar from "../../../components/AppSimpleBar";
import Contact from "./Contact";
import EmptyStateResult from "../../../components/EmptyStateResult";
import InviteContactModal from "../../../components/InviteContactModal";
import ListHeader from "./ListHeader";
// components
import Loader from "../../../components/Loader";

interface IndexProps {}

const Index = (props: IndexProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { contactsList, getContactsLoading, isContactInvited } = useAppSelector(
    state => ({
      contactsList: state.Contacts.contacts,
      getContactsLoading: state.Contacts.getContactsLoading,
      isContactInvited: state.Contacts.isContactInvited,
    })
  );
  const prevContactCount = usePrevious(contactsList.length);
  /*
  get contacts
  */
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const [contacts, setContacts] = useState<Array<any>>([]);
  const [contactsData, setContactsData] = useState<Array<any>>([]);
  useEffect(() => {
    if (prevContactCount !== contactsList.length) {
      setContacts(contactsList);
    }
    //  eslint-disable-next-line
  }, [contactsList]);

  useEffect(() => {
    if (contacts.length > 0) {
      const formattedContacts = divideByKey("name", contacts);
      setContactsData(formattedContacts);
    }
  }, [contacts]);

  /*
  add contact modal handeling
  */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  /*
  onInvite handeling
  */
  const onInviteContact = (data: any) => {
    dispatch(inviteContact(data));
    // get contacts again
    setTimeout(() => {
      dispatch(getContacts());
    }, 1000);
  };
  useEffect(() => {
    if (isContactInvited) {
      setIsOpen(false);
      setTimeout(() => {
        dispatch(resetContacts("isContactInvited", false));
      }, 1000);
    }
  }, [dispatch, isContactInvited]);

  /*
  contact search
  */
  const [search, setSearch] = useState("");
  const onChangeSearch = (value: string) => {
    setSearch(value);
    let modifiedContacts = [...contactsList];
    let filteredContacts = (modifiedContacts || []).filter((c: any) =>
      c["firstName"].toLowerCase().includes(value.toLowerCase())
    );
    setContacts(filteredContacts);
  };

  const totalC = (contacts || []).length;
  const onSelectChat = (id: string | number, isChannel?: boolean) => {
    if (isChannel) {
      dispatch(getChannelDetails(id));
    } else {
      dispatch(getChatUserDetails(id));
    }
    dispatch(getChatUserConversations(id));
    dispatch(changeSelectedChat(id));
  };

  return (
    <>
      <div className="position-relative">
        {getContactsLoading && <Loader />}
        <ListHeader
          search={search}
          onChangeSearch={onChangeSearch}
          openModal={openModal}
        />

        <AppSimpleBar className="chat-message-list chat-group-list">
          <div>
            {totalC === 0 ? (
              <EmptyStateResult searchedText={search} />
            ) : (
              (contactsData || []).map(
                (letterContacts: DivideByKeyResultTypes, key: number) => (
                  <Contact
                    letterContacts={letterContacts}
                    key={key}
                    index={key}
                    onSelectChat={onSelectChat}
                  />
                )
              )
            )}
          </div>
        </AppSimpleBar>
      </div>
      <InviteContactModal
        isOpen={isOpen}
        onClose={closeModal}
        onInvite={onInviteContact}
      />
    </>
  );
};

export default Index;
