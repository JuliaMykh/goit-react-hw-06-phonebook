import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from "nanoid";

import { deleteContact } from '../../redux/contactsSlice';
import { ButtonContact } from './ContactList.styled';



export const ContactList = () => {

  const dispatch = useDispatch();
  const  contacts  = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
    console.log(contacts);
    
    const filtredContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toUpperCase().includes(filter.toUpperCase())
    );
  };
   
    return (    
        <ul>
            {filtredContacts().map(({name, number, id}) => {
                return (
                    <li key={nanoid()}>
                   <p>{name} : {number} </p>
        <ButtonContact
        type="button"
        onClick={() => dispatch(deleteContact(id))}
          >
              Delete
        </ButtonContact>
                        </li>
                );
            })}
        </ul>
    );
}
