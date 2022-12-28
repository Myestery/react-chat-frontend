import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import React, { useState } from "react";
import { deleteContact, getContacts, } from "../../../redux/contacts/actions";

// interfaaces
import { ContactTypes } from "../../../data/contacts";
//utils
import { DivideByKeyResultTypes } from "../../../utils";
import classnames from "classnames";
import { useRedux } from "../../../hooks/index";

interface ContactItemProps {
  contact: ContactTypes;
  onSelectChat: (id: string | number, isChannel?: boolean) => void;
}

const ContactItem = ({ contact, onSelectChat }: ContactItemProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { dispatch } = useRedux();
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const onDeleteContact = (data: any) => {
    dispatch(deleteContact(data));
    
    setTimeout(() => {
      dispatch(getContacts());
    }, 1000);
  };
  const fullName = contact.name;
  const shortName = contact.name;
  const colors = [
    "bg-primary",
    "bg-danger",
    "bg-info",
    "bg-warning",
    "bg-secondary",
    "bg-pink",
    "bg-purple",
  ];
  const [color] = useState(Math.floor(Math.random() * colors.length));

  return (
    <li onClick={() => onSelectChat(contact._id)}>
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-2">
          <div className="avatar-xs">
            {contact.profileImage ? (
              <img
                src={contact.profileImage}
                alt=""
                className="img-fluid rounded-circle"
              />
            ) : (
              <span
                className={classnames(
                  "avatar-title",
                  "rounded-circle",
                  "font-size-10",
                  "text-uppercase",
                  colors[color]
                )}
              >
                {shortName}
              </span>
            )}
          </div>
        </div>
        <div className="flex-grow-1">
          <h5 className="font-size-14 m-0">{fullName}</h5>
        </div>
        <div className="flex-shrink-0">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="a" className="text-mute">
              <i className="bx bx-dots-vertical-rounded align-middle"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem
                className="d-flex align-items-center justify-content-between"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onDeleteContact(contact.user_id);
                }}
              >
                Remove <i className="bx bx-trash ms-2 text-muted"></i>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </li>
  );
};
interface CharacterItemProps {
  letterContacts: DivideByKeyResultTypes;
  index: number;
  onSelectChat: (id: string | number, isChannel?: boolean) => void;
}
const CharacterItem = ({
  letterContacts,
  index,
  onSelectChat,
}: CharacterItemProps) => {
  return (
    <div className={classnames({ "mt-3": index !== 0 })}>
      <div className="contact-list-title">{letterContacts.letter}</div>

      <ul className="list-unstyled contact-list">
        {(letterContacts.data || []).map((contact: any, key: number) => (
          <ContactItem
            contact={contact}
            key={key}
            onSelectChat={onSelectChat}
          />
        ))}
      </ul>
    </div>
  );
};

export default CharacterItem;
